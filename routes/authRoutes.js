const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

const { protectUser } = require("../middleware/userAuth");

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protectUser, getProfile);
router.put("/profile", protectUser, updateProfile);
router.put("/change-password", protectUser, changePassword);

module.exports = router;
