const Booking = require("../models/guestHouseBookingModel");
const GuestHouse = require("../models/guestHouseModel");

/* ================= CREATE BOOKING ================= */
exports.createBooking = async (req, res) => {
  try {
    const {
      guestHouseId,
      roomTypeId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalRooms,
      contactDetails
    } = req.body;

    const userId = req.user ? req.user.id : req.body.userId;

    /* VALIDATION */
    if (!guestHouseId || !roomTypeId || !checkInDate || !checkOutDate) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      return res.status(400).json({
        message: "Invalid dates"
      });
    }

    /* FIND GUEST HOUSE */
    const guestHouse = await GuestHouse.findById(guestHouseId);

    if (!guestHouse) {
      return res.status(404).json({
        message: "GuestHouse not found"
      });
    }

    /* FIND ROOM */
    const room = guestHouse.roomDetails.id(roomTypeId);

    if (!room) {
      return res.status(404).json({
        message: "Room type not found"
      });
    }

    /* AVAILABILITY */
    if (room.availableRoom < (totalRooms || 1)) {
      return res.status(400).json({
        message: "Rooms not available"
      });
    }

    /* DATE CONFLICT */
    const existing = await Booking.find({
      guestHouseId,
      bookingStatus: { $ne: "cancelled" },
      $or: [
        { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } }
      ]
    });

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Already booked for selected dates"
      });
    }

    /* PRICE */
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const pricePerRoom = room.price || 0;

    const basePrice = nights * pricePerRoom * (totalRooms || 1);
    const tax = (guestHouse.tax || 0);
    const totalAmount = basePrice + tax;

    /* CREATE */
    const booking = new Booking({
      userId,
      guestHouseId,
      roomTypeId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalRooms,
      totalNights: nights,
      pricePerRoom,
      basePrice,
      tax,
      totalAmount,
      contactDetails
    });

    await booking.save();

    /* UPDATE ROOM */
    room.availableRoom -= (totalRooms || 1);
    await guestHouse.save();

    res.status(201).json({
      success: true,
      message: "Booking successful",
      booking
    });

  } catch (err) {
    console.log("BOOKING ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


/* ================= GET ALL ================= */
exports.getAllBookings = async (req, res) => {
  const data = await Booking.find()
    .populate("guestHouseId")
    .populate("userId");

  res.json({ success: true, data });
};


/* ================= CANCEL ================= */
exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) return res.status(404).json({ message: "Not found" });

  booking.bookingStatus = "cancelled";
  await booking.save();

  res.json({ success: true, message: "Cancelled" });
};