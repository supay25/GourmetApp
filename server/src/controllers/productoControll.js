import producto from "../models/producto.js";


//Listar Todos los productos 
export const getProductos = async (req, res) => {

    try {
        const productos = await producto.find()
        res.json(productos)

    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener Productos" })

    }


}

//Filtrar por Id

export const getProducto = async (req, res) => {
    try {

        const productoID = await producto.findById(req.params.id)
        res.json(productoID)

    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener Producto" })
    }
}






// Crear una
export const createProducto = async (req, res) => {
    try {
        const nuevoProducto = await producto.create(req.body)
        res.status(201).json(nuevoProducto)
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear Producto" })
    }
}




export const updateProducto = async (req, res) => {

    try {
        const productoID = await producto.findByIdAndUpdate(
            req.params.id,
            req.body,
           { returnDocument: 'after' }
        )
        if (!productoID) return res.status(404).json({ mensaje: "Producto no encontrado" })
        else {
            res.status(200).json({ mensaje: "Producto actualizado", producto: productoID })
        }

    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar Producto" })
    }
}




export const deleteProducto = async (req, res) => {
    try {

        const deleteProducto = await producto.findByIdAndDelete(req.params.id)


        if (!deleteProducto) return res.status(404).json({ mensaje: "Producto no encontrado" })
        res.status(200).json({ mensaje: "producto eliminado" })

    } catch (error) {
        console.error("Error: ", error)
        res.status(500).json({ error: "Error interno" })
    }
}