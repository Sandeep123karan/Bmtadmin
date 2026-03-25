const Booking = require("../models/apartmentBookingModel");
const Apartment = require("../models/apartmentModel");

/* =========================================================
   🏢 CREATE BOOKING
========================================================= */
exports.createBooking = async (req, res) => {
  try {
    const {
      apartmentId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalRooms,
      contactDetails
    } = req.body;

    const userId = req.user ? req.user.id : req.body.userId;

    /* ================= VALIDATION ================= */
    if (!apartmentId || !checkInDate || !checkOutDate) {
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
        message: "Invalid dates"
      });
    }

    /* ================= FIND APARTMENT ================= */
    const apartment = await Apartment.findById(apartmentId);

    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: "Apartment not found"
      });
    }

    /* ================= DATE CONFLICT ================= */
    const existing = await Booking.find({
      apartmentId,
      bookingStatus: { $ne: "cancelled" },
      $or: [
        { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } }
      ]
    });

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Already booked for selected dates"
      });
    }

    /* ================= PRICE ================= */
    const nights = Math.ceil(
      (checkOut - checkIn) / (1000 * 60 * 60 * 24)
    );

    const pricePerNight = Number(apartment.pricePerNight) || 0;
    const cleaningFee = Number(apartment.cleaningFee) || 0;
    const serviceFee = Number(apartment.serviceFee) || 0;
    const tax = Number(apartment.tax) || 0;
    const discount = Number(apartment.discount) || 0;

    const totalAmount =
      (nights * pricePerNight * (totalRooms || 1)) +
      cleaningFee +
      serviceFee +
      tax -
      discount;

    /* ================= CREATE ================= */
    const booking = new Booking({
      userId,
      apartmentId,
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
      message: "Apartment booking successful",
      booking
    });

  } catch (err) {
    console.log("APARTMENT BOOKING ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


/* =========================================================
   📋 GET ALL BOOKINGS
========================================================= */
exports.getAllBookings = async (req, res) => {
  const data = await Booking.find()
    .populate("apartmentId")
    .populate("userId")
    .sort({ createdAt: -1 });

  res.json({ success: true, data });
};


/* =========================================================
   ❌ CANCEL BOOKING
========================================================= */
exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Not found" });
  }

  if (booking.bookingStatus === "cancelled") {
    return res.json({ message: "Already cancelled" });
  }

  booking.bookingStatus = "cancelled";
  await booking.save();

  res.json({ success: true, message: "Cancelled" });
};