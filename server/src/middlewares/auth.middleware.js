import { verifyToken } from '../helpers/auth.helper.js';

export const validateJWT = (req, res, next) => {
    // El token suele venir en el header: Authorization: Bearer <token>
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(403).json({ error: "Token inválido o expirado." });
    }

    // Guardamos la info del usuario en el objeto request para que las rutas la usen
    req.user = decoded;
    next(); // Continuar a la siguiente función
};