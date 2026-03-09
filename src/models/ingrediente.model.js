import { pool } from '../config/database.js';
import Platillo from './platillo.model.js';

const Ingrediente = {

  async obtenerTodos() {
    const [rows] = await pool.query(`
      SELECT id_ingrediente,
             nombre,
             unidad_base,
             costo_presentacion,
             cantidad_presentacion
      FROM ingredientes
      WHERE activo = TRUE
    `);
    return rows;
  },

  async obtenerPorId(id) {
    const [rows] = await pool.query(`
      SELECT id_ingrediente,
             nombre,
             unidad_base,
             costo_presentacion,
             cantidad_presentacion
      FROM ingredientes
      WHERE id_ingrediente = ?
      AND activo = TRUE
    `, [id]);

    return rows[0];
  },

  async crear(data) {
    const [result] = await pool.query(`
      INSERT INTO ingredientes
      (nombre, unidad_base, costo_presentacion, cantidad_presentacion, activo)
      VALUES (?, ?, ?, ?, TRUE)
    `, [
      data.nombre,
      data.unidad_base,
      data.costo_presentacion,
      data.cantidad_presentacion
    ]);

    return result.insertId;
  },

  // 🔥 ACTUALIZAR CON RECÁLCULO AUTOMÁTICO
  async actualizar(id, data) {

    const [result] = await pool.query(`
      UPDATE ingredientes SET
        nombre = ?,
        unidad_base = ?,
        costo_presentacion = ?,
        cantidad_presentacion = ?
      WHERE id_ingrediente = ?
    `, [
      data.nombre,
      data.unidad_base,
      data.costo_presentacion,
      data.cantidad_presentacion,
      id
    ]);

    // 🔥 Si realmente se modificó algo
    if (result.affectedRows > 0) {
      await this.recalcularPlatillosAfectados(id);
    }

    return result.affectedRows;
  },

  async eliminar(id) {
    const [result] = await pool.query(`
      UPDATE ingredientes
      SET activo = FALSE
      WHERE id_ingrediente = ?
    `, [id]);

    if (result.affectedRows > 0) {
      await this.recalcularPlatillosAfectados(id);
    }

    return result.affectedRows;
  },

  // 🔥 MÉTODO NUEVO ENTERPRISE
  async recalcularPlatillosAfectados(id_ingrediente) {

    const [platillos] = await pool.query(`
      SELECT DISTINCT id_platillo
      FROM receta
      WHERE id_ingrediente = ?
    `, [id_ingrediente]);

    for (const p of platillos) {
      await Platillo.actualizarCosto(p.id_platillo);
    }
  }

};

export default Ingrediente;
