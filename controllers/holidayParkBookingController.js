const HolidayParkBooking = require("../models/holidayParkBookingModel");
const HolidayPark = require("../models/HolidayPark");
const mongoose = require("mongoose");

/* =====================================================
   ➕ CREATE BOOKING
===================================================== */
exports.createBooking = async (req, res) => {
  try {
    const {
      parkId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalRooms,
      contactDetails,
      guests
    } = req.body;

    /* ✅ ID VALIDATION */
    if (!mongoose.Types.ObjectId.isValid(parkId)) {
      return res.status(400).json({ message: "Invalid park ID" });
    }

    const park = await HolidayPark.findById(parkId);
    if (!park) return res.status(404).json({ message: "Park not found" });

    /* ✅ DATE CALC */
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const totalNights = Math.ceil(
      (checkOut - checkIn) / (1000 * 60 * 60 * 24)
    );

    if (totalNights <= 0) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    /* ✅ PRICE CALC */
    const basePrice = park.pricePerNight * totalRooms * totalNights;
    const discount = (basePrice * (park.discount || 0)) / 100;
    const taxedAmount = basePrice - discount;
    const taxes = (taxedAmount * 12) / 100; // 12% GST
    const totalAmount = taxedAmount + taxes;

    /* ✅ CREATE */
    const booking = await HolidayParkBooking.create({
      userId: req.user.id,
      parkId,
      propertyName: park.parkName,

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
      message: "Booking Created",
      data: booking
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* =====================================================
   📋 USER BOOKINGS
===================================================== */
exports.getMyBookings = async (req, res) => {
  const data = await HolidayParkBooking.find({ userId: req.user.id })
    .populate("parkId");

  res.json({ success: true, data });
};


/* =====================================================
   📋 ADMIN ALL BOOKINGS
===================================================== */
exports.getAllBookings = async (req, res) => {
  const data = await HolidayParkBooking.find()
    .populate("userId")
    .populate("parkId");

  res.json({ success: true, data });
};


/* =====================================================
   ❌ CANCEL BOOKING
===================================================== */
exports.cancelBooking = async (req, res) => {
  const booking = await HolidayParkBooking.findById(req.params.id);

  if (!booking) return res.status(404).json({ message: "Not found" });

  booking.bookingStatus = "cancelled";
  await booking.save();

  res.json({ success: true, message: "Cancelled" });
};