import pedido from "../models/pedido.js";


//Listar Todos los productos 
export const getPedidos = async (req, res) => {

    try {
        
        const pedidos = await pedido.find()
        res.json(pedidos)

    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener Productos" })

    }


}


//Filtrar por Id

export const getPedido = async (req, res) => {
    try {

        const pedidoID = await pedido.findById(req.params.id)
         if (!pedidoID) return res.status(404).json({ mensaje: "pedido no encontrado" })
        res.json(pedidoID)

    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener Producto" })
    }
}


export const createPedido = async (req, res) => {
    try {
        const nuevoPedido = await pedido.create(req.body)
        res.status(201).json(nuevoPedido)
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear Producto" })
    }
}








export const deletePedido = async (req, res) => {
    try {

        const deletePedido = await pedido.findByIdAndDelete(req.params.id)


        if (!deletePedido) return res.status(404).json({ mensaje: "pedido no encontrado" })
        res.status(200).json({ mensaje: "pedido eliminado" })

    } catch (error) {
        console.error("Error: ", error)
        res.status(500).json({ error: "Error interno" })
    }
}




export const updateEstado = async (req, res) => {

    try {
        const pedidoID = await pedido.findByIdAndUpdate(
            req.params.id,
            req.body,
           { returnDocument: 'after' }
        )
        if (!pedidoID) return res.status(404).json({ mensaje: "Pedido no encontrado" })
        else {
            res.status(200).json({ mensaje: "Pedido actualizado", pedido: pedidoID })
        }

    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar Producto" })
    }
}
