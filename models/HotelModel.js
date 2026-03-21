const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
{
  /* ===== BASIC INFO ===== */
  hotelName: { type: String, required: true },
  description: String,
  hotelType: String, // hotel, resort, villa

  /* ===== LOCATION ===== */
  city: String,
  state: String,
  country: { type: String, default: "India" },
  address: String,
  pincode: String,

  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number] // [lng, lat]
  },

  /* ===== CONTACT ===== */
  phone: String,
  email: String,

  /* ===== PRICE & ROOM ===== */
  pricePerNight: Number,
  totalRooms: Number,
  availableRooms: Number,

  /* ===== AMENITIES ===== */
  amenities: [String],

  /* ===== IMAGES ===== */
  images: [String],

  /* ===== VENDOR INFO ===== */
  vendorId: String,
  vendorName: String,

  /* ===== ADMIN APPROVAL ===== */
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

},
{ timestamps: true }
);

hotelSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hotel", hotelSchema);
