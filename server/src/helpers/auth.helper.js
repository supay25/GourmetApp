import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'una_clave_muy_secreta_para_tokens';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const generateToken = (payload) => {
    // payload suele ser un objeto con el id del usuario { id: user._id }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null; // Si el token expiró o es falso, devolvemos null
    }
};

export const getExpiresInSeconds = (timeStr) => {
    const unit = timeStr.slice(-1); // extrae 'h', 'm', 's', 'd'
    const value = parseInt(timeStr.slice(0, -1));

    switch (unit) {
        case 's': return value;
        case 'm': return value * 60;
        case 'h': return value * 3600;
        case 'd': return value * 86400;
        default: return value; // Asume segundos si no hay unidad
    }
};