const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({

  /* ================= BASIC INFO ================= */
  placeName: {
    type: String,
    required: true,
    trim: true
  },
  slug: { type: String, unique: true },

  shortDescription: String,
  fullDescription: String,
  highlights: [String], // top highlights

  /* ================= LOCATION ================= */
  country: { type: String, required: true },
  state: String,
  city: { type: String, required: true },
  area: String,
  address: String,
  pincode: String,

  /* ================= MAP ================= */
  location: {
    latitude: String,
    longitude: String,
    googleMapLink: String
  },

  /* ================= CATEGORY ================= */
  category: {
    type: String,
    enum: [
      "Tourist Place",
      "City",
      "Beach",
      "Mountain",
      "Temple",
      "Historical",
      "Adventure",
      "Shopping",
      "Nightlife",
      "Other"
    ],
    default: "Tourist Place"
  },

  /* ================= IMAGES ================= */
  coverImage: String,
  bannerImage: String,
  gallery: [String], // multiple images
  videos: [String], // youtube links

  /* ================= TIMING ================= */
  openingTime: String,
  closingTime: String,
  bestTimeToVisit: String,
  recommendedDuration: String, // 2-3 hours

  /* ================= ENTRY PRICE ================= */
  entryFee: {
    adult: { type: Number, default: 0 },
    child: { type: Number, default: 0 },
    foreigner: { type: Number, default: 0 }
  },

  /* ================= FACILITIES ================= */
  amenities: [String], // parking, washroom etc
  activities: [String], // boating, trekking

  /* ================= NEARBY ================= */
  nearbyHotels: [String],
  nearbyRestaurants: [String],
  nearbyPlaces: [String],

  /* ================= WEATHER ================= */
  bestSeason: String, // summer winter
  temperature: String,

  /* ================= RATINGS ================= */
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },

  /* ================= REVIEW SCHEMA ================= */
  reviews: [
    {
      userName: String,
      rating: Number,
      comment: String,
      date: { type: Date, default: Date.now }
    }
  ],

  /* ================= FAQ ================= */
  faqs: [
    {
      question: String,
      answer: String
    }
  ],

  /* ================= TAGS ================= */
  tags: [String], // honeymoon, family, couple

  /* ================= SEO ================= */
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],

  /* ================= ADMIN CONTROL ================= */
  isPopular: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isTopDestination: { type: Boolean, default: false },
  isRecommended: { type: Boolean, default: false },

  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "pending"
  },

  /* ================= VENDOR ================= */
  addedBy: {
    type: String,
    enum: ["admin", "vendor"],
    default: "admin"
  },
  vendorId: String,

  /* ================= CREATED ================= */
  createdAt: { type: Date, default: Date.now }

}, { timestamps: true });

module.exports = mongoose.model("Place", placeSchema);