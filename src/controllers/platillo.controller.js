import Platillo from '../models/platillo.model.js';

export const listarPlatillos = async (req, res) => {
  try {
    const platillos = await Platillo.obtenerTodos();
    res.json(platillos);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener platillos',
      error
    });
  }
};

export const obtenerPlatillo = async (req, res) => {
  try {
    const { id } = req.params;
    const platillo = await Platillo.obtenerPorId(id);

    if (!platillo) {
      return res.status(404).json({
        mensaje: 'Platillo no encontrado'
      });
    }

    res.json(platillo);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener platillo',
      error
    });
  }
};

export const crearPlatillo = async (req, res) => {
  try {

    const data = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      id_subcategoria: req.body.id_subcategoria,
      activo: req.body.activo === 'true' ? 1 : 0,
      imagen: req.file
        ? `/uploads/platillos/${req.file.filename}`
        : null
    };

    const id = await Platillo.crear(data);

    res.status(201).json({
      mensaje: 'Platillo creado correctamente',
      id
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear platillo',
      error
    });
  }
};

export const actualizarPlatillo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      id_subcategoria: req.body.id_subcategoria,
      activo: req.body.activo === 'true' ? 1 : 0
    };

    // 🔥 SOLO agregar imagen si se manda una nueva
    if (req.file) {
      data.imagen = `/uploads/platillos/${req.file.filename}`;
    }

    const filasAfectadas = await Platillo.actualizar(id, data);

    if (filasAfectadas === 0) {
      return res.status(404).json({
        mensaje: 'Platillo no encontrado'
      });
    }

    res.json({
      mensaje: 'Platillo actualizado correctamente'
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar platillo',
      error
    });
  }
};

export const eliminarPlatillo = async (req, res) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await Platillo.eliminar(id);

    if (filasAfectadas === 0) {
      return res.status(404).json({
        mensaje: 'Platillo no encontrado'
      });
    }

    res.json({
      mensaje: 'Platillo desactivado correctamente'
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar platillo',
      error
    });
  }
};


export const obtenerReportePlatillo = async (req, res) => {
  try {

    const { id } = req.params;

    const reporte = await Platillo.obtenerReporteCompleto(id);

    if (!reporte) {
      return res.status(404).json({
        mensaje: 'Platillo no encontrado'
      });
    }

    res.json(reporte);

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al generar reporte',
      error
    });
  }
};

export const obtenerRecetarioCompleto = async (req, res) => {
  try {

    const recetario = await Platillo.obtenerRecetarioCompleto();

    res.json(recetario);

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al generar recetario completo',
      error
    });
  }
};

