const ResortBooking = require("../models/resortBookingModel");
const Resort = require("../models/Resort");

/* ================= CREATE BOOKING ================= */
exports.createBooking = async (req, res) => {
  try {
    const {
      resortId,
      roomId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalRooms,
      contactDetails,
    } = req.body;

    /* Resort find */
    const resort = await Resort.findById(resortId);
    if (!resort) {
      return res.status(404).json({ message: "Resort not found" });
    }

    /* Room find */
    const room = resort.rooms.id(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    /* Date calculation */
    const nights =
      (new Date(checkOutDate) - new Date(checkInDate)) /
      (1000 * 60 * 60 * 24);

    /* Availability check */
    if (room.availableRooms < totalRooms) {
      return res.status(400).json({
        success: false,
        message: "Rooms not available",
      });
    }

    /* Price calculation */
    const totalAmount = room.price * nights * totalRooms;
    const tax = (totalAmount * (resort.taxPercent || 0)) / 100;
    const finalAmount = totalAmount + tax;

    /* Booking ID */
    const last = await ResortBooking.findOne().sort({ createdAt: -1 });
    let newId = "RB1001";

    if (last && last.bookingId) {
      const num = parseInt(last.bookingId.replace("RB", ""));
      newId = "RB" + (num + 1);
    }

    /* Create booking */
    const booking = new ResortBooking({
      bookingId: newId,
      resortId,
      userId: req.user?.id || null,

      roomId,
      roomName: room.roomName,
      roomType: room.roomType,

      checkInDate,
      checkOutDate,
      totalNights: nights,

      totalGuests,
      totalRooms,

      pricePerNight: room.price,
      totalAmount,
      taxAmount: tax,
      finalAmount,

      contactDetails,
      bookingStatus: "confirmed",
      paymentStatus: "pending",
    });

    await booking.save();

    /* Update availability */
    room.availableRooms -= totalRooms;
    await resort.save();

    res.json({
      success: true,
      message: "Booking successful",
      booking,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL BOOKINGS ================= */
exports.getAllBookings = async (req, res) => {
  try {
    const data = await ResortBooking.find()
      .populate("resortId")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET SINGLE ================= */
exports.getSingleBooking = async (req, res) => {
  try {
    const booking = await ResortBooking.findById(req.params.id)
      .populate("resortId");

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CANCEL ================= */
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await ResortBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.bookingStatus = "cancelled";
    booking.cancelledAt = new Date();
    booking.cancelReason = req.body.reason;

    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled",
      booking,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};