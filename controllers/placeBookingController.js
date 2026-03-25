const PlaceBooking = require("../models/placeBookingModel");
const Place = require("../models/placeModel");

/* =========================================================
   🏨 CREATE PLACE BOOKING
========================================================= */
exports.createBooking = async (req, res) => {
  try {
    const {
      placeId,
      visitDate,
      totalGuests,
      contactDetails
    } = req.body;

    const userId = req.user?.id || req.body.userId;

    /* ================= VALIDATION ================= */
    if (!placeId || !visitDate || !totalGuests) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    /* ================= FIND PLACE ================= */
    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found"
      });
    }

    /* ================= PRICE CALCULATION ================= */
    const pricePerPerson = place.entryFee?.adult || 0;
    const totalAmount = totalGuests * pricePerPerson;

    /* ================= CREATE BOOKING ================= */
    const booking = new PlaceBooking({
      userId,
      placeId,
      visitDate,
      totalGuests,
      pricePerPerson,
      totalAmount,
      contactDetails
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Place booking successful",
      booking
    });

  } catch (error) {
    console.log("PLACE BOOKING ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================================================
   📋 GET ALL BOOKINGS (ADMIN)
========================================================= */
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await PlaceBooking.find()
      .populate("placeId")
      .populate("userId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: bookings.length,
      bookings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================================================
   👤 GET USER BOOKINGS
========================================================= */
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user?.id;

    const bookings = await PlaceBooking.find({ userId })
      .populate("placeId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================================================
   🔎 GET SINGLE BOOKING
========================================================= */
exports.getSingleBooking = async (req, res) => {
  try {
    const booking = await PlaceBooking.findById(req.params.id)
      .populate("placeId")
      .populate("userId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================================================
   ❌ CANCEL BOOKING
========================================================= */
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await PlaceBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Already cancelled"
      });
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================================================
   🔄 UPDATE STATUS (ADMIN)
========================================================= */
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await PlaceBooking.findByIdAndUpdate(
      req.params.id,
      { bookingStatus: status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      message: "Status updated",
      booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};