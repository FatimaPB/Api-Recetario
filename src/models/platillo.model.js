import { pool } from '../config/database.js';

const Platillo = {

  async obtenerTodos() {
    const sql = `
      SELECT p.id_platillo,
             p.nombre,
             p.descripcion,
             p.imagen,
             p.activo,
             p.id_subcategoria,
             p.costo_total,
             p.precio_venta,
             s.nombre AS subcategoria
      FROM platillos p
      LEFT JOIN subcategorias s
        ON p.id_subcategoria = s.id_subcategoria
    `;

    const [rows] = await pool.query(sql);
    return rows;
  },

  async obtenerPorId(id) {
    const sql = `
      SELECT id_platillo,
             nombre,
             descripcion,
             imagen,
             activo,
             id_subcategoria,
             costo_total,
             precio_venta
      FROM platillos
      WHERE id_platillo = ?
    `;

    const [rows] = await pool.query(sql, [id]);
    return rows[0];
  },

  async crear(data) {
    const sql = `
      INSERT INTO platillos
      (nombre, descripcion, imagen, id_subcategoria, activo, costo_total, precio_venta)
      VALUES (?, ?, ?, ?, ?, 0, 0)
    `;

    const [result] = await pool.query(sql, [
      data.nombre,
      data.descripcion,
      data.imagen,
      data.id_subcategoria,
      data.activo ?? true
    ]);

    return result.insertId;
  },

  async actualizar(id, data) {

    let sql = `
    UPDATE platillos SET
      nombre = ?,
      descripcion = ?,
      id_subcategoria = ?,
      activo = ?
  `;

    const valores = [
      data.nombre,
      data.descripcion,
      data.id_subcategoria,
      data.activo
    ];

    // Solo actualizar imagen si existe en data
    if (data.imagen) {
      sql += `, imagen = ?`;
      valores.push(data.imagen);
    }

    sql += ` WHERE id_platillo = ?`;
    valores.push(id);

    const [result] = await pool.query(sql, valores);

    return result.affectedRows;
  },

  async eliminar(id) {
    const sql = `
      UPDATE platillos
      SET activo = FALSE
      WHERE id_platillo = ?
    `;

    const [result] = await pool.query(sql, [id]);
    return result.affectedRows;
  },

  // 🔥 1️⃣ ACTUALIZAR COSTO
  // 🔥 1️⃣ ACTUALIZAR COSTO CON CONVERSIÓN DE UNIDADES
  // 🔥 1️⃣ ACTUALIZAR COSTO (INGREDIENTES + COMPONENTES)
  async actualizarCosto(id_platillo) {

    const sqlCosto = `
    UPDATE platillos p
    SET costo_total = (

      -- 🔹 COSTO DE INGREDIENTES (con conversión)
      (
        SELECT IFNULL(SUM(
          (i.costo_presentacion / i.cantidad_presentacion) *
          (r.cantidad * u.factor_base)
        ), 0)
        FROM receta r
        JOIN ingredientes i 
          ON r.id_ingrediente = i.id_ingrediente
        JOIN unidades_medida u
          ON r.id_unidad = u.id_unidad
        WHERE r.id_platillo = ?
      )

      +

      -- 🔹 COSTO DE PLATILLOS HIJOS (COMBOS)
      (
        SELECT IFNULL(SUM(
          ph.costo_total * cp.cantidad
        ), 0)
        FROM componentes_platillo cp
        JOIN platillos ph
          ON cp.id_platillo_hijo = ph.id_platillo
        WHERE cp.id_platillo_padre = ?
      )

    )
    WHERE p.id_platillo = ?
  `;

    await pool.query(sqlCosto, [
      id_platillo,  // ingredientes
      id_platillo,  // componentes
      id_platillo   // update final
    ]);

    await this.actualizarPrecio(id_platillo);
  },
  // 🔥 2️⃣ ACTUALIZAR PRECIO
  async actualizarPrecio(id_platillo) {

    // 1️⃣ Obtener costo_total
    const [platilloRows] = await pool.query(
      `SELECT costo_total FROM platillos WHERE id_platillo = ?`,
      [id_platillo]
    );

    if (!platilloRows.length) return;

    const costo = platilloRows[0].costo_total;

    // 2️⃣ Obtener configuración activa
    const [configRows] = await pool.query(
      `SELECT ganancia_porcentaje, iva_porcentaje, servicio_porcentaje
     FROM configuracion_precios
     WHERE activo = TRUE
     LIMIT 1`
    );

    if (!configRows.length) return;

    const config = configRows[0];

    // 3️⃣ Calcular precio en JS (más seguro y claro)
    let precio =
      costo *
      (1 + config.ganancia_porcentaje / 100) *
      (1 + config.servicio_porcentaje / 100) *
      (1 + config.iva_porcentaje / 100);

    precio = parseFloat(precio.toFixed(2));

    // 4️⃣ Guardar precio
    await pool.query(
      `UPDATE platillos SET precio_venta = ? WHERE id_platillo = ?`,
      [precio, id_platillo]
    );
  },

  // 🔥 REPORTE COMPLETO PARA PDF
  async obtenerReporteCompleto(id_platillo) {

    // 1️⃣ PLATILLO PRINCIPAL
    const [platilloRows] = await pool.query(`
      SELECT 
        id_platillo,
        nombre,
        descripcion,
        imagen,
        costo_total,
        precio_venta
      FROM platillos
      WHERE id_platillo = ?
    `, [id_platillo]);

    if (!platilloRows.length) return null;

    // 2️⃣ INGREDIENTES (tabla de costos)
    const [ingredientes] = await pool.query(`
      SELECT 
        i.nombre AS ingrediente,
        i.costo_presentacion,
        i.cantidad_presentacion,
        i.unidad_base,
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
      JOIN ingredientes i 
        ON r.id_ingrediente = i.id_ingrediente
      JOIN unidades_medida u
        ON r.id_unidad = u.id_unidad
      WHERE r.id_platillo = ?
    `, [id_platillo]);

    // 3️⃣ COMPONENTES (platillos hijos / combos)
    const [componentes] = await pool.query(`
      SELECT 
        p.id_platillo,
        p.nombre,
        p.descripcion,
        cp.cantidad,
        p.costo_total,
        (p.costo_total * cp.cantidad) AS costo_en_combo
      FROM componentes_platillo cp
      JOIN platillos p
        ON cp.id_platillo_hijo = p.id_platillo
      WHERE cp.id_platillo_padre = ?
    `, [id_platillo]);

    return {
      platillo: platilloRows[0],
      ingredientes,
      componentes
    };
  },

  // 🔥 RECETARIO COMPLETO
  async obtenerRecetarioCompleto() {

    const [platillos] = await pool.query(`
    SELECT 
      p.id_platillo,
      cg.nombre AS categoria
    FROM platillos p
    JOIN subcategorias s 
      ON p.id_subcategoria = s.id_subcategoria
    JOIN categorias_globales cg 
      ON s.id_categoria_global = cg.id_categoria_global
    WHERE p.activo = TRUE
    ORDER BY cg.nombre ASC, p.nombre ASC
  `);

    const recetario = [];

    for (const p of platillos) {

      const reporte = await this.obtenerReporteCompleto(p.id_platillo);

      if (reporte) {
        reporte.platillo.categoria = p.categoria; // 👈 importante
        recetario.push(reporte);
      }
    }

    return recetario;
  }

};



export default Platillo;
