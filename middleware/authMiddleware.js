


const jwt = require("jsonwebtoken");

/* ================= AUTH ================= */
const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token, unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

/* ================= ADMIN ================= */
const isAdmin = (req, res, next) => {
  if (
    req.user?.role === "admin" ||
    req.user?.role === "superadmin"
  ) {
    return next();
  }

  return res.status(403).json({ message: "Admin access only" });
};

/* ================= VENDOR ================= */
const isVendor = (req, res, next) => {
  if (
    req.user?.role === "vendor" ||
    req.user?.role === "admin" ||
    req.user?.role === "superadmin"
  ) {
    return next();
  }

  return res.status(403).json({ message: "Access denied. Vendors only." });
};

module.exports = { protect, isAdmin, isVendor };