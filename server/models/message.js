const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group", // You'll define this model soon
    },
    text: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    emojis: {
      type: String, // optional emoji string (e.g. 😊👍🔥)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
