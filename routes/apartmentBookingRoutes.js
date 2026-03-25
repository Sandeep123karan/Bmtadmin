const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/apartmentBookingController");

/* CREATE */
router.post("/create", ctrl.createBooking);

/* GET ALL */
router.get("/all", ctrl.getAllBookings);

/* CANCEL */
router.put("/cancel/:id", ctrl.cancelBooking);

module.exports = router;