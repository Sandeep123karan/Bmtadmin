const mongoose = require("mongoose");

const bedBreakfastSchema = new mongoose.Schema({

  /* ================= BASIC PROPERTY INFO ================= */
  propertyId: { type: String, unique: true },
  propertyName: { type: String, required: true },
  propertyType: { type: String, default: "Bed & Breakfast" },
  description: String,

  /* ================= OWNER DETAILS ================= */
  ownerName: { type: String, required: true },
  companyName: String,
  email: { type: String, required: true },
  phone: { type: String, required: true },
  alternatePhone: String,
  password: { type: String, required: true },

  /* ================= LOCATION ================= */
  address: String,
  city: String,
  state: String,
  country: { type: String, default: "India" },
  pincode: String,
  latitude: Number,
  longitude: Number,

  /* ================= ROOM DETAILS ================= */
  totalRooms: Number,
  availableRooms: Number,
  roomTypes: [
    {
      roomName: String,
      price: Number,
      capacity: Number,
      bedType: String,
      amenities: [String],
      roomImages: [String]
    }
  ],

  /* ================= AMENITIES ================= */
  amenities: [String],

  /* ================= CHECK-IN ================= */
  checkInTime: String,
  checkOutTime: String,

  /* ================= PRICE ================= */
  pricePerNight: Number,
  weekendPrice: Number,

  /* ================= PROPERTY IMAGES ================= */
  propertyImages: [String],
  frontImage: [String],
  receptionImage: [String],

  /* ================= DOCUMENTS WITH MULTIPLE IMAGES ================= */
  documents: {
    ownerPhoto: [String],

    aadharCard: {
      front: [String],
      back: [String]
    },

    panCard: [String],
    gstCertificate: [String],
    propertyProof: [String],

    bankProof: {
      passbook: [String],
      cancelledCheque: [String]
    },

    license: [String],
    otherDocuments: [String]
  },

  /* ================= BANK DETAILS ================= */
  bankDetails: {
    accountHolderName: String,
    bankName: String,
    accountNumber: String,
    ifscCode: String,
    upiId: String
  },

  /* ================= FACILITIES ================= */
  mealsAvailable: {
    breakfast: { type: Boolean, default: true },
    lunch: Boolean,
    dinner: Boolean
  },

  parkingAvailable: Boolean,
  coupleFriendly: Boolean,
  petAllowed: Boolean,

  /* ================= RATING ================= */
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },

  /* ================= ADMIN CONTROL ================= */
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  isActive: { type: Boolean, default: true },

}, { timestamps: true });

module.exports = mongoose.model("BedBreakfast", bedBreakfastSchema);