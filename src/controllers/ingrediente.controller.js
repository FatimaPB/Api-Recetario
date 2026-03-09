import Ingrediente from '../models/ingrediente.model.js';

export const listarIngredientes = async (req, res) => {
  try {
    const ingredientes = await Ingrediente.obtenerTodos();
    res.json(ingredientes);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener ingredientes',
      error
    });
  }
};

export const obtenerIngrediente = async (req, res) => {
  try {
    const { id } = req.params;
    const ingrediente = await Ingrediente.obtenerPorId(id);

    if (!ingrediente) {
      return res.status(404).json({
        mensaje: 'Ingrediente no encontrado'
      });
    }

    res.json(ingrediente);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener ingrediente',
      error
    });
  }
};

export const crearIngrediente = async (req, res) => {
  try {
    const id = await Ingrediente.crear(req.body);

    res.status(201).json({
      mensaje: 'Ingrediente creado correctamente',
      id
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear ingrediente',
      error
    });
  }
};

export const actualizarIngrediente = async (req, res) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await Ingrediente.actualizar(id, req.body);

    if (filasAfectadas === 0) {
      return res.status(404).json({
        mensaje: 'Ingrediente no encontrado'
      });
    }

    res.json({
      mensaje: 'Ingrediente actualizado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar ingrediente',
      error
    });
  }
};

export const eliminarIngrediente = async (req, res) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await Ingrediente.eliminar(id);

    if (filasAfectadas === 0) {
      return res.status(404).json({
        mensaje: 'Ingrediente no encontrado'
      });
    }

    res.json({
      mensaje: 'Ingrediente eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar ingrediente',
      error
    });
  }
};
