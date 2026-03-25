const mongoose = require("mongoose");

const houseboatBookingSchema = new mongoose.Schema(
{
  /* ================= USER ================= */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  /* ================= HOUSEBOAT ================= */
  houseboatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HouseBoat",
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

  totalGuests: {
    type: Number,
    required: true
  },

  totalRooms: {
    type: Number,
    default: 1
  },

  totalNights: Number,

  /* ================= PRICE ================= */
  pricePerRoom: Number,
  basePrice: Number,
  tax: Number,
  discount: Number,

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
    enum: [
      "pending",
      "confirmed",
      "checked-in",
      "checked-out",
      "cancelled"
    ],
    default: "pending"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("HouseboatBooking", houseboatBookingSchema);