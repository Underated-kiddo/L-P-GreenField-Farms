const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const { protect } = require("../middleware/authMiddleware");

// Start or get a chat
router.post("/chat", protect, async (req, res) => {
  const { userId } = req.body;
  try {
    let chat = await Chat.findOne({
      members: { $all: [req.user._id, userId] }
    });

    if (!chat) {
      chat = await Chat.create({ members: [req.user._id, userId] });
    }

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's chats
router.get("/chat", protect, async (req, res) => {
  try {
    const chats = await Chat.find({ members: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send message
router.post("/message", protect, async (req, res) => {
  const { chatId, text } = req.body;
  try {
    const msg = await Message.create({
      chatId,
      senderId: req.user._id,
      text,
    });
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get chat messages
router.get("/message/:chatId", protect, async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
