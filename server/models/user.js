const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["admin", "farmer", "customer"],
      default: "customer",
    },
    username: String,
    about: String,
    contact: String,
    services: [String],
    theme: { type: String, default: "system" },
    emailNotifications: { type: Boolean, default: true },
    isPrivate: { type: Boolean, default: false },
    avatar: String, // url of profile pic
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
