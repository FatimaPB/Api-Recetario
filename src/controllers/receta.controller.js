import Receta from '../models/receta.model.js';

export const listarRecetas = async (req, res) => {
  try {
    const recetas = await Receta.obtenerTodas();
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listarPorPlatillo = async (req, res) => {
  try {
    const recetas = await Receta.obtenerPorPlatillo(req.params.id);
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearReceta = async (req, res) => {
  try {
    const id = await Receta.crear(req.body);
    res.json({ message: "Ingrediente agregado a receta", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarReceta = async (req, res) => {
  try {
    await Receta.actualizar(req.params.id, req.body);
    res.json({ message: "Receta actualizada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarReceta = async (req, res) => {
  try {
    await Receta.eliminar(req.params.id);
    res.json({ message: "Ingrediente eliminado de receta" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
