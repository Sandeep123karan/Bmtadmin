// const CarBooking = require('../models/carBookingModel');

// exports.getAllBookings = async (req, res) => {
//   try {
//     const bookings = await CarBooking.find().sort({ createdAt: -1 });
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching bookings', error: err.message });
//   }
// };

// exports.createBooking = async (req, res) => {
//   try {
//     const newBooking = new CarBooking(req.body);
//     await newBooking.save();
//     res.status(201).json(newBooking);
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating booking', error: err.message });
//   }
// };

// exports.deleteBooking = async (req, res) => {
//   try {
//     await CarBooking.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Booking deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting booking', error: err.message });
//   }
// };


const CarBooking = require('../models/carBookingModel');

// GET ALL / FILTER BOOKINGS
exports.getAllBookings = async (req, res) => {
  try {
    const { businessType, key, value, fromDate, toDate } = req.query;

    let filter = {};

    if (businessType) filter.bookingType = businessType;
    if (key && value) filter[key] = { $regex: value, $options: 'i' };

    if (fromDate || toDate) {
      filter.journeyDate = {};
      if (fromDate) filter.journeyDate.$gte = new Date(fromDate);
      if (toDate) filter.journeyDate.$lte = new Date(toDate);
    }

    const bookings = await CarBooking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);

  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
};

// GET SINGLE BOOKING
exports.getBookingById = async (req, res) => {
  try {
    const booking = await CarBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Error fetching booking", error: err.message });
  }
};

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const newBooking = new CarBooking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: "Error creating booking", error: err.message });
  }
};

// UPDATE BOOKING
exports.updateBooking = async (req, res) => {
  try {
    const updated = await CarBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Booking not found" });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: "Error updating booking", error: err.message });
  }
};

// DELETE BOOKING
exports.deleteBooking = async (req, res) => {
  try {
    await CarBooking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting booking", error: err.message });
  }
};
