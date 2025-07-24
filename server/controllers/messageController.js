const Message = require("../models/messageModel");

// GET /api/messages/:id
const getMessages = async (req, res) => {
  const { id: otherUserId } = req.params;
  const currentUserId = req.user._id;

  try {
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId },
      ],
    }).sort("createdAt");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to load messages" });
  }
};

module.exports = { getMessages };
