const express = require("express");
const router = express.Router();
const Tip = require("../models/tip");
const Advert = require("../models/advert");
const { protect, authorizeRoles } = require("../middleware/auth");

router.post("/tip", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const tip = await Tip.create({ ...req.body, createdBy: req.user._id });
    res.json(tip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create tip', error: err.message });
  }
});

router.post("/advert", protect, authorizeRoles("admin"), async (req, res) => {
  const advert = await Advert.create({ ...req.body, postedBy: req.user._id });
  res.json(advert);
});

router.get("/tips", protect, authorizeRoles("farmer"), async (req, res) => {
  const tips = await Tip.find();
  res.json(tips);
});

router.get("/adverts", protect, authorizeRoles("customer"), async (req, res) => {
  const ads = await Advert.find();
  res.json(ads);
});

module.exports = router;
