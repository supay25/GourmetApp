import mongoose from 'mongoose';

// Modelo para guardar las carpetas de la galería en MongoDB
// Usamos la BD como fuente de verdad en lugar de depender de la API de Cloudinary
const folderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const Folder = mongoose.model('Folder', folderSchema);