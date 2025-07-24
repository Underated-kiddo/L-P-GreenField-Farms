const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getMessages } = require("../controllers/messageController");

const router = express.Router();

// GET /api/messages/:id → Chat between logged-in user and target user
router.get("/:id", protect, getMessages);

module.exports = router;
