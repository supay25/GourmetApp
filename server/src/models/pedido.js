import mongoose from "mongoose"

const pedidoSchema = new mongoose.Schema({

    codigo:{
        type: String,
        default: () => `GRM-${Date.now().toString().slice(-6)}`
    },

    nombre: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    lista: [
        {
            productoId: mongoose.Schema.Types.ObjectId,
            nombre: String,
            cantidad: Number,
            precio: Number
        }
    ],
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        default: "pendiente"
    },
    direccion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }

})


const pedido = mongoose.model("Pedido", pedidoSchema)

export default pedido
