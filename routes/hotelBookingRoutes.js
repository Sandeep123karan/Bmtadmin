
// const express = require("express");
// const router = express.Router();
// const {
//   getHotelBookings,
//   addHotelBooking,
//   updateHotelBooking,
//   deleteHotelBooking,
// } = require("../controllers/hotelBookingController");

// router.get("/", getHotelBookings);
// router.post("/", addHotelBooking);
// router.put("/:id", updateHotelBooking);
// router.delete("/:id", deleteHotelBooking);

// module.exports = router;
const express = require("express");
const router = express.Router();

const {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/hotelBookingController");

/* ===== ROUTES ===== */
router.post("/create", createBooking);
router.get("/all", getAllBookings);
router.get("/:id", getSingleBooking);
router.put("/update/:id", updateBooking);
router.delete("/delete/:id", deleteBooking);

module.exports = router;
