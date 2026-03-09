import { Router } from 'express';
import {
  listarPorPlatillo,
  crear,
  eliminar
} from '../controllers/componente.controller.js';

const router = Router();

// Listar componentes de un platillo
router.get('/platillo/:id', listarPorPlatillo);

// Crear componente
router.post('/', crear);

// Eliminar componente
router.delete('/:id', eliminar);

export default router;
