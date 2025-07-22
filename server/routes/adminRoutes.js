const express = require("express");
const router = express.Router();
const Tip = require("../models/tip");
const Advert = require("../models/advert");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// ADMIN: Post a farming tip
router.post("/tip", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const { title, content, media, season } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const tip = await Tip.create({
      title,
      content,
      media: media || [],
      season: season || "All",
      createdBy: req.user._id
    });

    res.status(201).json(tip);
  } catch (err) {
    console.error("Error creating tip:", err.message);
    res.status(500).json({ message: "Failed to create tip", error: err.message });
  }
});

// ADMIN: Post an advert
router.post("/advert", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const { productRef, description, media, featured } = req.body;

    if (!productRef || !description) {
      return res.status(400).json({ message: "Product reference and description are required" });
    }

    const advert = await Advert.create({
      productRef,
      description,
      media: media || [],
      featured: featured || false,
      postedBy: req.user._id
    });

    res.status(201).json(advert);
  } catch (err) {
    console.error("Error creating advert:", err.message);
    res.status(500).json({ message: "Failed to create advert", error: err.message });
  }
});

// FARMER: View all tips
router.get("/tips", protect, authorizeRoles("farmer"), async (req, res) => {
  try {
    const tips = await Tip.find().sort({ createdAt: -1 });
    res.status(200).json(tips);
  } catch (err) {
    console.error("Error fetching tips:", err.message);
    res.status(500).json({ message: "Failed to fetch tips", error: err.message });
  }
});

// CUSTOMER: View all adverts
router.get("/adverts", protect, authorizeRoles("customer"), async (req, res) => {
  try {
    const ads = await Advert.find().sort({ createdAt: -1 });
    res.status(200).json(ads);
  } catch (err) {
    console.error("Error fetching adverts:", err.message);
    res.status(500).json({ message: "Failed to fetch adverts", error: err.message });
  }
});

module.exports = router;
