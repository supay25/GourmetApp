import express from 'express';
import cloudinary from '../config/cloudinary.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

// Ruta pública para subir comprobantes — no requiere JWT
// La carpeta 'comprobantes' en Cloudinary se puede limpiar periódicamente
router.post('/comprobante', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No se recibió ningún archivo' });

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: 'gourmetto/comprobantes',
      use_filename: true,
      unique_filename: true,
    });

    res.status(201).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;