const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Main auth middleware - checks token from header or cookies
const protect = async (req, res, next) => {
  try {
    let token;

    // Check Bearer token from headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Fallback to cookie
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    res.status(401).json({ message: "Not authorized" });
  }
};

// Role-based middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: Insufficient role" });
    }
    next();
  };
};

module.exports = {
  protect,
  authorizeRoles,
};
