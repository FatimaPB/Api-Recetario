import Componente from '../models/componente.model.js';

// 🔹 Listar componentes de un platillo
export const listarPorPlatillo = async (req, res) => {
  try {
    const { id } = req.params;
    const componentes = await Componente.obtenerPorPlatillo(id);
    res.json(componentes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener componentes' });
  }
};

// 🔥 Crear componente (agregar platillo dentro de otro)
export const crear = async (req, res) => {
  try {
    const id = await Componente.crear(req.body);
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear componente' });
  }
};

// 🔥 Eliminar componente
export const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    await Componente.eliminar(id);
    res.json({ mensaje: 'Componente eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar componente' });
  }
};
