import Unidad from '../models/unidad.model.js';

export const listarUnidades = async (req, res) => {
  try {
    const unidades = await Unidad.obtenerTodas();
    res.json(unidades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener unidades' });
  }
};
