const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// GET /api/auth/me
router.get("/login", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
