const mongoose = require("mongoose");

const guestHouseBookingSchema = new mongoose.Schema(
{
  /* ================= USER ================= */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  /* ================= GUEST HOUSE ================= */
  guestHouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GuestHouse",
    required: true
  },

  roomTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  /* ================= BOOKING ================= */
  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date,
    required: true
  },

  totalGuests: Number,
  totalRooms: {
    type: Number,
    default: 1
  },

  totalNights: Number,

  /* ================= PRICE ================= */
  pricePerRoom: Number,
  basePrice: Number,
  tax: Number,
  totalAmount: Number,

  /* ================= CONTACT ================= */
  contactDetails: {
    name: String,
    phone: String,
    email: String
  },

  /* ================= STATUS ================= */
  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("GuestHouseBooking", guestHouseBookingSchema);