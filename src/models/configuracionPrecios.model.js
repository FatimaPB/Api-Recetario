import { pool } from '../config/database.js';
import Platillo from './platillo.model.js';

class ConfiguracionPrecios {

  // 🔹 Obtener configuración activa
  static async obtenerActiva() {
    const [rows] = await pool.query(`
      SELECT * FROM configuracion_precios
      WHERE activo = TRUE
      LIMIT 1
    `);

    return rows[0];
  }

  // 🔥 Crear nueva configuración (desactiva la anterior)
  static async crear(data) {
    const { ganancia_porcentaje, iva_porcentaje, servicio_porcentaje } = data;

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Desactivar configuraciones anteriores
      await connection.query(`
        UPDATE configuracion_precios
        SET activo = FALSE
      `);

      // Insertar nueva configuración activa
      const [result] = await connection.query(`
        INSERT INTO configuracion_precios
        (ganancia_porcentaje, iva_porcentaje, servicio_porcentaje, activo)
        VALUES (?, ?, ?, TRUE)
      `, [ganancia_porcentaje, iva_porcentaje, servicio_porcentaje]);

      await connection.commit();

      // 🔥 Recalcular todos los platillos
      await this.recalcularTodosLosPlatillos();

      return result.insertId;

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // 🔥 Actualizar configuración activa
  static async actualizarActiva(data) {
    const { ganancia_porcentaje, iva_porcentaje, servicio_porcentaje } = data;

    await pool.query(`
      UPDATE configuracion_precios
      SET ganancia_porcentaje = ?,
          iva_porcentaje = ?,
          servicio_porcentaje = ?
      WHERE activo = TRUE
    `, [ganancia_porcentaje, iva_porcentaje, servicio_porcentaje]);

    // 🔥 Recalcular todos los platillos
    await this.recalcularTodosLosPlatillos();
  }

  // 🔥 MÉTODO ENTERPRISE
  static async recalcularTodosLosPlatillos() {

    const [platillos] = await pool.query(`
      SELECT id_platillo
      FROM platillos
      WHERE activo = TRUE
    `);

    for (const p of platillos) {
      await Platillo.actualizarPrecio(p.id_platillo);
    }
  }

}

export default ConfiguracionPrecios;
