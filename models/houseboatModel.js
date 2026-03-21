const mongoose = require("mongoose");

const houseboatSchema = new mongoose.Schema({

  /* ================= BASIC INFO ================= */
  propertyId: {
    type: String,
    required: true,
    unique: true // HB1001
  },
  propertyName: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    default: "HouseBoat"
  },
  starRating: { type: Number, default: 0 },
  description: String,

  /* ================= OWNER / VENDOR INFO ================= */
  ownerName: { type: String, required: true },
  vendorName: String,
  email: String,
  phone: { type: String, required: true },
  alternatePhone: String,

  /* ================= OWNER KYC ================= */
  ownerPhoto: String, // owner profile image
  ownerAadharFront: String,
  ownerAadharBack: String,
  ownerPanCard: String,
  ownerSelfieWithDoc: String,

  gstNumber: String,
  panNumber: String,

  /* ================= LOCATION ================= */
  country: { type: String, default: "India" },
  state: String,
  city: String,
  area: String,
  address: String,
  pincode: String,
  latitude: String,
  longitude: String,
  landmark: String,

  /* ================= HOUSEBOAT DETAILS ================= */
  boatSize: String, // small / luxury
  totalRooms: Number,
  totalDecks: Number,
  buildYear: String,
  maxGuests: Number,

  roomTypes: [
    {
      roomName: String, // deluxe
      price: Number,
      capacity: Number,
      availableRooms: Number,
      roomImages: [String]
    }
  ],

  /* ================= AMENITIES ================= */
  amenities: [String],
  facilities: [String],

  /* ================= MEALS ================= */
  mealPlan: {
    breakfast: { type: Boolean, default: false },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
    welcomeDrink: { type: Boolean, default: false }
  },

  /* ================= PRICE ================= */
  basePrice: Number,
  discountPrice: Number,
  taxPercentage: Number,
  extraGuestPrice: Number,

  /* ================= CHECK ================= */
  checkInTime: String,
  checkOutTime: String,

  /* ================= HOUSEBOAT MEDIA ================= */
  coverImage: String,

  houseboatImages: [String], // full gallery
  interiorImages: [String],
  exteriorImages: [String],

  houseboatVideos: [String], // video url or upload

  /* ================= DOCUMENTS ================= */
  registrationDoc: String,
  insuranceDoc: String,
  licenseDoc: String,

  /* ================= POLICIES ================= */
  houseRules: String,
  cancellationPolicy: String,
  childPolicy: String,
  petPolicy: String,
  alcoholPolicy: String,

  /* ================= BOOKING SETTINGS ================= */
  instantBooking: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isTopRated: { type: Boolean, default: false },

  /* ================= ADMIN CONTROL ================= */
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  rejectReason: String,

  isActive: { type: Boolean, default: true },
  addedBy: {
    type: String,
    enum: ["admin", "vendor"],
    default: "vendor"
  },

  /* ================= RATING ================= */
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  totalBookings: { type: Number, default: 0 },

  /* ================= DATE ================= */
  createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model("HouseBoat", houseboatSchema);