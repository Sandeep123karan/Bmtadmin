const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/holidayParkBookingController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

/* USER */
router.post("/create", protect, ctrl.createBooking);
router.get("/my", protect, ctrl.getMyBookings);
router.put("/cancel/:id", protect, ctrl.cancelBooking);

/* ADMIN */
router.get("/all", protect, isAdmin, ctrl.getAllBookings);

module.exports = router;