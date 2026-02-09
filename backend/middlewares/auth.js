import jwt from "jsonwebtoken";

// Verify JWT token
export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
        expiredAt: error.expiredAt,
      });
    }
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Admin access required" });
  }
  next();
};

// Combined middleware for admin routes
export const adminAuth = [auth, isAdmin];

// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: err.message,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  res.status(500).json({ success: false, message: "Server error" });
};
