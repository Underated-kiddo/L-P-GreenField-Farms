// server/controllers/orderController.js

// Mock controller just to get the app running
exports.createOrder = (req, res) => {
  res.status(201).json({ message: "Order created (mock)" });
};

exports.getOrdersByUser = (req, res) => {
  res.status(200).json({ message: "Your orders (mock)" });
};

exports.getAllOrders = (req, res) => {
  res.status(200).json({ message: "All orders (mock)" });
};
