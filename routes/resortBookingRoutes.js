const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/resortBookingController");

router.post("/create", bookingController.createBooking);
router.get("/all", bookingController.getAllBookings);
router.get("/:id", bookingController.getSingleBooking);
router.put("/cancel/:id", bookingController.cancelBooking);

module.exports = router;