import { User } from "../models/user.model.js";
import { comparePassword } from "../helpers/security.helper.js";
import { generateToken, getExpiresInSeconds } from "../helpers/auth.helper.js";

export const loginService = async (email, password) => {
  // 1. Buscamos al usuario usando el servicio de User
  const user = await User.findOne({ email }).lean();

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  // 2. Comparamos contraseñas
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales inválidas");
  }

  // 3. Generamos el token
  const token = generateToken({ id: user._id, email: user.email });

  // 4. Preparamos el userData (quitando la contraseña)
  const { password: _, ...userData } = user;

  const expiresInSeconds = getExpiresInSeconds(
    process.env.JWT_EXPIRES_IN || "1h",
  );

  // Retornamos la estructura que pediste (estilo DTO C#)
  return {
    token,
    tokenExpiration: expiresInSeconds,
    userData,
  };
};
