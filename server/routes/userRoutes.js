const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `avatar_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// GET user settings
router.get("/settings", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "username about contact services theme emailNotifications isPrivate avatar"
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching settings" });
  }
});

// UPDATE settings
router.post("/settings", protect, async (req, res) => {
  try {
    const {
      username,
      about,
      contact,
      services,
      theme,
      emailNotifications,
      isPrivate,
      avatar,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        username,
        about,
        contact,
        services,
        theme,
        emailNotifications,
        isPrivate,
        ...(avatar && { avatar }),
      },
      { new: true }
    );

    res.json({ message: "Settings updated", user });
  } catch (err) {
    res.status(500).json({ message: "Error saving settings" });
  }
});

// CHANGE PASSWORD
router.post("/change-password", protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect current password" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update password" });
  }
});

// UPLOAD avatar
router.post("/upload-avatar", protect, upload.single("avatar"), async (req, res) => {
  try {
    const avatarUrl = `/uploads/${req.file.filename}`;
    res.json({ url: avatarUrl });
  } catch (err) {
    res.status(500).json({ message: "Avatar upload failed" });
  }
});

module.exports = router;
