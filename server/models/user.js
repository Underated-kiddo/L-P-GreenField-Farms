const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" },
  role: { type: String, enum: ["admin", "farmer", "customer"], default: "customer" },
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
