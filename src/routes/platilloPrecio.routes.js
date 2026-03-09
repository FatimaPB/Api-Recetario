import { Router } from 'express';
import {
  obtener,
  guardar,
  eliminar
} from '../controllers/platilloPrecio.controller.js';

const router = Router();

router.get('/:id', obtener);
router.post('/', guardar);
router.delete('/:id', eliminar);

export default router;
