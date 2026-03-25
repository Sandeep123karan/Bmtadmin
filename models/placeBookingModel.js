const mongoose = require("mongoose");

const placeBookingSchema = new mongoose.Schema(
{
  /* ================= USER ================= */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  /* ================= PLACE ================= */
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    required: true
  },

  /* ================= BOOKING INFO ================= */
  bookingDate: {
    type: Date,
    default: Date.now
  },

  visitDate: {
    type: Date,
    required: true
  },

  totalGuests: {
    type: Number,
    required: true
  },

  /* ================= TICKET / PRICE ================= */
  pricePerPerson: {
    type: Number,
    required: true
  },

  totalAmount: {
    type: Number,
    required: true
  },

  /* ================= CONTACT ================= */
  contactDetails: {
    name: String,
    phone: String,
    email: String
  },

  /* ================= PAYMENT ================= */
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  paymentMethod: {
    type: String,
    enum: ["cash", "online", "upi", "card"]
  },

  transactionId: String,

  /* ================= STATUS ================= */
  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending"
  },

  /* ================= EXTRA ================= */
  specialRequest: String,

  isActive: {
    type: Boolean,
    default: true
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("PlaceBooking", placeBookingSchema);