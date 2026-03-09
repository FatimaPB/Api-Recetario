import { pool } from '../config/database.js';

class PlatilloPrecio {

  static async obtenerPorPlatillo(id) {
    const [rows] = await pool.query(`
      SELECT * FROM platillo_precio
      WHERE id_platillo = ?
    `, [id]);

    return rows[0];
  }

  static async guardar(data) {
    const { id_platillo, ganancia_porcentaje, iva_porcentaje, servicio_porcentaje } = data;

    const existe = await this.obtenerPorPlatillo(id_platillo);

    if (existe) {
      await pool.query(`
        UPDATE platillo_precio
        SET ganancia_porcentaje = ?,
            iva_porcentaje = ?,
            servicio_porcentaje = ?
        WHERE id_platillo = ?
      `, [ganancia_porcentaje, iva_porcentaje, servicio_porcentaje, id_platillo]);
    } else {
      await pool.query(`
        INSERT INTO platillo_precio
        (id_platillo, ganancia_porcentaje, iva_porcentaje, servicio_porcentaje)
        VALUES (?, ?, ?, ?)
      `, [id_platillo, ganancia_porcentaje, iva_porcentaje, servicio_porcentaje]);
    }
  }

  static async eliminar(id) {
    await pool.query(`
      DELETE FROM platillo_precio
      WHERE id_platillo = ?
    `, [id]);
  }

}

export default PlatilloPrecio;
