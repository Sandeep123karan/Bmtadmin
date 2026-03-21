const mongoose = require("mongoose");

const vacationHouseSchema = new mongoose.Schema(
{
  /* =====================================================
     BASIC INFORMATION
  ===================================================== */
  propertyName: {
    type: String,
    required: true,
    trim: true
  },

  propertyId: {
    type: String,
    unique: true
  },

  description: String,
  shortDescription: String,

  propertyType: {
    type: String,
    default: "Vacation House"
  },

  starRating: {
    type: Number,
    default: 0
  },

  /* =====================================================
     LOCATION
  ===================================================== */
  address: {
    street: String,
    area: String,
    landmark: String,
    city: String,
    state: String,
    country: { type: String, default: "India" },
    pincode: String
  },

  geoLocation: {
    latitude: String,
    longitude: String
  },

  /* =====================================================
     CONTACT DETAILS
  ===================================================== */
  contactDetails: {
    ownerName: String,
    phone: String,
    alternatePhone: String,
    email: String
  },

  /* =====================================================
     🖼 PROPERTY IMAGES (FRONTEND SHOW)
  ===================================================== */
  images: {
    thumbnail: String,          // main image
    frontView: [String],
    livingRoom: [String],
    bedRoom: [String],
    kitchen: [String],
    washroom: [String],
    balcony: [String],
    amenities: [String],
    surroundings: [String],
    otherImages: [String]
  },

  /* =====================================================
     📄 DOCUMENT IMAGES (ADMIN/VENDOR UPLOAD)
  ===================================================== */
  documents: {
    propertyDocument: [String],     // registry, lease
    ownerIdProof: [String],         // aadhar, pan
    addressProof: [String],
    govtLicense: [String],
    otherDocuments: [String]
  },

  /* =====================================================
     AMENITIES
  ===================================================== */
  amenities: [String],

  /* =====================================================
     ROOMS INFO
  ===================================================== */
  rooms: [
    {
      roomType: String, // 1BHK, 2BHK, villa
      pricePerNight: Number,
      maxGuests: Number,
      totalRooms: Number,
      availableRooms: Number,
      bedType: String,
      roomSize: String,
      roomImages: [String]
    }
  ],

  /* =====================================================
     PRICING
  ===================================================== */
  price: {
    basePrice: Number,
    weekendPrice: Number,
    monthlyPrice: Number,
    cleaningFee: Number,
    securityDeposit: Number
  },

  discount: {
    percentage: Number,
    validTill: Date
  },

  /* =====================================================
     CHECK IN OUT
  ===================================================== */
  checkInTime: {
    type: String,
    default: "12:00 PM"
  },

  checkOutTime: {
    type: String,
    default: "11:00 AM"
  },

  /* =====================================================
     POLICIES
  ===================================================== */
  policies: {
    guestAllowed: { type: Boolean, default: true },
    unmarriedCouplesAllowed: { type: Boolean, default: true },
    petsAllowed: { type: Boolean, default: false },
    smokingAllowed: { type: Boolean, default: false },
    cancellationPolicy: String,
    houseRules: String
  },

  /* =====================================================
     RATINGS
  ===================================================== */
  ratings: {
    average: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },

  /* =====================================================
     ADMIN CONTROL
  ===================================================== */
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },

  isApproved: {
    type: Boolean,
    default: true   // admin add karega to direct approved
  },

  isActive: {
    type: Boolean,
    default: true
  },

  isFeatured: {
    type: Boolean,
    default: false
  },

  totalBookings: {
    type: Number,
    default: 0
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("VacationHouse", vacationHouseSchema);