import express from "express";
import { getUser, createUser } from "../controllers/user.controller.js";
import { validateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users/:email", validateJWT, getUser);
router.post("/users", createUser);

export default router;
