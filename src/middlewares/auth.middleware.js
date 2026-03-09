import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                mensaje: 'Token no proporcionado'
            });
        }

        const token = authHeader.split(' ')[1];

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
    if (req.usuario.rol !== 'superadmin') {
        return res.status(403).json({
            mensaje: 'Acceso denegado. Solo superadmin.'
        });
    }

    next();
};