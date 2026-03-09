import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcryptjs';

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    // Verificar si ya existe
    const existe = await Usuario.buscarPorEmail(email);
    if (existe) {
      return res.status(400).json({
        mensaje: 'El correo ya está registrado'
      });
    }

    // Encriptar password
    const passwordHash = await bcrypt.hash(password, 10);

    const id = await Usuario.crear({
      nombre,
      email,
      password: passwordHash
    });

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      id
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al registrar usuario',
      error
    });
  }

};


export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.listar();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al listar usuarios',
      error
    });
  }
};

export const cambiarEstadoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['activo', 'inactivo'].includes(estado)) {
      return res.status(400).json({
        mensaje: 'Estado inválido'
      });
    }

    await Usuario.cambiarEstado(id, estado);

    res.json({
      mensaje: 'Estado actualizado correctamente'
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al cambiar estado',
      error
    });
  }
};