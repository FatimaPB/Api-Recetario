import express from 'express';
import { login, logout } from '../controllers/auth.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

router.get('/verificar', verificarToken, (req, res) => {
    res.json({
        autenticado: true,
        usuario: req.usuario
    });
});

router.get('/me', verificarToken, (req, res) => {
    res.json({
        id: req.usuario.id,
        email: req.usuario.email,
        rol: req.usuario.rol
    });
});

router.get('/verificar-rol', verificarToken, (req, res) => {
    res.json({
        id: req.usuario.id,
        email: req.usuario.email,
        rol: req.usuario.rol
    });
});

router.post('/logout', logout);
export default router;
