import cloudinary from '../config/cloudinary.js';
import { Folder } from '../models/folder.model.js';

// Subir imagen a Cloudinary dentro de una carpeta
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió ningún archivo' });
    }

    const folder = req.body.folder || 'general';

    // Convertir buffer a base64 para enviarlo a Cloudinary
    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: `gourmetto/${folder}`,
      use_filename: true,
      unique_filename: true,
    });

    res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
      folder: result.folder,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar imágenes de una carpeta desde Cloudinary
export const getImages = async (req, res) => {
  try {
    const folder = req.query.folder || 'general';

    const result = await cloudinary.search
      .expression(`folder:gourmetto/${folder}`)
      .sort_by('created_at', 'desc')
      .max_results(50)
      .execute();

    const images = result.resources.map(img => ({
      url: img.secure_url,
      publicId: img.public_id,
      folder: img.folder,
      width: img.width,
      height: img.height,
      format: img.format,
      size: img.bytes,
      createdAt: img.created_at,
    }));

    res.json({ images, total: result.total_count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar carpetas desde MongoDB — fuente de verdad local
// Evita depender de la API de Cloudinary que no retorna carpetas vacías
export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find().sort({ createdAt: 1 });
    res.json({ folders: folders.map(f => f.name) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear carpeta — se guarda en MongoDB y también se crea en Cloudinary
export const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'El nombre es requerido' });

    // Guardar en MongoDB primero — fuente de verdad
    await Folder.create({ name });

    // Intentar crear en Cloudinary también (no crítico si falla)
    try {
      await cloudinary.api.create_folder(`gourmetto/${name}`);
    } catch (e) {
      // Ignorar error si la carpeta ya existe en Cloudinary
    }

    res.status(201).json({ folder: name });
  } catch (error) {
    // Error de nombre duplicado
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Ya existe una carpeta con ese nombre' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Eliminar imagen de Cloudinary por publicId
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) return res.status(400).json({ error: 'publicId es requerido' });

    await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};