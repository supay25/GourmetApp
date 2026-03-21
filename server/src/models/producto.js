import mongoose from "mongoose"

const productoSchema = new mongoose.Schema({
  codigoProducto: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: false
  },
  precio: {
    type: Number,
    required: true
  },
  // Peso o contenido del producto — ej: "120g", "250ml"
  peso: {
    type: String,
    required: false,
    default: ''
  },
  imagen: {
    type: String,
    required: false
  },
  // Tipo de producto — define cómo se maneja la disponibilidad
  tipo: {
    type: String,
    enum: ['stock', 'tiempo_limitado'],
    default: 'stock'
  },
  // Control manual de visibilidad
  activo: {
    type: Boolean,
    default: true
  },
  // Para tipo 'stock' — se muestra siempre, se bloquea si stock === 0
  stock: {
    type: Number,
    default: 0
  },
  // Para tipo 'tiempo_limitado' — solo visible entre estas fechas
  fechaInicio: {
    type: Date,
    default: null
  },
  fechaFin: {
    type: Date,
    default: null
  },
})

const producto = mongoose.model("Producto", productoSchema)

export default producto