const express = require("express");
const router = express.Router();

const {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
  updatePayment
} = require("../controllers/CampsitebookingController"); 

const { protect, isAdmin } = require("../middleware/authMiddleware");


router.post("/create", protect, createBooking);
router.get("/my", protect, getUserBookings);
router.put("/cancel/:id", protect, cancelBooking);


router.put("/payment/:id", protect, updatePayment);


router.get("/all", protect, isAdmin, getAllBookings);

module.exports = router;