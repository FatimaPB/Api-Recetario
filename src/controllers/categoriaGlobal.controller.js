import CategoriaGlobal from '../models/categoriaGlobal.model.js';

export const listarCategoriasGlobales = async (req, res) => {
  try {
    const categorias = await CategoriaGlobal.obtenerTodas();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerCategoriaGlobal = async (req, res) => {
  try {
    const categoria = await CategoriaGlobal.obtenerPorId(req.params.id);
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearCategoriaGlobal = async (req, res) => {
  try {

    if (req.body.nombre) {
      req.body.nombre = req.body.nombre.trim();
    }

    const id = await CategoriaGlobal.crear(req.body);

    res.status(201).json({
      mensaje: "Categoría creada correctamente",
      id
    });

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        mensaje: 'La categoría ya está registrada'
      });
    }

    res.status(500).json({
      mensaje: 'Error al crear categoría',
      error
    });
  }
};

export const actualizarCategoriaGlobal = async (req, res) => {
  try {

    if (req.body.nombre) {
      req.body.nombre = req.body.nombre.trim();
    }

    await CategoriaGlobal.actualizar(req.params.id, req.body);

    res.json({
      mensaje: "Categoría actualizada correctamente"
    });

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        mensaje: 'Ya existe una categoría con ese nombre'
      });
    }

    res.status(500).json({
      mensaje: 'Error al actualizar categoría',
      error
    });
  }
};


export const eliminarCategoriaGlobal = async (req, res) => {
  try {
    await CategoriaGlobal.eliminar(req.params.id);
    res.json({ message: "Categoría eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
