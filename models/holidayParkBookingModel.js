const mongoose = require("mongoose");

const holidayParkBookingSchema = new mongoose.Schema(
{
  /* =====================================================
     👤 USER INFO
  ===================================================== */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  /* =====================================================
     🏕️ PROPERTY INFO
  ===================================================== */
  parkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HolidayPark",
    required: true
  },

  propertyName: String,

  /* =====================================================
     📅 BOOKING DETAILS
  ===================================================== */
  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date,
    required: true
  },

  totalNights: Number,

  /* =====================================================
     👥 GUEST DETAILS
  ===================================================== */
  guests: [
    {
      name: String,
      age: Number,
      gender: String
    }
  ],

  totalGuests: Number,

  /* =====================================================
     🏠 ROOM / COTTAGE
  ===================================================== */
  roomType: {
    name: String,
    price: Number
  },

  totalRooms: Number,

  /* =====================================================
     💰 PRICE BREAKUP (MMT STYLE)
  ===================================================== */
  priceBreakup: {
    basePrice: Number,
    taxes: Number,
    discount: Number,
    totalAmount: Number
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  },

  paymentId: String,

  /* =====================================================
     📞 CONTACT DETAILS
  ===================================================== */
  contactDetails: {
    name: String,
    phone: String,
    email: String
  }

},
{ timestamps: true }
);

/* overwrite fix */
module.exports =
  mongoose.models.HolidayParkBooking ||
  mongoose.model("HolidayParkBooking", holidayParkBookingSchema);