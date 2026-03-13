import Subcategoria from '../models/subcategoria.model.js';

export const listarSubcategorias = async (req, res) => {
  try {
    const subcategorias = await Subcategoria.obtenerTodas();
    res.json(subcategorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerSubcategoria = async (req, res) => {
  try {
    const subcategoria = await Subcategoria.obtenerPorId(req.params.id);
    res.json(subcategoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const crearSubcategoria = async (req, res) => {
  try {

    if (req.body.nombre) {
      req.body.nombre = req.body.nombre.trim();
    }

    const id = await Subcategoria.crear(req.body);

    res.status(201).json({
      mensaje: "Subcategoría creada correctamente",
      id
    });

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        mensaje: 'Ya existe esa subcategoría en la categoría seleccionada'
      });
    }

    res.status(500).json({
      mensaje: 'Error al crear subcategoría',
      error
    });
  }
};

export const actualizarSubcategoria = async (req, res) => {
  try {

    if (req.body.nombre) {
      req.body.nombre = req.body.nombre.trim();
    }

    await Subcategoria.actualizar(req.params.id, req.body);

    res.json({
      mensaje: "Subcategoría actualizada correctamente"
    });

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        mensaje: 'Ya existe esa subcategoría en la categoría seleccionada'
      });
    }

    res.status(500).json({
      mensaje: 'Error al actualizar subcategoría',
      error
    });
  }
};

export const eliminarSubcategoria = async (req, res) => {
  try {
    await Subcategoria.eliminar(req.params.id);
    res.json({ message: "Subcategoría eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
