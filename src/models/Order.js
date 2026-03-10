const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: [true, 'O campo productId é obrigatório'],
    },
    quantity: {
      type: Number,
      required: [true, 'O campo quantity é obrigatório'],
      min: [1, 'A quantidade mínima é 1'],
    },
    price: {
      type: Number,
      required: [true, 'O campo price é obrigatório'],
      min: [0, 'O preço não pode ser negativo'],
    },
  },
  { _id: true }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, 'O campo orderId é obrigatório'],
      unique: true,
      index: true,
    },
    value: {
      type: Number,
      required: [true, 'O campo value é obrigatório'],
      min: [0, 'O valor não pode ser negativo'],
    },
    creationDate: {
      type: Date,
      required: [true, 'O campo creationDate é obrigatório'],
    },
    items: {
      type: [itemSchema],
      validate: {
        validator: (items) => items.length > 0,
        message: 'O pedido deve conter pelo menos um item',
      },
    },
  },
  {
    versionKey: '__v',
    timestamps: false,
  }
);

module.exports = mongoose.model('Order', orderSchema);
