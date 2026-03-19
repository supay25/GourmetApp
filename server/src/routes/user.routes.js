import express from "express";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { validateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Obtener todos los usuarios — requiere JWT
router.get("/users", validateJWT, getUsers);

// Obtener usuario por email — requiere JWT
router.get("/users/:email", validateJWT, getUser);

// Crear usuario — público (para crear el primer admin)
router.post("/users", createUser);

// Actualizar usuario — requiere JWT
router.put("/users/:id", validateJWT, updateUser);

// Eliminar usuario — requiere JWT
router.delete("/users/:id", validateJWT, deleteUser);

export default router;