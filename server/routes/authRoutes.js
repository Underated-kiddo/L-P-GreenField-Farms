const express = require("express");
const router = express.Router();
const { signup, login, logout, getProfile } = require("../controllers/authController");

// Signup route (was missing)
router.post("/signup", signup);

// Login route (already present)
router.post("/login", login);

// Logout route (already present)
router.get("/logout", logout);

// Get Profile route (was missing)
router.get("/profile", getProfile);

module.exports = router;
