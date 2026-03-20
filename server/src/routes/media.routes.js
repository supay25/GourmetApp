import express from 'express';
import {
  uploadImage,
  getImages,
  getFolders,
  createFolder,
  deleteImage,
} from '../controllers/media.controller.js';
import { validateJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

// Listar carpetas — requiere JWT
router.get('/folders', validateJWT, getFolders);

// Crear carpeta — requiere JWT
router.post('/folders', validateJWT, createFolder);

// Listar imágenes de una carpeta — requiere JWT
router.get('/images', validateJWT, getImages);

// Subir imagen — requiere JWT + multer para procesar el archivo
router.post('/images', validateJWT, upload.single('image'), uploadImage);

// Eliminar imagen — requiere JWT
router.delete('/images', validateJWT, deleteImage);

export default router;