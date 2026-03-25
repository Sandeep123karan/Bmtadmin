const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    /* ================= BASIC ================= */
    bookingId: { type: String, unique: true },

    resortId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resort",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    /* ================= ROOM ================= */
    roomId: String, // roomSchema ka id
    roomName: String,
    roomType: String,

    /* ================= DATES ================= */
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },

    totalNights: Number,

    /* ================= GUEST ================= */
    totalRooms: Number,
    totalGuests: Number,
    adults: Number,
    children: Number,

    /* ================= PRICE ================= */
    pricePerNight: Number,
    totalAmount: Number,
    taxAmount: Number,
    finalAmount: Number,

    /* ================= CONTACT ================= */
    contactDetails: {
      name: String,
      phone: String,
      email: String,
    },

    /* ================= PAYMENT ================= */
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentMethod: String,
    transactionId: String,

    /* ================= STATUS ================= */
    bookingStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled",
        "completed",
      ],
      default: "pending",
    },

    cancelledAt: Date,
    cancelReason: String,

    /* ================= EXTRA ================= */
    specialRequest: String,

  },
  { timestamps: true }
);

module.exports = mongoose.model("ResortBooking", bookingSchema);