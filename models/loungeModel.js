const mongoose = require("mongoose");

const loungeSchema = new mongoose.Schema(
{
  /* ================= OWNER DETAILS ================= */
  ownerName: { type: String, required: true },
  companyName: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String },

  gstNumber: String,
  panNumber: String,
  businessType: {
    type: String,
    enum: ["individual", "private-limited", "partnership"],
    default: "individual"
  },

  /* ================= ADDRESS ================= */
  address: String,
  city: String,
  state: String,
  country: { type: String, default: "India" },
  pincode: String,

  /* ================= BANK DETAILS ================= */
  bankName: String,
  accountHolderName: String,
  accountNumber: String,
  ifscCode: String,

  /* ================= DOCUMENTS ================= */
  gstCertificate: String,
  panCard: String,
  cancelledCheque: String,
  businessLicense: String,

  /* ================= LOUNGE DETAILS ================= */
  loungeName: { type: String, required: true },
  airportName: { type: String, required: true },
  terminal: String,
  location: String,

  /* ================= IMAGES ================= */
  loungeImages: [String],

  /* ================= TIMING ================= */
  openingTime: String,
  closingTime: String,
  open24Hours: { type: Boolean, default: false },

  /* ================= PRICE ================= */
  price: Number,
  childPrice: Number,
  gst: Number,
  currency: { type: String, default: "INR" },

  /* ================= FACILITIES ================= */
  facilities: [String],

  /* ================= FOOD ================= */
  foodIncluded: { type: Boolean, default: true },
  drinksIncluded: { type: Boolean, default: true },
  buffet: { type: Boolean, default: false },

  /* ================= BOOKING ================= */
  entryType: {
    type: String,
    enum: ["paid", "free-with-card", "membership"],
    default: "paid"
  },
  maxStayHours: Number,
  refundable: { type: Boolean, default: false },

  /* ================= CONTACT ================= */
  contactNumber: String,
  contactEmail: String,

  /* ================= ADMIN ================= */
  status: {
    type: String,
    enum: ["pending","approved","rejected"],
    default: "pending"
  },

  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 }

},
{ timestamps: true }
);

module.exports = mongoose.model("Lounge", loungeSchema);