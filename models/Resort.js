

const mongoose = require("mongoose");

/* ================= ROOM SCHEMA ================= */
const roomSchema = new mongoose.Schema({
  roomName: String,
  roomType: String,
  price: Number,
  extraBedPrice: Number,
  maxAdults: Number,
  maxChildren: Number,
  totalRooms: Number,
  availableRooms: Number,
  roomSize: String,
  bedType: String,
  amenities: [String],
  images: [String],
});

/* ================= OWNER DOCUMENT ================= */
const ownerDocSchema = new mongoose.Schema({
  aadharCard: String,
  panCard: String,
  gstNumber: String,
  gstDocument: String,
  ownerPhoto: String,
  agreementDoc: String,
  cancelledCheque: String,
});

/* ================= BANK DETAILS ================= */
const bankSchema = new mongoose.Schema({
  accountHolderName: String,
  bankName: String,
  accountNumber: String,
  ifscCode: String,
  branch: String,
});

/* ================= MAIN RESORT SCHEMA ================= */
const resortSchema = new mongoose.Schema(
  {
    resortId: { type: String, unique: true },

    /* BASIC INFO */
    resortName: { type: String, required: true },
    propertyType: { type: String, default: "Resort" },
    starRating: Number,

    slug: String, // seo url

    ownerName: String,
    email: String,
    phone: String,

    vendorId: String,
    vendorName: String,

    /* LOCATION */
    country: String,
    state: String,
    city: String,
    address: String,
    pincode: String,
    latitude: String,
    longitude: String,
    landmark: String,
    googleMapLink: String,

    /* DESCRIPTION */
    shortDescription: String,
    fullDescription: String,

    /* AMENITIES */
    amenities: [String],
    propertyHighlights: [String],

    /* IMAGES */
    mainImage: String,
    images: [String],
    videos: [String],

    /* ROOMS */
    rooms: [roomSchema],
    totalRooms: Number,

    /* CHECKIN */
    checkInTime: String,
    checkOutTime: String,

    /* POLICIES */
    cancellationPolicy: String,
    childPolicy: String,
    petPolicy: String,
    coupleFriendly: { type: Boolean, default: true },

    /* FACILITIES */
    foodOptions: [String],
    activities: [String],
    nearbyAttractions: [String],

    /* PRICE */
    startingPrice: Number,
    taxPercent: Number,

    /* COMMISSION */
    adminCommission: Number,
    vendorCommission: Number,

    /* DYNAMIC PRICE CALENDAR */
    priceCalendar: [
      {
        date: String,
        price: Number,
        availableRooms: Number,
      },
    ],

    /* REVIEWS */
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },

    /* BOOKINGS COUNT */
    totalBookings: { type: Number, default: 0 },

    /* OWNER DOCUMENTS */
    ownerDocuments: ownerDocSchema,

    /* BANK DETAILS */
    bankDetails: bankSchema,

    /* ADMIN APPROVAL */
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedBy: String,
    approvedAt: Date,
    rejectedReason: String,

    /* STATUS */
    status: { type: String, default: "active" },
    featured: { type: Boolean, default: false },

    isTop: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },

    /* SEARCH */
    searchKeywords: [String],

    createdBy: { type: String, default: "admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resort", resortSchema);

