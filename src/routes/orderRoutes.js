const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', createOrder);
router.get('/list', listOrders);
router.get('/:orderId', getOrderById);
router.put('/:orderId', authMiddleware, updateOrder);
router.delete('/:orderId', authMiddleware, deleteOrder);

module.exports = router;
