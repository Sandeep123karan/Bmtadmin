const Booking = require("../models/VacationHouseBooking");
const VacationHouse = require("../models/VacationHouse");

/* ===============================================
   🏡 CREATE BOOKING
=============================================== */
exports.createBooking = async (req, res) => {
  try {
    const {
      vacationHouseId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalRooms,
      guests,
      contactDetails
    } = req.body;

    /* ✅ VALIDATION */
    if (!vacationHouseId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const house = await VacationHouse.findById(vacationHouseId);
    if (!house) return res.status(404).json({ message: "House not found" });

    /* ✅ DATE CALCULATION */
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const totalNights = Math.ceil(
      (checkOut - checkIn) / (1000 * 60 * 60 * 24)
    );

    if (totalNights <= 0) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    /* ✅ PRICE */
    const basePrice =
      (house.price?.basePrice || 2000) * totalRooms * totalNights;

    const discount = (basePrice * 10) / 100;
    const afterDiscount = basePrice - discount;

    const taxes = (afterDiscount * 12) / 100;
    const totalAmount = afterDiscount + taxes;

    /* ✅ SAVE */
    const booking = await Booking.create({
      vacationHouseId,
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
      message: "Booking Created",
      data: booking
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================================
   👤 MY BOOKINGS
=============================================== */
exports.myBookings = async (req, res) => {
  const data = await Booking.find({ userId: req.user.id })
    .populate("vacationHouseId", "propertyName");

  res.json({ success: true, data });
};

/* ===============================================
   🛠 ADMIN ALL BOOKINGS
=============================================== */
exports.getAllBookings = async (req, res) => {
  const data = await Booking.find()
    .populate("vacationHouseId", "propertyName")
    .populate("userId", "name email");

  res.json({ success: true, data });
};

/* ===============================================
   ❌ CANCEL
=============================================== */
exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { bookingStatus: "cancelled" },
    { new: true }
  );

  res.json({ success: true, message: "Cancelled", data: booking });
};