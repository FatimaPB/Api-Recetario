import PrecioMotor from '../models/precioMotor.model.js';

export const recalcularPrecio = async (req, res) => {
  try {
    const resultado = await PrecioMotor.recalcular(req.params.id);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
