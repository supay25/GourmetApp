import { User } from "../models/user.model.js";
import {
  hashPassword,
  encryptData,
  decryptData,
} from "../helpers/security.helper.js";

// Helper para desencriptar y limpiar un usuario
const decryptUser = (user) => {
  if (!user) return null;
  const decrypted = { ...user };
  decrypted.identification = decryptData(user.identification);
  decrypted.fullName = decryptData(user.fullName);
  delete decrypted.password; // nunca enviamos el password al frontend
  return decrypted;
};

export const createUser = async (data) => {
  const passwordHashed = await hashPassword(data.passwordHash);

  const encryptedData = {
    ...data,
    password: passwordHashed,
    identification: encryptData(data.identification),
    fullName: encryptData(data.fullName),
    role: data.role || "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const user = await User.create(encryptedData);
  return user;
};

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email }).lean();
  return decryptUser(user);
};

// Obtener todos los usuarios (para el panel admin)
export const getAllUsers = async () => {
  const users = await User.find().lean();
  return users.map(decryptUser);
};

// Actualizar usuario por ID
export const updateUser = async (id, data) => {
  const updateData = { ...data, updatedAt: new Date() };

  // Solo hashear si se envió una nueva contraseña
  if (data.password) {
    updateData.password = await hashPassword(data.password);
  }
  // Solo encriptar si se enviaron los campos sensibles
  if (data.identification) {
    updateData.identification = encryptData(data.identification);
  }
  if (data.fullName) {
    updateData.fullName = encryptData(data.fullName);
  }

  const user = await User.findByIdAndUpdate(id, updateData, { new: true }).lean();
  return decryptUser(user);
};

// Eliminar usuario por ID
export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};