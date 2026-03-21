const mongoose = require("mongoose");

const farmStayBookingSchema = new mongoose.Schema(
{
  farmStayId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FarmStay",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  /* 📅 DATES */
  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date,
    required: true
  },

  totalNights: {
    type: Number,
    required: true
  },

  /* 👥 GUESTS */
  totalGuests: Number,
  totalRooms: Number,

  guests: [
    {
      name: String,
      age: Number,
      gender: String
    }
  ],

  /* 📞 CONTACT */
  contactDetails: {
    name: String,
    phone: String,
    email: String
  },

  /* 💰 PRICE BREAKUP */
  priceBreakup: {
    basePrice: Number,
    discount: Number,
    taxes: Number,
    totalAmount: Number
  },

  /* 💳 PAYMENT */
  paymentMethod: {
    type: String,
    enum: ["online", "pay_at_hotel"],
    default: "pay_at_hotel"
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  /* 📌 STATUS */
  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }

},
{ timestamps: true }
);

module.exports =
  mongoose.models.FarmStayBooking ||
  mongoose.model("FarmStayBooking", farmStayBookingSchema);