const mongoose = require("mongoose");

const loungeBookingSchema = new mongoose.Schema(
{
  /* ================= RELATION ================= */
  loungeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lounge",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  /* ================= BOOKING DETAILS ================= */
  bookingDate: {
    type: Date,
    required: true
  },

  visitDate: {
    type: Date,
    required: true
  },

  totalGuests: {
    type: Number,
    required: true
  },

  totalAmount: Number,

  /* ================= CONTACT ================= */
  contactDetails: {
    name: String,
    phone: String,
    email: String
  },

  /* ================= STATUS ================= */
  status: {
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

module.exports = mongoose.model("LoungeBooking", loungeBookingSchema);