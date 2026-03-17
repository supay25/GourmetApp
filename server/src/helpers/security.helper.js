import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';

const AES_SECRET = process.env.AES_SECRET_KEY || 'clave-temporal-123';

// Exportamos cada función por su nombre
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

export const encryptData = (data) => {
    if (!data) return "";
    return CryptoJS.AES.encrypt(data.toString(), AES_SECRET).toString();
};

export const decryptData = (ciphertext) => {
    if (!ciphertext) return "";
    const bytes = CryptoJS.AES.decrypt(ciphertext, AES_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
};