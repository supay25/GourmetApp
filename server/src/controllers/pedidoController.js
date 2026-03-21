import pedido from "../models/pedido.js";
import producto from "../models/producto.js";

// Listar todos los pedidos
export const getPedidos = async (req, res) => {
  try {
    const pedidos = await pedido.find().sort({ fecha: -1 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener pedidos" });
  }
};

// Filtrar por Id
export const getPedido = async (req, res) => {
  try {
    const pedidoID = await pedido.findById(req.params.id);
    if (!pedidoID)
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    res.json(pedidoID);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener pedido" });
  }
};

// Crear pedido
export const createPedido = async (req, res) => {
  try {
    const nuevoPedido = await pedido.create(req.body);
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear pedido" });
  }
};

// Actualizar estado del pedido
export const updateEstado = async (req, res) => {
  try {
    const pedidoID = await pedido.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    if (!pedidoID)
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    res.status(200).json({ mensaje: "Pedido actualizado", pedido: pedidoID });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar pedido" });
  }
};

// Cancelar pedido — cambia estado a cancelado y restaura stock
export const cancelPedido = async (req, res) => {
  try {
    const pedidoExistente = await pedido.findById(req.params.id);
    if (!pedidoExistente)
      return res.status(404).json({ mensaje: "Pedido no encontrado" });

    // No cancelar si ya está cancelado o entregado
    if (pedidoExistente.estado === "cancelado") {
      return res.status(400).json({ mensaje: "El pedido ya está cancelado" });
    }
    if (pedidoExistente.estado === "entregado") {
      return res
        .status(400)
        .json({ mensaje: "No se puede cancelar un pedido entregado" });
    }

    // Restaurar stock de cada producto tipo 'stock'
    for (const item of pedidoExistente.lista) {
      if (item.productoId) {
        await producto.findOneAndUpdate(
          { _id: item.productoId, tipo: "stock" }, // solo si es tipo stock
          { $inc: { stock: item.cantidad } }, // sumar la cantidad de vuelta
        );
      }
    }

    // Cambiar estado a cancelado
    const pedidoCancelado = await pedido.findByIdAndUpdate(
      req.params.id,
      { estado: "cancelado" },
      { returnDocument: "after" },
    );

    res
      .status(200)
      .json({
        mensaje: "Pedido cancelado y stock restaurado",
        pedido: pedidoCancelado,
      });
  } catch (error) {
    console.error("Error al cancelar:", error);
    res.status(500).json({ mensaje: "Error al cancelar pedido" });
  }
};

// Guardar URL del comprobante en el pedido
export const updateComprobante = async (req, res) => {
  try {
    const { comprobante } = req.body;
    const pedidoActualizado = await pedido.findByIdAndUpdate(
      req.params.id,
      { comprobante },
      { returnDocument: "after" },
    );
    if (!pedidoActualizado)
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    res
      .status(200)
      .json({ mensaje: "Comprobante guardado", pedido: pedidoActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al guardar comprobante" });
  }
};

// Eliminar pedido
export const deletePedido = async (req, res) => {
  try {
    const pedidoEliminado = await pedido.findByIdAndDelete(req.params.id);
    if (!pedidoEliminado)
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    res.status(200).json({ mensaje: "Pedido eliminado" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error interno" });
  }
};
