const mongoose = require("mongoose");

const farmStaySchema = new mongoose.Schema({

  /* =========================================================
     BASIC INFO
  ========================================================= */
  farmName: {
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
    default: "Farm Stay"
  },

  category: {
    type: String,
    default: "Farm"
  },

  tags: [String], // organic, village, nature, luxury

  /* =========================================================
     LOCATION
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
     PRICING
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
     FARM DETAILS
  ========================================================= */
  stayType: String, // cottage, hut, villa, dorm

  totalRooms: Number,
  availableRooms: Number,
  maxGuests: Number,

  checkInTime: String,
  checkOutTime: String,

  /* =========================================================
     AMENITIES & ACTIVITIES
  ========================================================= */
  amenities: [String], // wifi, pool, parking, ac
  activities: [String], // farming, horse riding, bonfire
  rules: [String],

  /* =========================================================
     FOOD
  ========================================================= */
  foodAvailable: {
    type: Boolean,
    default: false
  },

  foodType: {
    type: String,
    default: "Both" // veg/nonveg
  },

  /* =========================================================
     IMAGES
  ========================================================= */
  thumbnailImage: String,
  bannerImage: String,
  images: [String],
  galleryImages: [String],

  /* =========================================================
     DOCUMENTS (ADMIN VERIFY)
  ========================================================= */
  documents: {
    idProof: [String],
    propertyLicense: [String],
    pollutionCertificate: [String],
    fireSafetyCertificate: [String],
    otherDocuments: [String]
  },

  documentStatus: {
    type: String,
    enum: ["pending","approved","rejected"],
    default: "pending"
  },

  /* =========================================================
     CONTACT
  ========================================================= */
  contactNumber: String,
  alternateNumber: String,
  email: String,
  website: String,

  /* =========================================================
     ADMIN / VENDOR
  ========================================================= */
  vendorId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  addedBy:{
    type:String,
    default:"admin"
  },

  /* =========================================================
     RATING
  ========================================================= */
  rating:{
    type:Number,
    default:0
  },

  totalReviews:{
    type:Number,
    default:0
  },

  /* =========================================================
     ADMIN CONTROL
  ========================================================= */
  isFeatured:{ type:Boolean, default:false },
  isPopular:{ type:Boolean, default:false },
  isTop:{ type:Boolean, default:false },

  status:{
    type:String,
    enum:["active","inactive","pending"],
    default:"active"
  },

  rejectionReason:{
    type:String,
    default:""
  },

  /* =========================================================
     SEO
  ========================================================= */
  metaTitle:String,
  metaDescription:String,
  metaKeywords:[String]

},{timestamps:true});

farmStaySchema.index({ farmName:"text", "address.city":"text" });

module.exports = mongoose.model("FarmStay", farmStaySchema);