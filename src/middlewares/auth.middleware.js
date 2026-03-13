import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            mensaje: 'Token no proporcionado'
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: 'Token inválido o expirado'
        });

    }

};

export const verificarSuperAdmin = (req, res, next) => {

    if (!req.usuario) {
        return res.status(401).json({
            mensaje: 'Usuario no autenticado'
        });
    }

    if (req.usuario.rol !== 'superadmin') {
        return res.status(403).json({
            mensaje: 'Acceso denegado. Solo superadmin.'
        });
    }

    next();
};