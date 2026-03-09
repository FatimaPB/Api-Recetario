import { Router } from 'express';
import { listarUnidades } from '../controllers/unidad.controller.js';

const router = Router();

router.get('/', listarUnidades);

export default router;
