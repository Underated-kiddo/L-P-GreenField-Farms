const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const { updateProfile } = require("../controllers/userController");

router.post("/profile", protect, upload.single("avatar"), updateProfile);

module.exports = router;
