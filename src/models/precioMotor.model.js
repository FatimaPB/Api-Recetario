import { pool } from '../config/database.js';

class PrecioMotor {

  static async recalcular(id_platillo) {

    // 1️⃣ Calcular costo total de receta
    const [receta] = await pool.query(`
      SELECT 
        SUM(r.cantidad * i.costo_presentacion) AS costo_total
      FROM receta r
      INNER JOIN ingredientes i 
        ON r.id_ingrediente = i.id_ingrediente
      WHERE r.id_platillo = ?
    `, [id_platillo]);

    const costo_base = receta[0].costo_total || 0;

    // 2️⃣ Buscar configuración personalizada
    const [personalizada] = await pool.query(`
      SELECT * FROM platillo_precio
      WHERE id_platillo = ?
    `, [id_platillo]);

    let config;

    if (personalizada.length > 0) {
      config = personalizada[0];
    } else {
      const [global] = await pool.query(`
        SELECT * FROM configuracion_precios
        WHERE activo = TRUE
        LIMIT 1
      `);

      if (!global.length) {
        throw new Error('No existe configuración global activa');
      }

      config = global[0];
    }

    const ganancia = costo_base * (config.ganancia_porcentaje / 100);
    const subtotal = costo_base + ganancia;

    const iva = subtotal * (config.iva_porcentaje / 100);
    const servicio = subtotal * (config.servicio_porcentaje / 100);

    const precio_final = subtotal + iva + servicio;

    // 3️⃣ Guardar en tabla platillos
    await pool.query(`
      UPDATE platillos
      SET costo_total = ?, precio_venta = ?
      WHERE id_platillo = ?
    `, [costo_base, precio_final, id_platillo]);

    return {
      costo_base,
      ganancia,
      iva,
      servicio,
      precio_final
    };
  }

}

export default PrecioMotor;
