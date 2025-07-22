const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// 📦 Create product (farmer only)
router.post('/', protect, authorizeRoles('farmer'), async (req, res) => {
  try {
    const product = new Product({ ...req.body, farmer: req.user._id });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🛒 Get all products (any logged-in user)
router.get('/', protect, async (req, res) => {
  try {
    const products = await Product.find().populate('farmer', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// ✏️ Update product (farmer only, and only their own)
router.put('/:id', protect, authorizeRoles('farmer'), async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user._id },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete product (farmer only, and only their own)
router.delete('/:id', protect, authorizeRoles('farmer'), async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      farmer: req.user._id
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
