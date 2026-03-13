import Subcategoria from '../models/subcategoria.model.js';

export const listarSubcategorias = async (req, res) => {
  try {
    const subcategorias = await Subcategoria.obtenerTodas();
    res.json(subcategorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerSubcategoria = async (req, res) => {
  try {
    const subcategoria = await Subcategoria.obtenerPorId(req.params.id);
    res.json(subcategoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearSubcategoria = async (req, res) => {
  try {

    let { id_categoria_global, nombre } = req.body;

    if (nombre) {
      nombre = nombre.trim();
    }

    // Validar campos obligatorios
    if (!id_categoria_global || !nombre) {
      return res.status(400).json({
        mensaje: 'La categoría y el nombre de la subcategoría son obligatorios'
      });
    }

    // Validar longitud mínima
    if (nombre.length < 3) {
      return res.status(400).json({
        mensaje: 'El nombre de la subcategoría debe tener al menos 3 caracteres'
      });
    }

    const id = await Subcategoria.crear({
      id_categoria_global,
      nombre
    });

    res.status(201).json({
      mensaje: "Subcategoría creada correctamente",
      id
    });

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        mensaje: 'Ya existe esa subcategoría en la categoría seleccionada'
      });
    }

    res.status(500).json({
      mensaje: 'Error al crear subcategoría'
    });
  }
};

export const actualizarSubcategoria = async (req, res) => {
  try {

    const { id } = req.params;
    let { id_categoria_global, nombre } = req.body;

    if (nombre) {
      nombre = nombre.trim();
    }

    // Validar campos obligatorios
    if (!id_categoria_global || !nombre) {
      return res.status(400).json({
        mensaje: 'La categoría y el nombre de la subcategoría son obligatorios'
      });
    }

    // Validar longitud mínima
    if (nombre.length < 3) {
      return res.status(400).json({
        mensaje: 'El nombre de la subcategoría debe tener al menos 3 caracteres'
      });
    }

    await Subcategoria.actualizar(id, {
      id_categoria_global,
      nombre
    });

    res.json({
      mensaje: "Subcategoría actualizada correctamente"
    });

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        mensaje: 'Ya existe esa subcategoría en la categoría seleccionada'
      });
    }

    res.status(500).json({
      mensaje: 'Error al actualizar subcategoría'
    });
  }
};

export const eliminarSubcategoria = async (req, res) => {
  try {
    await Subcategoria.eliminar(req.params.id);
    res.json({ message: "Subcategoría eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
