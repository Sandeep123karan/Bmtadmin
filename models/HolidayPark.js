const mongoose = require("mongoose");

const holidayParkSchema = new mongoose.Schema(
{
  /* =====================================================
     🏕️ BASIC INFORMATION
  ===================================================== */
  parkName: {
    type: String,
    required: true,
    trim: true
  },

  propertyId: {
    type: String,
    unique: true
  },

  description: {
    type: String,
    required: true
  },

  shortDescription: String,

  propertyType: {
    type: String,
    default: "Holiday Park"
  },

  starCategory: {
    type: Number,
    default: 0
  },

  /* =====================================================
     📍 LOCATION
  ===================================================== */
  address: {
    street: String,
    area: String,
    landmark: String,
    city: String,
    state: String,
    country: {
      type: String,
      default: "India"
    },
    pincode: String,
    latitude: String,
    longitude: String
  },

  /* =====================================================
     💰 PRICE & BOOKING
  ===================================================== */
  priceRange: {
    basePrice: Number,
    weekendPrice: Number,
    peakPrice: Number
  },

  pricePerNight: Number,

  discount: {
    type: Number,
    default: 0
  },

  taxIncluded: {
    type: Boolean,
    default: false
  },

  /* =====================================================
     🏡 PARK DETAILS
  ===================================================== */
  totalRooms: Number,
  totalCottages: Number,
  maxGuests: Number,

  roomTypes: [
    {
      name: String,
      price: Number,
      capacity: Number
    }
  ],

  /* =====================================================
     🛎️ AMENITIES
  ===================================================== */
  amenities: [String],
  facilities: [String],
  activities: [String],

  /* =====================================================
     🖼️ IMAGES
  ===================================================== */
  thumbnailImage: String,
  bannerImages: [String],
  galleryImages: [String],
  roomImages: [String],

  /* =====================================================
     🍽️ FOOD
  ===================================================== */
  foodOptions: {
    breakfast: Boolean,
    lunch: Boolean,
    dinner: Boolean,
    restaurantAvailable: Boolean
  },

  /* =====================================================
     ⏰ CHECK IN OUT
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
     📜 RULES
  ===================================================== */
  rules: {
    petsAllowed: Boolean,
    smokingAllowed: Boolean,
    alcoholAllowed: Boolean,
    coupleFriendly: Boolean,
    idProofRequired: {
      type: Boolean,
      default: true
    }
  },

  cancellationPolicy: String,

  /* =====================================================
     ⭐ RATINGS
  ===================================================== */
  rating: {
    type: Number,
    default: 0
  },

  totalReviews: {
    type: Number,
    default: 0
  },

  /* =====================================================
     👨‍💼 ADMIN / VENDOR
  ===================================================== */
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },

  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor"
  },

  /* =====================================================
     🔎 SEO
  ===================================================== */
  slug: {
    type: String,
    unique: true
  },

  metaTitle: String,
  metaDescription: String,

  /* =====================================================
     ⭐ STATUS
  ===================================================== */
  isActive: {
    type: Boolean,
    default: true
  },

  isFeatured: {
    type: Boolean,
    default: false
  },

  /* =====================================================
     🔥 ADMIN APPROVAL SYSTEM
  ===================================================== */
  approvalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  rejectionReason: String,

  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },

  approvedAt: Date,

},
{ timestamps: true }
);

module.exports = mongoose.model("HolidayPark", holidayParkSchema);