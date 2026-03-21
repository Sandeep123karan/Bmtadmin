const mongoose = require("mongoose");

const campsiteSchema = new mongoose.Schema(
{
  /* =========================================================
     🏕️ BASIC INFORMATION
  ========================================================= */
  campsiteName: {
    type: String,
    required: true,
    trim: true
  },

  propertyId: {
    type: String,
    unique: true
  },

  slug: {
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
    default: "Campsite"
  },

  category: {
    type: String,
    default: "Camping" // Adventure, Jungle, Desert etc
  },

  tags: [String], // adventure, river side, mountain

  /* =========================================================
     📍 LOCATION
  ========================================================= */
  address: {
    street: String,
    area: String,
    city: String,
    state: String,
    country: { type: String, default: "India" },
    pincode: String,
    landmark: String
  },

  location: {
    latitude: String,
    longitude: String,
    googleMapLink: String
  },

  /* =========================================================
     💰 PRICING
  ========================================================= */
  price: {
    perNight: Number,
    weekendPrice: Number,
    childPrice: Number,
    extraPersonPrice: Number
  },

  discount: {
    type: Number,
    default: 0
  },

  taxPercent: Number,

  /* =========================================================
     🏕️ CAMP DETAILS
  ========================================================= */
  campType: String, // Tent, Luxury Tent, Dome

  totalTents: Number,
  availableTents: Number,
  maxGuests: Number,

  checkInTime: String,
  checkOutTime: String,

  /* =========================================================
     ⭐ AMENITIES & ACTIVITIES
  ========================================================= */
  amenities: [String],

  activities: [String],

  rules: [String], // no alcohol, no loud music

  /* =========================================================
     🖼️ IMAGES
  ========================================================= */
  thumbnailImage: String,
  bannerImage: String,

  images: [String], // main images
  galleryImages: [String], // extra gallery

  /* =========================================================
     📄 DOCUMENTS (IMPORTANT FOR ADMIN PANEL)
  ========================================================= */
  documents: {
    idProof: [String], // owner aadhar/pan
    campsiteLicense: [String],
    pollutionCertificate: [String],
    fireSafetyCertificate: [String],
    otherDocuments: [String]
  },

  documentStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  /* =========================================================
     🍽️ FOOD
  ========================================================= */
  foodAvailable: {
    type: Boolean,
    default: false
  },

  foodType: {
    type: String,
    default: "Both" // veg, non-veg
  },

  /* =========================================================
     📞 CONTACT DETAILS
  ========================================================= */
  contactNumber: String,
  alternateNumber: String,
  email: String,
  website: String,

  /* =========================================================
     👨‍💼 ADMIN / VENDOR
  ========================================================= */
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor"
  },

  addedBy: {
    type: String,
    default: "admin"
  },

  /* =========================================================
     ⭐ RATING
  ========================================================= */
  rating: {
    type: Number,
    default: 0
  },

  totalReviews: {
    type: Number,
    default: 0
  },

  /* =========================================================
     🔥 ADMIN CONTROL
  ========================================================= */
  isFeatured: {
    type: Boolean,
    default: false
  },

  isPopular: {
    type: Boolean,
    default: false
  },

  isTop: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "active"
  },
  rejectionReason: {
  type: String,
  default: ""
},

  /* =========================================================
     🧾 SEO (FRONTEND LISTING)
  ========================================================= */
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String]

},
{
  timestamps: true
});
campsiteSchema.index({ campsiteName: "text", "address.city": "text" });
module.exports = mongoose.model("Campsite", campsiteSchema);