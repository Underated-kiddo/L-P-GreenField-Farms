const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/user/dashboard - returns user info for dashboard
router.get('/dashboard', protect, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.email || req.user.username || 'User'}!`,
    role: req.user.role,
    user: {
      id: req.user._id,
      email: req.user.email,
      username: req.user.username,
      role: req.user.role
    }
  });
});

module.exports = router;






module.exports = router;