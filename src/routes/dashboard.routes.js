import express from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';

import {
  obtenerEstadisticas,
  obtenerUltimosPlatillos,
} from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/', verificarToken, obtenerEstadisticas);
router.get('/ultimos-platillos', verificarToken, obtenerUltimosPlatillos);

export default router;