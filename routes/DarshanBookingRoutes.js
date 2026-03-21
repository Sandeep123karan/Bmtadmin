// const express = require("express");
// const {
//   getAllDarshanBookings,
//   createDarshanBooking,
//   updateDarshanBooking,
//   deleteDarshanBooking
// } = require("../controllers/DarshanBookingController");

// const router = express.Router();

// router.get("/", getAllDarshanBookings);
// router.post("/", createDarshanBooking);
// router.put("/:id", updateDarshanBooking);
// router.delete("/:id", deleteDarshanBooking);

// module.exports = router;



const express = require("express");
const router = express.Router();
const controller = require("../controllers/DarshanBookingController");

// CREATE booking
router.post("/", controller.createDarshanBooking);

// GET all bookings (admin)
router.get("/", controller.getDarshanBookings);

// GET single booking
router.get("/:id", controller.getSingleBooking);

// UPDATE booking
router.put("/:id", controller.updateBooking);

// DELETE booking
router.delete("/:id", controller.deleteBooking);

module.exports = router;

