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

    let { nombre, unidad_base, costo_presentacion, cantidad_presentacion } = req.body;

    // limpiar texto
    if (nombre) nombre = nombre.trim();
    if (unidad_base) unidad_base = unidad_base.trim();

    // validar campos obligatorios
    if (!nombre || !unidad_base || costo_presentacion == null || cantidad_presentacion == null) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    // longitud mínima nombre
    if (nombre.length < 2) {
      return res.status(400).json({
        mensaje: 'El nombre del ingrediente debe tener al menos 2 caracteres'
      });
    }

    // validar números
    if (costo_presentacion <= 0) {
      return res.status(400).json({
        mensaje: 'El costo de presentación debe ser mayor a 0'
      });
    }

    if (cantidad_presentacion <= 0) {
      return res.status(400).json({
        mensaje: 'La cantidad de la presentación debe ser mayor a 0'
      });
    }

    const id = await Ingrediente.crear({
      nombre,
      unidad_base,
      costo_presentacion,
      cantidad_presentacion
    });

    res.status(201).json({
      mensaje: 'Ingrediente creado correctamente',
      id
    });

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        mensaje: 'El ingrediente ya está registrado'
      });
    }

    res.status(500).json({
      mensaje: 'Error al crear ingrediente'
    });
  }
};

export const actualizarIngrediente = async (req, res) => {
  try {

    const { id } = req.params;
    let { nombre, unidad_base, costo_presentacion, cantidad_presentacion } = req.body;

    if (nombre) nombre = nombre.trim();
    if (unidad_base) unidad_base = unidad_base.trim();

    if (!nombre || !unidad_base || costo_presentacion == null || cantidad_presentacion == null) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    if (nombre.length < 2) {
      return res.status(400).json({
        mensaje: 'El nombre del ingrediente debe tener al menos 2 caracteres'
      });
    }

    if (costo_presentacion <= 0) {
      return res.status(400).json({
        mensaje: 'El costo de presentación debe ser mayor a 0'
      });
    }

    if (cantidad_presentacion <= 0) {
      return res.status(400).json({
        mensaje: 'La cantidad de la presentación debe ser mayor a 0'
      });
    }

    const filasAfectadas = await Ingrediente.actualizar(id, {
      nombre,
      unidad_base,
      costo_presentacion,
      cantidad_presentacion
    });

    if (filasAfectadas === 0) {
      return res.status(404).json({
        mensaje: 'Ingrediente no encontrado'
      });
    }

    res.json({
      mensaje: 'Ingrediente actualizado correctamente'
    });

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        mensaje: 'Ya existe otro ingrediente con ese nombre'
      });
    }

    res.status(500).json({
      mensaje: 'Error al actualizar ingrediente'
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
