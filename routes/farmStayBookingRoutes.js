const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/farmStayBookingController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

/* CREATE */
router.post("/create", protect, ctrl.createBooking);

/* USER */
router.get("/my", protect, ctrl.myBookings);

/* ADMIN */
router.get("/all", protect, isAdmin, ctrl.getAllBookings);

/* CANCEL */
router.put("/cancel/:id", protect, ctrl.cancelBooking);

module.exports = router;