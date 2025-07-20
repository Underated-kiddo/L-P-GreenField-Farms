const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

module.exports = protect;
