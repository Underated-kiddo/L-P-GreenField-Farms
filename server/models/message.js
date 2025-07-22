const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null // For public/global messages
    },
    text: {
      type: String,
      trim: true,
      default: ""
    },
    imageUrl: {
      type: String,
      default: ""
    },
    seen: {
      type: Boolean,
      default: false
    },
    delivered: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Message", messageSchema);
