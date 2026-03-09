import { pool } from '../config/database.js';
import Platillo from './platillo.model.js';

class Receta {

  // 🔹 Listar todas
  static async obtenerTodas() {
    const [rows] = await pool.query(`
      SELECT 
        r.id_receta,
        r.id_platillo,
        p.nombre AS platillo_nombre,
        r.id_ingrediente,
        i.nombre AS ingrediente_nombre,
        i.unidad_base,
        i.costo_presentacion,
        i.cantidad_presentacion,
        r.cantidad AS cantidad_receta,
        u.nombre AS unidad_usada,

        -- costo por unidad base
        ROUND(
          (i.costo_presentacion / i.cantidad_presentacion),
          4
        ) AS costo_unitario,

        -- costo convertido correctamente
        ROUND(
          (i.costo_presentacion / i.cantidad_presentacion) *
          (r.cantidad * u.factor_base),
          2
        ) AS costo_en_receta

      FROM receta r
      INNER JOIN platillos p 
        ON r.id_platillo = p.id_platillo
      INNER JOIN ingredientes i 
        ON r.id_ingrediente = i.id_ingrediente
      INNER JOIN unidades_medida u
        ON r.id_unidad = u.id_unidad
    `);

    return rows;
  }

  // 🔹 Listar por platillo
  static async obtenerPorPlatillo(id_platillo) {
    const [rows] = await pool.query(`
      SELECT 
        r.id_receta,
        r.id_ingrediente,
        i.nombre AS ingrediente_nombre,
        i.unidad_base,
        i.costo_presentacion,
        i.cantidad_presentacion,
        r.cantidad AS cantidad_receta,
        u.nombre AS unidad_usada,

        ROUND(
          (i.costo_presentacion / i.cantidad_presentacion),
          4
        ) AS costo_unitario,

        ROUND(
          (i.costo_presentacion / i.cantidad_presentacion) *
          (r.cantidad * u.factor_base),
          2
        ) AS costo_en_receta

      FROM receta r
      INNER JOIN ingredientes i 
        ON r.id_ingrediente = i.id_ingrediente
      INNER JOIN unidades_medida u
        ON r.id_unidad = u.id_unidad
      WHERE r.id_platillo = ?
    `, [id_platillo]);

    return rows;
  }

  // 🔥 CREAR con unidad
  static async crear(data) {
    const { id_platillo, id_ingrediente, cantidad, id_unidad } = data;

    const [result] = await pool.query(`
      INSERT INTO receta 
      (id_platillo, id_ingrediente, cantidad, id_unidad)
      VALUES (?, ?, ?, ?)
    `, [id_platillo, id_ingrediente, cantidad, id_unidad]);

    // 🔥 recalcular costo_total del platillo
    await Platillo.actualizarCosto(id_platillo);

    return result.insertId;
  }

  // 🔥 ACTUALIZAR con unidad
  static async actualizar(id, data) {
    const { cantidad, id_unidad } = data;

    // Obtener platillo relacionado
    const [rows] = await pool.query(
      `SELECT id_platillo FROM receta WHERE id_receta = ?`,
      [id]
    );

    if (!rows.length) return;

    const id_platillo = rows[0].id_platillo;

    await pool.query(`
      UPDATE receta
      SET cantidad = ?, id_unidad = ?
      WHERE id_receta = ?
    `, [cantidad, id_unidad, id]);

    // 🔥 recalcular costo_total
    await Platillo.actualizarCosto(id_platillo);
  }

  // 🔥 ELIMINAR con recalculo automático
  static async eliminar(id) {

    const [rows] = await pool.query(
      `SELECT id_platillo FROM receta WHERE id_receta = ?`,
      [id]
    );

    if (!rows.length) return;

    const id_platillo = rows[0].id_platillo;

    await pool.query(`
      DELETE FROM receta
      WHERE id_receta = ?
    `, [id]);

    // 🔥 recalcular costo_total
    await Platillo.actualizarCosto(id_platillo);
  }

}

export default Receta;
