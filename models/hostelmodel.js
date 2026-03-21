const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema(
{
  /* ================= BASIC HOSTEL INFO ================= */
  hostelName: { type: String, required: true },
  propertyId: { type: String, unique: true },
  description: String,

  /* ================= OWNER INFO ================= */
  ownerName: { type: String, required: true },
  companyName: String,
  email: { type: String, required: true },
  phone: { type: String, required: true },
  alternatePhone: String,

  /* ================= LOCATION ================= */
  country: { type: String, default: "India" },
  state: String,
  city: { type: String, required: true },
  area: String,
  address: String,
  pincode: String,

  latitude: String,
  longitude: String,
  googleMapLink: String,

  /* ================= HOSTEL TYPE ================= */
  hostelType: {
    type: String,
    enum: ["Boys", "Girls", "Co-ed"],
    required: true,
  },

  /* ================= ROOM DETAILS ================= */
  totalRooms: Number,
  totalBeds: Number,

  roomTypes: [
    {
      roomName: String,
      bedType: String,
      occupancy: Number,
      pricePerMonth: Number,
      pricePerDay: Number,
      availableRooms: Number,
      roomImages: [String], // room photos
    },
  ],

  /* ================= FACILITIES ================= */
  amenities: [String],
  foodAvailable: { type: Boolean, default: false },
  messCharges: Number,

  /* ================= TIMING ================= */
  checkInTime: String,
  checkOutTime: String,
  gateClosingTime: String,

  /* ================= HOSTEL IMAGES ================= */
  hostelImages: [String],      // main hostel photos
  receptionImages: [String],   // reception photos
  roomGallery: [String],       // extra rooms photos
  washroomImages: [String],
  kitchenImages: [String],

  /* ================= DOCUMENTS (IMAGES) ================= */
  documents: {
    ownerAadharFront: String,
    ownerAadharBack: String,
    ownerPanCard: String,

    gstNumber: String,
    gstCertificate: String, // image

    propertyDocument: String, // registry / rent agreement
    policeVerification: String,

    ownerPhoto: String,
    cancelledCheque: String,

    otherDocuments: [String],
  },

  /* ================= RULES ================= */
  rules: [String],

  /* ================= STATUS ================= */
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },

  /* ================= ADMIN ================= */
  addedBy: { type: String, default: "vendor" },
  isActive: { type: Boolean, default: true },

},
{ timestamps: true }
);

module.exports = mongoose.model("Hostel", hostelSchema);