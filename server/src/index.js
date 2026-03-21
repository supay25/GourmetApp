import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productoRouter from "./routes/productoRoutes.js";
import pedidoRouter from "./routes/pedidoRoutes.js";
import mediaRoutes from "./routes/media.routes.js"; 
import publicRoutes from './routes/public.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// rutas
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/productos", productoRouter);
app.use("/api/pedidos", pedidoRouter);
app.use("/api/media", mediaRoutes); 
app.use('/api/public', publicRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error DB:", err);
    process.exit(1);
  });