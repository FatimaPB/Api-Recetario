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
    const id = await Subcategoria.crear(req.body);
    res.json({ message: "Subcategoría creada", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarSubcategoria = async (req, res) => {
  try {
    await Subcategoria.actualizar(req.params.id, req.body);
    res.json({ message: "Subcategoría actualizada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
