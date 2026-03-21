const mongoose = require("mongoose");

const vacationHouseBookingSchema = new mongoose.Schema(
{
  vacationHouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VacationHouse",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date,
    required: true
  },

  totalNights: Number,

  totalGuests: Number,
  totalRooms: Number,

  /* 👨‍👩‍👧 Guests */
  guests: [
    {
      name: String,
      age: Number,
      gender: String
    }
  ],

  /* 📞 Contact */
  contactDetails: {
    name: String,
    phone: String,
    email: String
  },

  /* 💰 PRICE */
  priceBreakup: {
    basePrice: Number,
    discount: Number,
    taxes: Number,
    totalAmount: Number
  },

  bookingStatus: {
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

module.exports =
  mongoose.models.VacationHouseBooking ||
  mongoose.model("VacationHouseBooking", vacationHouseBookingSchema);