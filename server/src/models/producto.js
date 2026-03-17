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
  stock: {
    type: Number,
    required: true
  },
  imagen: {
    type: String,
    required: false
  },
})

const producto = mongoose.model("Producto", productoSchema)

export default producto