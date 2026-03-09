import PlatilloOpcional from '../models/platilloOpcional.model.js';

export const listarPorPlatillo = async (req, res) => {
  try {
    const data = await PlatilloOpcional.obtenerPorPlatillo(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crear = async (req, res) => {
  try {
    await PlatilloOpcional.crear(req.body);
    res.json({ message: 'Opcional agregado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizar = async (req, res) => {
  try {
    await PlatilloOpcional.actualizar(req.body);
    res.json({ message: 'Cantidad actualizada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    const { principal, opcional } = req.params;
    await PlatilloOpcional.eliminar(principal, opcional);
    res.json({ message: 'Opcional eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
