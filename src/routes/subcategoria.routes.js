import { Router } from 'express';
import {
  listarSubcategorias,
  obtenerSubcategoria,
  crearSubcategoria,
  actualizarSubcategoria,
  eliminarSubcategoria
} from '../controllers/subcategoria.controller.js';

const router = Router();

router.get('/', listarSubcategorias);
router.get('/:id', obtenerSubcategoria);
router.post('/', crearSubcategoria);
router.put('/:id', actualizarSubcategoria);
router.delete('/:id', eliminarSubcategoria);

export default router;
