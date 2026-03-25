const mongoose = require("mongoose");

const hostelBookingSchema = new mongoose.Schema(
{
  /* ================= USER INFO ================= */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  /* ================= HOSTEL INFO ================= */
  hostelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel",
    required: true
  },

  roomTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true // from roomTypes array (_id)
  },

  /* ================= BOOKING DETAILS ================= */
  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date
  },

  totalGuests: {
    type: Number,
    required: true
  },

  totalBeds: {
    type: Number,
    default: 1
  },

  bookingType: {
    type: String,
    enum: ["monthly", "daily"],
    required: true
  },

  /* ================= PRICE ================= */
  pricePerDay: Number,
  pricePerMonth: Number,

  totalAmount: {
    type: Number,
    required: true
  },

  /* ================= USER CONTACT ================= */
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

  /* ================= BOOKING STATUS ================= */
  bookingStatus: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "checked-in",
      "checked-out",
      "cancelled"
    ],
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

module.exports = mongoose.model("HostelBooking", hostelBookingSchema);