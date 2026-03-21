const Booking = require("../models/bookingModel");
const Campsite = require("../models/campsiteModel");

/* =========================================================
   ➕ CREATE BOOKING
========================================================= */
exports.createBooking = async (req, res) => {
  try {
    const {
      campsiteId,
      checkInDate,
      checkOutDate,
      totalGuests,
      adults,
      children,
      totalTents,
      guestDetails,
      contactDetails,
      couponCode
    } = req.body;

    /* ================= VALIDATION ================= */
    if (!campsiteId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const campsite = await Campsite.findById(campsiteId);
    if (!campsite) {
      return res.status(404).json({ message: "Campsite not found" });
    }

    /* ================= DATE CALC ================= */
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);

    const totalNights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (totalNights <= 0) {
      return res.status(400).json({ message: "Invalid date selection" });
    }

    /* ================= AVAILABILITY ================= */
    if (campsite.availableTents < totalTents) {
      return res.status(400).json({
        message: `Only ${campsite.availableTents} tents available`
      });
    }

    /* ================= PRICE CALC ================= */
    const pricePerNight = campsite.price?.perNight || 0;

    const subtotal = pricePerNight * totalNights * totalTents;

    const discountAmount = (subtotal * (campsite.discount || 0)) / 100;
    const taxAmount = (subtotal * (campsite.taxPercent || 0)) / 100;

    let couponDiscount = 0;

    // simple coupon logic (future me DB se lena)
    if (couponCode === "BMT10") {
      couponDiscount = subtotal * 0.1;
    }

    const serviceFee = 50; // fixed (changeable)

    const totalAmount =
      subtotal - discountAmount - couponDiscount + taxAmount + serviceFee;

    /* ================= CREATE BOOKING ================= */
    const booking = await Booking.create({
      campsiteId,
      userId: req.user.id,

      checkInDate,
      checkOutDate,
      totalNights,

      totalGuests,
      adults,
      children,

      guestDetails,

      totalTents,

      pricePerNight,
      subtotal,
      discountAmount,
      taxAmount,
      couponCode,
      couponDiscount,
      serviceFee,
      totalAmount,

      contactDetails,

      bookingStatus: "pending",
      paymentStatus: "pending"
    });

    /* ================= UPDATE AVAILABILITY ================= */
    campsite.availableTents -= totalTents;
    await campsite.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   📋 GET USER BOOKINGS
========================================================= */
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("campsiteId")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   📋 GET ALL BOOKINGS (ADMIN)
========================================================= */
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("campsiteId")
      .populate("userId")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   ❌ CANCEL BOOKING
========================================================= */
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({ message: "Already cancelled" });
    }

    booking.bookingStatus = "cancelled";
    booking.cancellationReason = req.body.reason || "User cancelled";

    await booking.save();

    /* ================= RESTORE TENTS ================= */
    const campsite = await Campsite.findById(booking.campsiteId);

    if (campsite) {
      campsite.availableTents += booking.totalTents;
      await campsite.save();
    }

    res.json({
      success: true,
      message: "Booking cancelled successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   💳 UPDATE PAYMENT STATUS
========================================================= */
exports.updatePayment = async (req, res) => {
  try {
    const { paymentId, status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentId = paymentId;
    booking.paymentStatus = status;

    if (status === "paid") {
      booking.bookingStatus = "confirmed";
    }

    await booking.save();

    res.json({
      success: true,
      message: "Payment updated",
      booking
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};