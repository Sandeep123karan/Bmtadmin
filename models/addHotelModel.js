
// const mongoose = require('mongoose');

// const addHotelSchema = new mongoose.Schema({
//   hotelName: String,
//   city: String,
//   propertyType: String,
//   amenities: [String],
//   starRating: Number,
//   status: { type: String, enum: ['active', 'inactive'], default: 'active' },
//   reviewUrl: String,
//   address: String,
//   postalCode: String,
//   country: String,

//   coordinates: {
//     lat: Number,
//     lng: Number
//   },

//   state: String,
//   location: String,

//   trending: Boolean,
//   idProofRequired: Boolean,
//   promotion: Boolean,

//   description: String
// }, { timestamps: true });

// module.exports = mongoose.model('AddHotel', addHotelSchema);






const mongoose = require("mongoose");

/* =====================================================
   ROOM SCHEMA (ADVANCED – 42+ FIELDS)
===================================================== */
const roomSchema = new mongoose.Schema({

  roomType: { type: String, required: true },
  roomName: String,
  description: String,

  basePrice: { type: Number, required: true },
  offerPrice: Number,
  tax: Number,
  serviceCharge: Number,

  totalRooms: { type: Number, required: true },
  availableRooms: { type: Number, required: true },

  maxGuests: Number,
  adults: Number,
  children: Number,

  roomSize: String,
  floorNumber: String,

  bedType: String,
  bedCount: Number,
  extraBedAvailable: Boolean,
  extraBedCharge: Number,

  viewType: String,
  balcony: Boolean,

  airCondition: Boolean,
  heater: Boolean,
  wifi: Boolean,
  tv: Boolean,
  minibar: Boolean,
  wardrobe: Boolean,
  workDesk: Boolean,
  iron: Boolean,
  kitchen: Boolean,

  bathroomType: String,
  bathtub: Boolean,
  shower: Boolean,
  toiletries: Boolean,
  hairDryer: Boolean,

  breakfastIncluded: Boolean,
  lunchIncluded: Boolean,
  dinnerIncluded: Boolean,

  smokingAllowed: Boolean,

  refundable: Boolean,
  cancellationPolicy: String,

  images: [String],

  status: {
    type: String,
    enum: ["available", "soldout"],
    default: "available"
  }

}, { timestamps: true });



/* =====================================================
   HOTEL SCHEMA (53+ FIELDS)
===================================================== */
const hotelSchema = new mongoose.Schema({

  hotelName: { type: String, required: true },
  hotelType: String,
  description: String,
  starRating: Number,
  yearBuilt: Number,

  phone: String,
  alternatePhone: String,
  email: String,
  website: String,

  country: { type: String, default: "India" },
  state: String,
  city: String,
  area: String,
  address: String,
  pincode: String,
  landmark: String,

  // location: {
  //   type: { type: String, default: "Point" },
  //   coordinates: [Number]
  // },
  location: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point"
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    default: [0, 0]
  }
},


  amenities: [String],
  propertyHighlights: [String],
  foodAndDining: [String],
  safetyAndSecurity: [String],
  wellnessAndSpa: [String],
  businessFacilities: [String],
  mediaAndTechnology: [String],
  transportServices: [String],

  rooms: [roomSchema],

  hotelImages: [String],
  roomImages: [String],
  videos: [String],
  virtualTourLink: String,

  checkInTime: String,
  checkOutTime: String,
  earlyCheckInAllowed: Boolean,
  lateCheckOutAllowed: Boolean,
  cancellationPolicy: String,
  childPolicy: String,
  petPolicy: String,
  coupleFriendly: { type: Boolean, default: true },
  localIdAllowed: { type: Boolean, default: true },

  pricePerNight: Number,
  taxPercentage: Number,
  serviceCharge: Number,
  extraBedCharge: Number,
  paymentMethods: [String],
  refundPolicy: String,
  gstNumber: String,

  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },

  vendorId: String,
  vendorName: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  featured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }

}, { timestamps: true });

hotelSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hotel", hotelSchema);
