const HostelBooking = require("../models/hostelBookingModel");
const Hostel = require("../models/hostelmodel"); // ✅ IMPORTANT



/* =========================================================
   🏨 CREATE BOOKING
========================================================= */
exports.createBooking = async (req, res) => {
  try {
    const {
      hostelId,
      roomTypeId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalBeds,
      bookingType,
      contactDetails
    } = req.body;

    const userId = req.user?.id || req.body.userId;

    /* ================= VALIDATION ================= */
    if (!hostelId || !roomTypeId || !checkInDate || !bookingType) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    /* ================= FIND HOSTEL ================= */
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found"
      });
    }

    /* ================= FIND ROOM ================= */
    const room = hostel.roomTypes.id(roomTypeId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room type not found"
      });
    }

    /* ================= AVAILABILITY CHECK ================= */
    if (room.availableRooms <= 0) {
      return res.status(400).json({
        success: false,
        message: "No rooms available"
      });
    }

    /* ================= PRICE CALCULATION ================= */
    let totalAmount = 0;

    if (bookingType === "daily") {
      if (!checkOutDate) {
        return res.status(400).json({
          success: false,
          message: "Check-out date required for daily booking"
        });
      }

      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);

      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      totalAmount = days * (room.pricePerDay || 0);
    }

    if (bookingType === "monthly") {
      totalAmount = room.pricePerMonth || 0;
    }

    /* ================= CREATE BOOKING ================= */
    const booking = new HostelBooking({
      userId,
      hostelId,
      roomTypeId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalBeds,
      bookingType,
      pricePerDay: room.pricePerDay,
      pricePerMonth: room.pricePerMonth,
      totalAmount,
      contactDetails
    });

    await booking.save();

    /* ================= REDUCE ROOM ================= */
    room.availableRooms -= 1;
    await hostel.save();

    res.status(201).json({
      success: true,
      message: "Booking successful",
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
    const bookings = await HostelBooking.find()
      .populate("hostelId")
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
    const userId = req.user.id;

    const bookings = await HostelBooking.find({ userId })
      .populate("hostelId")
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
    const booking = await HostelBooking.findById(req.params.id)
      .populate("hostelId")
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
    const booking = await HostelBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    /* ================= UPDATE STATUS ================= */
    booking.bookingStatus = "cancelled";
    await booking.save();

    /* ================= RESTORE ROOM ================= */
    const hostel = await Hostel.findById(booking.hostelId);
    const room = hostel.roomTypes.id(booking.roomTypeId);

    if (room) {
      room.availableRooms += 1;
      await hostel.save();
    }

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
   🔄 UPDATE BOOKING STATUS (ADMIN)
========================================================= */
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await HostelBooking.findByIdAndUpdate(
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