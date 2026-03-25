const express = require("express");
const router = express.Router();

const controller = require("../controllers/placeBookingController");

/* CREATE */
router.post("/create", controller.createBooking);

/* ADMIN */
router.get("/all", controller.getAllBookings);

/* USER */
router.get("/my", controller.getUserBookings);

/* SINGLE */
router.get("/:id", controller.getSingleBooking);

/* CANCEL */
router.put("/cancel/:id", controller.cancelBooking);

/* STATUS */
router.put("/status/:id", controller.updateBookingStatus);

module.exports = router;