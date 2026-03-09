import { Router } from 'express';
import {
  listarCategoriasGlobales,
  obtenerCategoriaGlobal,
  crearCategoriaGlobal,
  actualizarCategoriaGlobal,
  eliminarCategoriaGlobal
} from '../controllers/categoriaGlobal.controller.js';

const router = Router();

router.get('/', listarCategoriasGlobales);
router.get('/:id', obtenerCategoriaGlobal);
router.post('/', crearCategoriaGlobal);
router.put('/:id', actualizarCategoriaGlobal);
router.delete('/:id', eliminarCategoriaGlobal);

export default router;
