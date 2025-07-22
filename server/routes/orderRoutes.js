const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrdersByUser,
  getAllOrders,
} = require("../controllers/orderController");

// Create a new order (must be logged in)
router.post("/", protect, createOrder);

// Get orders made by the logged-in user
router.get("/my-orders", protect, getOrdersByUser);

// Admin/Farmer access to see all orders (you can extend this with role-based middleware if needed)
router.get("/", protect, getAllOrders);

module.exports = router;
