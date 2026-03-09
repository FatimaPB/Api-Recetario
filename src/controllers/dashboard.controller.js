import { pool } from '../config/database.js';

export const obtenerEstadisticas = async (req, res) => {
  try {

    const [[platillos]] = await pool.query(
      'SELECT COUNT(*) as total FROM platillos'
    );

    const [[ingredientes]] = await pool.query(
      'SELECT COUNT(*) as total FROM ingredientes'
    );


    res.json({
      platillos: platillos.total,
      ingredientes: ingredientes.total,
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener estadísticas',
      error
    });
  }
};