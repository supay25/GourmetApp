import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    identification: String,
    fullName: String,
    username: { type: String, unique: true }, // nombre de usuario para login
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["admin", "cliente"], // admin: acceso al panel, cliente: futuro registro
      default: "admin",
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    versionKey: false,
  }
);

export const User = mongoose.model("User", userSchema);