
// const HotelBooking = require("../models/hotelBookingModel");

// // GET all bookings (with filters)
// exports.getHotelBookings = async (req, res) => {
//   try {
//     const filters = {};

//     if (req.query.value && req.query.key) {
//       filters[req.query.key] = { $regex: req.query.value, $options: "i" };
//     }

//     if (req.query.fromDate && req.query.toDate) {
//       filters.createdAt = {
//         $gte: new Date(req.query.fromDate),
//         $lte: new Date(req.query.toDate),
//       };
//     }

//     const bookings = await HotelBooking.find(filters).sort({ createdAt: -1 });
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // CREATE booking
// exports.addHotelBooking = async (req, res) => {
//   try {
//     const booking = await HotelBooking.create(req.body);
//     res.status(201).json(booking);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE booking
// exports.updateHotelBooking = async (req, res) => {
//   try {
//     const updated = await HotelBooking.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE booking
// exports.deleteHotelBooking = async (req, res) => {
//   try {
//     await HotelBooking.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted Successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };






const HotelBooking = require("../models/HotelBookingModel");

/* ================= CREATE ================= */
exports.createBooking = async (req, res) => {
  try {
    const data = req.body;

    // gallery minimum check
    if (!data.gallery || data.gallery.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Minimum 3 gallery images required",
      });
    }

    const booking = await HotelBooking.create(data);

    res.status(201).json({
      success: true,
      message: "Hotel booking created",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL ================= */
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET SINGLE ================= */
exports.getSingleBooking = async (req, res) => {
  try {
    const booking = await HotelBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE ================= */
exports.updateBooking = async (req, res) => {
  try {
    const booking = await HotelBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Booking updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ================= */
exports.deleteBooking = async (req, res) => {
  try {
    await HotelBooking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Booking deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
