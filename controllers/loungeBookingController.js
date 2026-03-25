const LoungeBooking = require("../models/loungeBookingModel");
const Lounge = require("../models/loungeModel");

/* ================= CREATE BOOKING ================= */
exports.createBooking = async (req, res) => {
  try {
    const {
      loungeId,
      visitDate,
      totalGuests,
      contactDetails
    } = req.body;

    if (!loungeId || !visitDate || !totalGuests) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    // lounge check
    const lounge = await Lounge.findById(loungeId);
    if (!lounge || lounge.status !== "approved") {
      return res.status(404).json({
        success: false,
        message: "Lounge not available"
      });
    }

    // price calculation
    const totalAmount = lounge.price * totalGuests;

    const booking = await LoungeBooking.create({
      loungeId,
      userId: req.user?.id || null,
      bookingDate: new Date(),
      visitDate,
      totalGuests,
      totalAmount,
      contactDetails
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully 🎉",
      data: booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* ================= GET ALL BOOKINGS (ADMIN) ================= */
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await LoungeBooking.find()
      .populate("loungeId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: bookings.length,
      data: bookings
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* ================= GET USER BOOKINGS ================= */
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await LoungeBooking.find({ userId: req.user.id })
      .populate("loungeId");

    res.json({
      success: true,
      data: bookings
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* ================= UPDATE STATUS ================= */
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await LoungeBooking.findByIdAndUpdate(
      req.params.id,
      { status },
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
      data: booking
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* ================= DELETE BOOKING ================= */
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await LoungeBooking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      message: "Booking deleted"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};