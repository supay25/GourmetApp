import { User } from "../models/user.model.js";
import { comparePassword } from "../helpers/security.helper.js";
import { generateToken, getExpiresInSeconds } from "../helpers/auth.helper.js";

export const loginService = async (identifier, password) => {
  // 1. Buscar al usuario por username O email
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  }).lean();

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  // 2. Comparar contraseñas
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales inválidas");
  }

  // 3. Generar el token incluyendo el role para control de acceso
  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  // 4. Preparar userData sin la contraseña
  const { password: _, ...userData } = user;

  const expiresInSeconds = getExpiresInSeconds(
    process.env.JWT_EXPIRES_IN || "1h"
  );

  // Retornar estructura estilo DTO
  return {
    token,
    tokenExpiration: expiresInSeconds,
    userData,
  };
};