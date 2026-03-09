import { pool } from '../config/database.js';

class Subcategoria {

  static async obtenerTodas() {
    const [rows] = await pool.query(`
      SELECT 
        s.id_subcategoria,
        s.nombre,
        s.activo,
        s.id_categoria_global,
        cg.nombre AS categoria_global_nombre
      FROM subcategorias s
      INNER JOIN categorias_globales cg 
        ON s.id_categoria_global = cg.id_categoria_global
      WHERE s.activo = TRUE
    `);

    return rows;
  }

  static async obtenerPorId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM subcategorias WHERE id_subcategoria = ?",
      [id]
    );
    return rows[0];
  }

  static async crear(data) {
    const { nombre, id_categoria_global } = data;

    const [result] = await pool.query(
      `INSERT INTO subcategorias 
        (nombre, id_categoria_global) 
       VALUES (?, ?)`,
      [nombre, id_categoria_global]
    );

    return result.insertId;
  }

  static async actualizar(id, data) {
    const { nombre, id_categoria_global } = data;

    await pool.query(
      `UPDATE subcategorias 
       SET nombre = ?, id_categoria_global = ?
       WHERE id_subcategoria = ?`,
      [nombre, id_categoria_global, id]
    );
  }

  static async eliminar(id) {
    await pool.query(
      `UPDATE subcategorias 
       SET activo = FALSE 
       WHERE id_subcategoria = ?`,
      [id]
    );
  }

}

export default Subcategoria;
