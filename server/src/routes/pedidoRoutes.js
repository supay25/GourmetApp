import { Router } from "express"
import { createPedido , updateEstado, deletePedido, getPedido, getPedidos } from "../controllers/pedidoController.js"

const pedidoRouter = Router()

//Funciones CRUD producto
pedidoRouter.post("/", createPedido)
pedidoRouter.put("/:id", updateEstado)
pedidoRouter.delete("/:id", deletePedido)
pedidoRouter.get("/", getPedidos)
pedidoRouter.get("/:id", getPedido)





export default pedidoRouter