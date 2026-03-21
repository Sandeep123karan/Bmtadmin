const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  /* =========================================================
     🏕️ CAMPSITE INFO
  ========================================================= */
  campsiteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campsite",
    required: true
  },

  /* =========================================================
     👤 USER INFO
  ========================================================= */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  /* =========================================================
     📅 BOOKING DATES
  ========================================================= */
  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date,
    required: true
  },

  totalNights: Number,

  /* =========================================================
     👨‍👩‍👧 GUEST DETAILS
  ========================================================= */
  totalGuests: Number,
  adults: Number,
  children: Number,

  guestDetails: [
    {
      name: String,
      age: Number,
      gender: String
    }
  ],

  /* =========================================================
     🏕️ TENT / ROOM INFO
  ========================================================= */
  totalTents: Number,

  /* =========================================================
     💰 PRICING (MakeMyTrip Style)
  ========================================================= */
  pricePerNight: Number,

  subtotal: Number,        // base price
  discountAmount: Number,  // discount
  taxAmount: Number,       // GST
  serviceFee: Number,      // platform fee
  totalAmount: Number,     // final payable

  /* =========================================================
     🎟️ COUPON
  ========================================================= */
  couponCode: String,
  couponDiscount: Number,

  /* =========================================================
     💳 PAYMENT
  ========================================================= */
  paymentMethod: {
    type: String,
    enum: ["razorpay", "stripe", "cash", "upi"],
    default: "upi"
  },

  paymentId: String,

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending"
  },

  /* =========================================================
     📦 BOOKING STATUS
  ========================================================= */
  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending"
  },

  cancellationReason: String,

  /* =========================================================
     📞 CONTACT INFO
  ========================================================= */
  contactDetails: {
    name: String,
    email: String,
    phone: String
  },

  /* =========================================================
     📝 EXTRA
  ========================================================= */
  specialRequest: String,

  bookingSource: {
    type: String,
    default: "web" // web / app / admin
  }

}, { timestamps: true });

/* ✅ FIX overwrite error */
module.exports =
  mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);