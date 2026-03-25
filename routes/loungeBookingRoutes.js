const express = require("express");
const router = express.Router();

const {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
  deleteBooking
} = require("../controllers/loungeBookingController");

router.post("/create", createBooking);

router.get("/all", getAllBookings);
router.get("/my", getUserBookings);

router.put("/status/:id", updateBookingStatus);

router.delete("/delete/:id", deleteBooking);

module.exports = router;