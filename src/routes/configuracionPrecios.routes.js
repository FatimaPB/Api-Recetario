import { Router } from 'express';
import {
  obtenerActiva,
  guardar
} from '../controllers/configuracionPrecios.controller.js';

const router = Router();

router.get('/', obtenerActiva);
router.post('/', guardar);

export default router;
