import ConfiguracionPrecios from '../models/configuracionPrecios.model.js';

export const obtenerActiva = async (req, res) => {
  try {
    const config = await ConfiguracionPrecios.obtenerActiva();
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const guardar = async (req, res) => {
  try {

    const configActual = await ConfiguracionPrecios.obtenerActiva();

    if (configActual) {
      await ConfiguracionPrecios.actualizarActiva(req.body);
      res.json({ message: "Configuración actualizada" });
    } else {
      await ConfiguracionPrecios.crear(req.body);
      res.json({ message: "Configuración creada" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
