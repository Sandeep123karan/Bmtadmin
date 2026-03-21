const LoveHotelBooking = require("../models/loveHotelBookingModel");
const LoveHotel = require("../models/lovehotelModel");

/* ================= CREATE BOOKING ================= */
exports.createBooking = async (req, res) => {
  try {
    const {
      hotelId,
      roomId,
      bookingType,
      checkIn,
      checkOut,
      guests,
    } = req.body;

    const hotel = await LoveHotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const room = hotel.rooms.find(r => r.roomId === roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    let totalAmount = 0;
    let totalHours = 0;
    let totalNights = 0;

    if (bookingType === "hourly") {
      totalHours = Math.ceil(
        (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60)
      );

      totalAmount = totalHours * room.pricePerHour;
    } else {
      totalNights = Math.ceil(
        (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
      );

      totalAmount = totalNights * room.pricePerNight;
    }

    const taxes = totalAmount * 0.12; // 12% GST
    const finalAmount = totalAmount + taxes;

    const booking = new LoveHotelBooking({
      user: req.user.id,
      hotel: hotelId,
      roomId,
      bookingType,
      checkIn,
      checkOut,
      totalHours,
      totalNights,
      guests,
      price: totalAmount,
      taxes,
      totalAmount: finalAmount,
      bookingId: "BOOK" + Date.now(),
    });

    await booking.save();

    // decrease available rooms
    room.availableRooms -= 1;
    await hotel.save();

    res.status(201).json({
      success: true,
      message: "Booking successful",
      data: booking,
    });

  } catch (error) {
    console.error("BOOKING ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/* ================= USER BOOKINGS ================= */
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await LoveHotelBooking.find({
      user: req.user.id,
    }).populate("hotel");

    res.json({
      success: true,
      total: bookings.length,
      data: bookings,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= CANCEL ================= */
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await LoveHotelBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= ADMIN ================= */
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await LoveHotelBooking.find()
      .populate("hotel")
      .populate("user");

    res.json({
      success: true,
      total: bookings.length,
      data: bookings,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};