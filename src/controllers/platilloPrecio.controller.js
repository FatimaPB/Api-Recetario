import PlatilloPrecio from '../models/platilloPrecio.model.js';

export const obtener = async (req, res) => {
  try {
    const data = await PlatilloPrecio.obtenerPorPlatillo(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const guardar = async (req, res) => {
  try {
    await PlatilloPrecio.guardar(req.body);
    res.json({ message: 'Configuración personalizada guardada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    await PlatilloPrecio.eliminar(req.params.id);
    res.json({ message: 'Configuración personalizada eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
