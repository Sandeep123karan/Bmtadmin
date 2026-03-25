const HomeStayBooking = require("../models/homeStayBookingModel");
const HomeStay = require("../models/homeStayModel");

/* =========================================================
   🏡 CREATE BOOKING
========================================================= */
exports.createBooking = async (req, res) => {
  try {
    const {
      homeStayId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalRooms,
      contactDetails
    } = req.body;

    const userId = req.user ? req.user.id : req.body.userId;

    /* ================= VALIDATION ================= */
    if (!homeStayId || !checkInDate || !checkOutDate || !totalGuests) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      return res.status(400).json({
        success: false,
        message: "Invalid check-out date"
      });
    }

    /* ================= FIND HOMESTAY ================= */
    const homeStay = await HomeStay.findById(homeStayId);

    if (!homeStay) {
      return res.status(404).json({
        success: false,
        message: "HomeStay not found"
      });
    }

    /* ================= DATE AVAILABILITY CHECK ================= */
    const existingBookings = await HomeStayBooking.find({
      homeStayId,
      bookingStatus: { $ne: "cancelled" },
      $or: [
        {
          checkInDate: { $lt: checkOut },
          checkOutDate: { $gt: checkIn }
        }
      ]
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Rooms not available for selected dates"
      });
    }

    /* ================= PRICE CALCULATION ================= */
    const nights = Math.ceil(
      (checkOut - checkIn) / (1000 * 60 * 60 * 24)
    );

    const pricePerNight = Number(homeStay.pricePerNight) || 0;
    const cleaningFee = Number(homeStay.cleaningFee) || 0;
    const serviceFee = Number(homeStay.serviceFee) || 0;
    const tax = Number(homeStay.tax) || 0;
    const discount = Number(homeStay.discount) || 0;

    const totalAmount =
      (nights * pricePerNight * (totalRooms || 1)) +
      cleaningFee +
      serviceFee +
      tax -
      discount;

    /* ================= CREATE BOOKING ================= */
    const booking = new HomeStayBooking({
      userId,
      homeStayId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalRooms,
      totalNights: nights,
      pricePerNight,
      cleaningFee,
      serviceFee,
      tax,
      discount,
      totalAmount,
      contactDetails
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "HomeStay booking successful",
      booking
    });

  } catch (error) {
    console.log("BOOKING ERROR:", error);
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
    const bookings = await HomeStayBooking.find()
      .populate("homeStayId")
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
    const userId = req.user ? req.user.id : req.query.userId;

    const bookings = await HomeStayBooking.find({ userId })
      .populate("homeStayId")
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
    const booking = await HomeStayBooking.findById(req.params.id)
      .populate("homeStayId")
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
    const booking = await HomeStayBooking.findById(req.params.id);

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

    const booking = await HomeStayBooking.findByIdAndUpdate(
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