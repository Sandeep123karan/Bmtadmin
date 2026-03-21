const mongoose = require("mongoose");

const loveHotelSchema = new mongoose.Schema({

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
    unique: true,
    index: true
  },

  slug: {
    type: String,
    unique: true,
    lowercase: true
  },

  tagline: String,

  description: {
    type: String,
    required: true
  },

  propertyType: {
    type: String,
    default: "Love Hotel"
  },

  starRating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
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
    latitude: Number,
    longitude: Number
  },

  /* =====================================================
     CONTACT
  ===================================================== */
  contactDetails: {
    phone: String,
    email: String,
    website: String,
    whatsapp: String
  },

  /* =====================================================
     LOVE HOTEL SPECIAL FEATURES
  ===================================================== */
  coupleFriendly: { type: Boolean, default: true },
  localIdAccepted: { type: Boolean, default: true },
  hourlyBookingAvailable: { type: Boolean, default: true },
  privacyAssured: { type: Boolean, default: true },

  /* =====================================================
     ROOM DETAILS
  ===================================================== */
  rooms: [
    {
      roomId: String,
      roomType: String,
      maxGuests: Number,
      bedType: String,

      pricePerNight: Number,
      pricePerHour: Number,

      totalRooms: Number,
      availableRooms: Number,

      amenities: [String],
      roomImages: [String],

      isAC: Boolean,
      isSmokingAllowed: Boolean
    }
  ],

  /* =====================================================
     PRICE RANGE (for filters)
  ===================================================== */
  priceRange: {
    minPrice: Number,
    maxPrice: Number
  },

  /* =====================================================
     AMENITIES
  ===================================================== */
  amenities: [String],

  /* =====================================================
     IMAGES
  ===================================================== */
  images: {
    thumbnail: String,
    banner: String,
    gallery: [String]
  },

  /* =====================================================
     POLICIES
  ===================================================== */
  policies: {
    checkInTime: String,
    checkOutTime: String,
    cancellationPolicy: String,
    idProofRequired: { type: Boolean, default: true },
    petsAllowed: Boolean,
    smokingAllowed: Boolean,
    unmarriedCouplesAllowed: { type: Boolean, default: true }
  },

  /* =====================================================
     RATINGS & REVIEWS
  ===================================================== */
  ratings: {
    average: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    cleanliness: { type: Number, default: 0 },
    service: { type: Number, default: 0 },
    location: { type: Number, default: 0 },
    valueForMoney: { type: Number, default: 0 }
  },

  /* =====================================================
     BOOKING & COMMISSION
  ===================================================== */
  commissionPercent: {
    type: Number,
    default: 10
  },

  totalBookings: {
    type: Number,
    default: 0
  },

  /* =====================================================
     SEO (MakeMyTrip level)
  ===================================================== */
  seo: {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String]
  },

  /* =====================================================
     STATUS CONTROL
  ===================================================== */
  isApproved: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },

  /* =====================================================
     ADMIN & VENDOR
  ===================================================== */
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },

  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  }

}, { timestamps: true });

module.exports = mongoose.model("LoveHotel", loveHotelSchema);