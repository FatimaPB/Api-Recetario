import express from 'express';
import { registrarUsuario, listarUsuarios, cambiarEstadoUsuario } from '../controllers/usuario.controller.js';
import { verificarToken, verificarSuperAdmin } from '../middlewares/auth.middleware.js';


const router = express.Router();

// POST /api/usuarios
router.post('/', verificarToken, verificarSuperAdmin, registrarUsuario);
router.get('/', verificarToken, verificarSuperAdmin, listarUsuarios);
router.put('/:id/estado', verificarToken, verificarSuperAdmin, cambiarEstadoUsuario);

export default router;
