const mongoose = require("mongoose");
const advertSchema = new mongoose.Schema({
  productRef: String,
  description: String,
  media: [String],
  featured: Boolean,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Advert", advertSchema);
