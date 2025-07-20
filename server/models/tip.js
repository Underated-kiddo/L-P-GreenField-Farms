const mongoose = require("mongoose");
const tipSchema = new mongoose.Schema({
  title: String,
  content: String,
  media: [String],
  season: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Tip", tipSchema);
