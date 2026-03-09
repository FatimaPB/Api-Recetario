import { pool } from '../config/database.js';

class PlatilloOpcional {

  static async obtenerPorPlatillo(id) {
    const [rows] = await pool.query(`
      SELECT 
        po.id_platillo_principal,
        po.id_platillo_opcional,
        p.nombre AS opcional_nombre,
        po.cantidad
      FROM platillo_opcional po
      INNER JOIN platillos p 
        ON po.id_platillo_opcional = p.id_platillo
      WHERE po.id_platillo_principal = ?
    `, [id]);

    return rows;
  }

  static async crear(data) {
    const { id_platillo_principal, id_platillo_opcional, cantidad } = data;

    await pool.query(`
      INSERT INTO platillo_opcional 
      (id_platillo_principal, id_platillo_opcional, cantidad)
      VALUES (?, ?, ?)
    `, [id_platillo_principal, id_platillo_opcional, cantidad]);
  }

  static async actualizar(data) {
    const { id_platillo_principal, id_platillo_opcional, cantidad } = data;

    await pool.query(`
      UPDATE platillo_opcional
      SET cantidad = ?
      WHERE id_platillo_principal = ?
      AND id_platillo_opcional = ?
    `, [cantidad, id_platillo_principal, id_platillo_opcional]);
  }

  static async eliminar(id_principal, id_opcional) {
    await pool.query(`
      DELETE FROM platillo_opcional
      WHERE id_platillo_principal = ?
      AND id_platillo_opcional = ?
    `, [id_principal, id_opcional]);
  }

}

export default PlatilloOpcional;
