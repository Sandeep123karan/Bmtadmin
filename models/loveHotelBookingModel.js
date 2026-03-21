const mongoose = require("mongoose");

const loveHotelBookingSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoveHotel",
    required: true,
  },

  roomId: String,

  bookingType: {
    type: String,
    enum: ["hourly", "night"],
    default: "night",
  },

  checkIn: Date,
  checkOut: Date,

  totalHours: Number,
  totalNights: Number,

  guests: Number,

  price: Number,
  taxes: Number,
  totalAmount: Number,

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },

  bookingStatus: {
    type: String,
    enum: ["confirmed", "cancelled", "completed"],
    default: "confirmed",
  },

  bookingId: {
    type: String,
    unique: true,
  },

  specialRequest: String,

},
{ timestamps: true }
);

module.exports = mongoose.model("LoveHotelBooking", loveHotelBookingSchema);