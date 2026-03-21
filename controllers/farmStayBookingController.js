const Booking = require("../models/farmStayBookingModel");
const FarmStay = require("../models/farmStayModel");

/* =========================================================
   🏡 CREATE BOOKING
========================================================= */
exports.createBooking = async (req, res) => {
  try {
    const {
      farmStayId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalRooms,
      guests,
      contactDetails
    } = req.body;

    /* ✅ VALIDATION */
    if (!farmStayId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const farm = await FarmStay.findById(farmStayId);
    if (!farm) return res.status(404).json({ message: "FarmStay not found" });

    /* ✅ DATE CALCULATION */
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const totalNights = Math.ceil(
      (checkOut - checkIn) / (1000 * 60 * 60 * 24)
    );

    if (totalNights <= 0) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    /* ✅ PRICE CALCULATION */
    const basePrice =
      (farm.price?.perNight || 2000) * totalRooms * totalNights;

    const discount = (basePrice * (farm.discount || 0)) / 100;

    const afterDiscount = basePrice - discount;

    const taxes = (afterDiscount * (farm.taxPercent || 12)) / 100;

    const totalAmount = afterDiscount + taxes;

    /* ✅ SAVE */
    const booking = await Booking.create({
      farmStayId,
      userId: req.user.id,
      checkInDate,
      checkOutDate,
      totalNights,
      totalGuests,
      totalRooms,
      guests,
      contactDetails,
      priceBreakup: {
        basePrice,
        discount,
        taxes,
        totalAmount
      }
    });

    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      data: booking
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   👤 MY BOOKINGS
========================================================= */
exports.myBookings = async (req, res) => {
  const data = await Booking.find({ userId: req.user.id })
    .populate("farmStayId", "farmName price");

  res.json({ success: true, data });
};

/* =========================================================
   🛠 ADMIN ALL BOOKINGS
========================================================= */
exports.getAllBookings = async (req, res) => {
  const data = await Booking.find()
    .populate("farmStayId", "farmName")
    .populate("userId", "name email");

  res.json({ success: true, data });
};

/* =========================================================
   ❌ CANCEL BOOKING
========================================================= */
exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { bookingStatus: "cancelled" },
    { new: true }
  );

  res.json({ success: true, message: "Booking Cancelled", data: booking });
};