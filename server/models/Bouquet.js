const mongoose = require('mongoose');

const bouquetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  emoji: { type: String, default: '🌸' },
  imageUrl: { type: String, default: '' },
  category: { type: String, default: 'mixed' },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Bouquet', bouquetSchema);