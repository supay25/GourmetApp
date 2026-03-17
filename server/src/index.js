import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// rutas API
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

connectDB()
  .then(() => {
    app.listen(PORT);
  })
  .catch(() => {
    process.exit(1);
  });
