import { Router } from "express"
import { createProducto , updateProducto, deleteProducto, getProducto, getProductos } from "../controllers/productoControll.js"

const productoRouter = Router()

//Funciones CRUD producto
productoRouter.post("/", createProducto)
productoRouter.put("/:id", updateProducto)
productoRouter.delete("/:id", deleteProducto)
productoRouter.get("/", getProductos)
productoRouter.get("/:id", getProducto)





export default productoRouter