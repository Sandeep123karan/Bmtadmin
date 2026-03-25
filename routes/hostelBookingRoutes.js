const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/hostelBookingController");

/* CREATE */
router.post("/create", bookingController.createBooking);

/* ADMIN */
router.get("/all", bookingController.getAllBookings);

/* USER */
router.get("/my", bookingController.getUserBookings);

/* SINGLE */
router.get("/:id", bookingController.getSingleBooking);

/* CANCEL */
router.put("/cancel/:id", bookingController.cancelBooking);

/* STATUS UPDATE */
router.put("/status/:id", bookingController.updateBookingStatus);

module.exports = router;