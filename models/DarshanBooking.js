const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  darshanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Darshan",
    required: true,
  },
  userName: String,
  email: String,
  phone: String,
  persons: Number,        
  totalPrice: Number,     
  paymentStatus: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("DarshanBooking", bookingSchema);
