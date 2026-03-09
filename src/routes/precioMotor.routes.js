import { Router } from 'express';
import { recalcularPrecio } from '../controllers/precioMotor.controller.js';

const router = Router();

router.post('/:id', recalcularPrecio);

export default router;
