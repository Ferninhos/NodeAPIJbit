const Order = require('../models/Order');
const { mapRequestToOrder, mapOrderToResponse } = require('../utils/orderMapper');

async function createOrder(req, res, next) {
  try {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    if (!numeroPedido || valorTotal === undefined || !dataCriacao || !items) {
      return res.status(400).json({
        error: 'Campos obrigatórios: numeroPedido, valorTotal, dataCriacao, items',
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'O campo items deve ser um array com pelo menos um item',
      });
    }

    const mappedData = mapRequestToOrder(req.body);
    const existingOrder = await Order.findOne({ orderId: mappedData.orderId });

    if (existingOrder) {
      return res.status(409).json({
        error: `Pedido com orderId "${mappedData.orderId}" já existe`,
      });
    }

    const order = new Order(mappedData);
    await order.save();

    res.status(201).json({
      message: 'Pedido criado com sucesso',
      order: mapOrderToResponse(order),
    });
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        error: `Pedido "${orderId}" não encontrado`,
      });
    }

    res.status(200).json(mapOrderToResponse(order));
  } catch (error) {
    next(error);
  }
}

async function listOrders(req, res, next) {
  try {
    const orders = await Order.find().sort({ creationDate: -1 });

    res.status(200).json({
      total: orders.length,
      orders: orders.map(mapOrderToResponse),
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  try {
    const { orderId } = req.params;
    const mappedData = mapRequestToOrder(req.body);

    mappedData.orderId = orderId;

    const order = await Order.findOneAndUpdate(
      { orderId },
      mappedData,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        error: `Pedido "${orderId}" não encontrado`,
      });
    }

    res.status(200).json({
      message: 'Pedido atualizado com sucesso',
      order: mapOrderToResponse(order),
    });
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const { orderId } = req.params;
    const order = await Order.findOneAndDelete({ orderId });

    if (!order) {
      return res.status(404).json({
        error: `Pedido "${orderId}" não encontrado`,
      });
    }

    res.status(200).json({
      message: `Pedido "${orderId}" removido com sucesso`,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrder, getOrderById, listOrders, updateOrder, deleteOrder };
