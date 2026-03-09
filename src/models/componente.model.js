import { pool } from '../config/database.js';
import Platillo from './platillo.model.js';

const Componente = {

  // 🔹 Listar componentes de un platillo
  async obtenerPorPlatillo(id_platillo_padre) {
    const [rows] = await pool.query(`
      SELECT 
        cp.id_componente,
        cp.id_platillo_hijo,
        p.nombre AS platillo_hijo_nombre,
        p.costo_total,
        cp.cantidad,
        (p.costo_total * cp.cantidad) AS costo_en_combo
      FROM componentes_platillo cp
      JOIN platillos p
        ON cp.id_platillo_hijo = p.id_platillo
      WHERE cp.id_platillo_padre = ?
    `, [id_platillo_padre]);

    return rows;
  },

  // 🔥 Crear componente (agregar platillo dentro de otro)
  async crear(data) {
    const { id_platillo_padre, id_platillo_hijo, cantidad } = data;

    const [result] = await pool.query(`
      INSERT INTO componentes_platillo
      (id_platillo_padre, id_platillo_hijo, cantidad)
      VALUES (?, ?, ?)
    `, [id_platillo_padre, id_platillo_hijo, cantidad]);

    // 🔥 recalcular costo automáticamente
    await Platillo.actualizarCosto(id_platillo_padre);

    return result.insertId;
  },

  // 🔥 Eliminar componente
  async eliminar(id_componente) {

    // Obtener platillo padre
    const [rows] = await pool.query(
      `SELECT id_platillo_padre 
       FROM componentes_platillo 
       WHERE id_componente = ?`,
      [id_componente]
    );

    if (!rows.length) return;

    const id_platillo_padre = rows[0].id_platillo_padre;

    await pool.query(
      `DELETE FROM componentes_platillo 
       WHERE id_componente = ?`,
      [id_componente]
    );

    // 🔥 recalcular costo automáticamente
    await Platillo.actualizarCosto(id_platillo_padre);
  }

};

export default Componente;
