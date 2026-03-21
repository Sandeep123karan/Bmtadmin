const mongoose = require("mongoose");

const guestHouseSchema = new mongoose.Schema(
{
  /* ================= ADMIN BASIC ================= */
  propertyId: {
    type: String,
    required: true,
    unique: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    default: "Guest House",
  },

  /* ================= OWNER INFO ================= */
  ownerName: {
    type: String,
    required: true,
  },
  ownerPhone: String,
  ownerEmail: String,

  /* ================= OWNER DOCUMENTS (KYC) ================= */
  ownerDocuments: {
    aadharNumber: String,
    panNumber: String,
    gstNumber: String,

    aadharFrontImage: String,
    aadharBackImage: String,
    panCardImage: String,
    gstCertificateImage: String,

    agreementDocument: String, // property agreement
    propertyTaxReceipt: String,

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    verifiedBy: String,
    verificationDate: Date,
  },

  /* ================= VENDOR INFO ================= */
  vendorId: String,
  vendorName: String,
  vendorPhone: String,
  vendorEmail: String,

  /* ================= LOCATION ================= */
  address: {
    type: String,
    required: true,
  },
  landmark: String,
  city: {
    type: String,
    required: true,
  },
  state: String,
  country: {
    type: String,
    default: "India",
  },
  pincode: String,
  latitude: String,
  longitude: String,
  googleMapLink: String,

  /* ================= ROOM INFO ================= */
  totalRooms: Number,
  availableRooms: Number,

  roomDetails: [
    {
      roomType: String,
      price: Number,
      capacity: Number,
      bedType: String,
      totalRoom: Number,
      availableRoom: Number,
    }
  ],

  /* ================= PRICE ================= */
  basePrice: Number,
  extraBedPrice: Number,
  tax: Number,

  /* ================= FACILITIES ================= */
  amenities: [String],

  /* ================= FOOD ================= */
  foodAvailable: Boolean,
  foodType: String,

  /* ================= CHECK IN OUT ================= */
  checkInTime: String,
  checkOutTime: String,

  /* ================= IMAGES ================= */
  mainImage: String,
  images: [String],

  /* ================= DESCRIPTION ================= */
  description: String,
  propertyRules: String,

  /* ================= STATUS ================= */
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },

  addedBy: {
    type: String,
    default: "admin",
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model("GuestHouse", guestHouseSchema);