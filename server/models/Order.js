const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  bouquetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bouquet', required: true },
  name: String,
  price: Number,
  qty: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' } // pending, confirmed, shipped, etc.
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);