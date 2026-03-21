const express = require("express");
const router = express.Router();

const bookingCtrl = require("../controllers/loveHotelBookingController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

/* USER */
router.post("/create", protect, bookingCtrl.createBooking);
router.get("/my", protect, bookingCtrl.getMyBookings);
router.put("/cancel/:id", protect, bookingCtrl.cancelBooking);

/* ADMIN */
router.get("/all", protect, isAdmin, bookingCtrl.getAllBookings);

module.exports = router;