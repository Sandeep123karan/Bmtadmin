const express = require("express");
const router = express.Router();

const bookingCtrl = require("../controllers/motelBookingController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

/* =========================================================
   🟢 CREATE BOOKING (USER)
========================================================= */
router.post("/create", protect, bookingCtrl.createBooking);


/* =========================================================
   📋 MY BOOKINGS (USER)
========================================================= */
router.get("/my", protect, bookingCtrl.getMyBookings);


/* =========================================================
   ❌ CANCEL BOOKING (USER)
========================================================= */
router.put("/cancel/:id", protect, bookingCtrl.cancelBooking);


/* =========================================================
   🛠️ ALL BOOKINGS (ADMIN)
========================================================= */
router.get("/all", protect, isAdmin, bookingCtrl.getAllBookings);


module.exports = router;