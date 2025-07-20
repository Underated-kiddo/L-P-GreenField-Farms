const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const { protect, authorizeRoles } = require('../middleware/auth');

// Create order (customer only)
router.post('/', protect, authorizeRoles('customer'), async (req, res) => {
  try {
    const order = new Order({ ...req.body, customer: req.user._id });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get orders for customer
router.get('/', protect, authorizeRoles('customer'), async (req, res) => {
  const orders = await Order.find({ customer: req.user._id }).populate('products');
  res.json(orders);
});

module.exports = router;
