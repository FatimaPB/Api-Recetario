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
    const id = await CategoriaGlobal.crear(req.body);
    res.json({ message: "Categoría creada", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarCategoriaGlobal = async (req, res) => {
  try {
    await CategoriaGlobal.actualizar(req.params.id, req.body);
    res.json({ message: "Categoría actualizada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
