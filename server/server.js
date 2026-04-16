require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const Bouquet = require('./models/Bouquet');
const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ---------- API ROUTES ----------

// Get all available bouquets
app.get('/api/bouquets', async (req, res) => {
  try {
    const bouquets = await Bouquet.find({ isAvailable: true }).sort({ createdAt: -1 });
    res.json(bouquets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bouquets' });
  }
});

// Create a new order
app.post('/api/orders', async (req, res) => {
  const { customerName, customerEmail, items } = req.body;

  if (!customerName || !customerEmail || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid order data' });
  }

  try {
    // Build order items and compute total
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const bouquet = await Bouquet.findById(item.id);
      if (!bouquet || !bouquet.isAvailable) {
        return res.status(400).json({ error: `Bouquet ${item.id} not available` });
      }
      orderItems.push({
        bouquetId: bouquet._id,
        name: bouquet.name,
        price: bouquet.price,
        qty: item.qty
      });
      totalAmount += bouquet.price * item.qty;
    }

    const order = new Order({
      customerName,
      customerEmail,
      items: orderItems,
      totalAmount
    });

    await order.save();
    res.status(201).json({ message: 'Order created', orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Optional: get all orders (for admin)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});