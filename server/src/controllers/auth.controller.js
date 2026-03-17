import { loginService } from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Llamamos al servicio de autenticación
    const authData = await loginService(email, password);

    // Enviamos la respuesta estilo DTO
    res.status(200).json(authData);
  } catch (error) {
    // Si es error de credenciales enviamos 401, si es otra cosa 500
    const status = error.message === "Credenciales inválidas" ? 401 : 500;
    res.status(status).json({ error: error.message });
  }
};``