const mongoose = require("mongoose");

const apartmentBookingSchema = new mongoose.Schema(
{
  /* ================= USER ================= */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  /* ================= APARTMENT ================= */
  apartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
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
  pricePerNight: Number,
  cleaningFee: Number,
  serviceFee: Number,
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

module.exports = mongoose.model("ApartmentBooking", apartmentBookingSchema);