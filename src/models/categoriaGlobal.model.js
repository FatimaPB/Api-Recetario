import { pool } from '../config/database.js';

class CategoriaGlobal {

    static async obtenerTodas() {
        const [rows] = await pool.query(
            "SELECT * FROM categorias_globales WHERE activo = TRUE"
        );
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await pool.query(
            "SELECT * FROM categorias_globales WHERE id_categoria_global = ?",
            [id]
        );
        return rows[0];
    }

    static async crear(data) {
        const { nombre } = data;

        const [result] = await pool.query(
            "INSERT INTO categorias_globales (nombre) VALUES (?)",
            [nombre]
        );

        return result.insertId;
    }

    static async actualizar(id, data) {
        const { nombre } = data;

        await pool.query(
            "UPDATE categorias_globales SET nombre = ? WHERE id_categoria_global = ?",
            [nombre, id]
        );
    }

    static async eliminar(id) {
        await pool.query(
            "UPDATE categorias_globales SET activo = FALSE WHERE id_categoria_global = ?",
            [id]
        );
    }
}

export default CategoriaGlobal;
