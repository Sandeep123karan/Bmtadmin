const mongoose = require("mongoose");

const motelBookingSchema = new mongoose.Schema(
{
  /* ================= BASIC ================= */
  motelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Motel",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  roomType: String,

  /* ================= DATE ================= */
  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date,
    required: true
  },

  totalNights: Number,

  /* ================= GUEST ================= */
  totalGuests: Number,
  totalRooms: Number,

  /* ================= CONTACT ================= */
  contactDetails: {
    name: String,
    phone: String,
    email: String
  },

  /* ================= PRICE ================= */
  priceBreakup: {
    basePrice: Number,
    discount: Number,
    taxes: Number,
    totalAmount: Number
  },

  /* ================= STATUS ================= */
  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("MotelBooking", motelBookingSchema);