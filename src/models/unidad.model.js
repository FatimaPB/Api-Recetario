import { pool } from '../config/database.js';

const Unidad = {

  async obtenerTodas() {
    const [rows] = await pool.query(`
      SELECT id_unidad, nombre, tipo, factor_base
      FROM unidades_medida
      ORDER BY nombre ASC
    `);

    return rows;
  }

};

export default Unidad;
