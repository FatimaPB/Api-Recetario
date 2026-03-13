import { pool } from '../config/database.js';


/* ==============================
   ESTADÍSTICAS GENERALES
================================ */
export const obtenerEstadisticas = async (req, res) => {
  try {

    const [rows] = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM platillos) AS platillos,
        (SELECT COUNT(*) FROM ingredientes) AS ingredientes,
        (SELECT COUNT(*) FROM categorias_globales) AS categorias,
        (SELECT COUNT(*) FROM subcategorias) AS subcategorias,
        (SELECT COUNT(*) FROM usuarios) AS usuarios
    `);

    res.json(rows[0]);

  } catch (error) {
    console.error('Error en obtenerEstadisticas:', error);
    res.status(500).json({ mensaje: 'Error al obtener estadísticas' });
  }
};



/* ==============================
   ÚLTIMOS PLATILLOS
================================ */
export const obtenerUltimosPlatillos = async (req, res) => {
  try {

    const [rows] = await pool.query(`
      SELECT 
        nombre,
        imagen,
        costo_total,
        precio_venta
      FROM platillos
      ORDER BY id_platillo DESC
      LIMIT 5
    `);

    res.json(rows);

  } catch (error) {
    console.error('Error en obtenerUltimosPlatillos:', error);

    res.status(500).json({
      mensaje: 'Error al obtener últimos platillos'
    });
  }
};


