import express from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { obtenerEstadisticas } from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/', verificarToken, obtenerEstadisticas);

export default router;