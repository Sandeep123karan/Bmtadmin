// const mongoose = require('mongoose');

// const carBookingSchema = new mongoose.Schema({
//   refNo: String,
//   source: String,
//   inventoryBy: String,
//   car: String,
//   origin: String,
//   destination: String,
//   travelType: String,
//   journeyDate: Date,
//   price: Number,
//   bookingStatus: String,
//   paymentStatus: String,
//   bookingType: String,
//   currency: String,
//   currencyRate: Number,
//   assigned: String
// }, { timestamps: true });

// module.exports = mongoose.model('CarBooking', carBookingSchema);


const mongoose = require('mongoose');

const carBookingSchema = new mongoose.Schema({
  refNo: String,
  source: String,
  inventoryBy: String,
  car: String,
  origin: String,
  destination: String,
  travelType: String,
  journeyDate: Date,
  price: Number,
  bookingStatus: String,
  paymentStatus: String,
  bookingType: String,
  currency: String,
  currencyRate: Number,
  assigned: String
}, { timestamps: true });

module.exports = mongoose.model('CarBooking', carBookingSchema);
