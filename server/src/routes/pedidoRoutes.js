import { Router } from "express";
import {
  createPedido,
  updateEstado,
  deletePedido,
  getPedido,
  getPedidos,
  cancelPedido,
  updateComprobante,
} from "../controllers/pedidoController.js";

const pedidoRouter = Router();

pedidoRouter.post("/", createPedido);
pedidoRouter.put("/:id", updateEstado);
pedidoRouter.put("/:id/cancelar", cancelPedido); // ← nuevo endpoint de cancelación
pedidoRouter.delete("/:id", deletePedido);
pedidoRouter.get("/", getPedidos);
pedidoRouter.get("/:id", getPedido);
pedidoRouter.put("/:id/comprobante", updateComprobante);

export default pedidoRouter;
