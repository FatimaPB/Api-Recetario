import { pool } from '../config/database.js';

const Usuario = {

  async crear(usuario) {
    const { nombre, email, password, rol } = usuario;

    const sql = `
      INSERT INTO usuarios (nombre, email, password, rol)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      nombre,
      email,
      password,
      rol || 'administrador'
    ]);

    return result.insertId;
  },

  async buscarPorEmail(email) {
    const sql = `
    SELECT id, nombre, email, password, rol, estado
    FROM usuarios
    WHERE email = ?
  `;
    const [rows] = await pool.execute(sql, [email]);
    return rows[0];
  },
  async listar() {
    const sql = `
    SELECT id, nombre, email, rol, estado, created_at
    FROM usuarios
    ORDER BY created_at DESC
  `;
    const [rows] = await pool.execute(sql);
    return rows;
  },

  async cambiarEstado(id, estado) {
    const sql = `
    UPDATE usuarios
    SET estado = ?
    WHERE id = ?
  `;
    await pool.execute(sql, [estado, id]);
  }
};




export default Usuario;


