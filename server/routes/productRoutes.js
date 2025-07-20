const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { protect, authorizeRoles } = require('../middleware/auth');

// Create product (farmer only)
router.post('/', protect, authorizeRoles('farmer'), async (req, res) => {
  try {
    const product = new Product({ ...req.body, farmer: req.user._id });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all products (customer/farmer)
router.get('/', protect, async (req, res) => {
  const products = await Product.find().populate('farmer', 'name');
  res.json(products);
});

// Update product (farmer only)
router.put('/:id', protect, authorizeRoles('farmer'), async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ _id: req.params.id, farmer: req.user._id }, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product (farmer only)
router.delete('/:id', protect, authorizeRoles('farmer'), async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, farmer: req.user._id });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
