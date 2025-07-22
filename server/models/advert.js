const mongoose = require("mongoose");

const advertSchema = new mongoose.Schema({
  productRef: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  media: {
    type: [String],
    default: []
  },
  featured: {
    type: Boolean,
    default: false
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Advert", advertSchema);
