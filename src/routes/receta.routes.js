import { Router } from 'express';
import {
  listarRecetas,
  listarPorPlatillo,
  crearReceta,
  actualizarReceta,
  eliminarReceta
} from '../controllers/receta.controller.js';

const router = Router();

router.get('/', listarRecetas);

// 🔥 Endpoint clave
router.get('/platillo/:id', listarPorPlatillo);

router.post('/', crearReceta);
router.put('/:id', actualizarReceta);
router.delete('/:id', eliminarReceta);

export default router;
