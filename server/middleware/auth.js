const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Auth middleware to check if user is logged in
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};

// Role-based middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: Insufficient role" });
    }
    next();
  };
};

module.exports = {
  protect,
  authorizeRoles,
};
