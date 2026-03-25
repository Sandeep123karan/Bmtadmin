const Booking = require("../models/houseboatBookingModel");
const HouseBoat = require("../models/houseboatModel");

/* =========================================================
   🚤 CREATE BOOKING
========================================================= */
exports.createBooking = async (req, res) => {
  try {
    const {
      houseboatId,
      roomTypeId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalRooms,
      contactDetails
    } = req.body;

    const userId = req.user ? req.user.id : req.body.userId;

    /* ================= VALIDATION ================= */
    if (!houseboatId || !roomTypeId || !checkInDate || !checkOutDate) {
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

    /* ================= FIND HOUSEBOAT ================= */
    const houseboat = await HouseBoat.findById(houseboatId);

    if (!houseboat) {
      return res.status(404).json({
        success: false,
        message: "Houseboat not found"
      });
    }

    /* ================= FIND ROOM ================= */
    const room = houseboat.roomTypes.id(roomTypeId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room type not found"
      });
    }

    /* ================= AVAILABILITY ================= */
    if (room.availableRooms < (totalRooms || 1)) {
      return res.status(400).json({
        success: false,
        message: "Not enough rooms available"
      });
    }

    /* ================= DATE CONFLICT ================= */
    const existing = await Booking.find({
      houseboatId,
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

    const pricePerRoom = room.price || 0;
    const basePrice = nights * pricePerRoom * (totalRooms || 1);

    const tax = (houseboat.taxPercentage || 0) / 100 * basePrice;
    const discount = houseboat.discountPrice || 0;

    const totalAmount = basePrice + tax - discount;

    /* ================= CREATE ================= */
    const booking = new Booking({
      userId,
      houseboatId,
      roomTypeId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalRooms,
      totalNights: nights,
      pricePerRoom,
      basePrice,
      tax,
      discount,
      totalAmount,
      contactDetails
    });

    await booking.save();

    /* ================= UPDATE ROOM ================= */
    room.availableRooms -= (totalRooms || 1);
    await houseboat.save();

    res.status(201).json({
      success: true,
      message: "Houseboat booking successful",
      booking
    });

  } catch (err) {
    console.log("HOUSEBOAT BOOKING ERROR:", err);
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
    .populate("houseboatId")
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

  /* RESTORE ROOMS */
  const houseboat = await HouseBoat.findById(booking.houseboatId);
  const room = houseboat.roomTypes.id(booking.roomTypeId);

  if (room) {
    room.availableRooms += booking.totalRooms || 1;
    await houseboat.save();
  }

  res.json({ success: true, message: "Cancelled" });
};