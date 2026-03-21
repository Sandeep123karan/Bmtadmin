



const mongoose = require("mongoose");

const motelSchema = new mongoose.Schema({

  /* ================= BASIC INFO ================= */
  motelName: {
    type: String,
    required: true,
    trim: true
  },

  propertyId: {
    type: String,
    unique: true
  },

  description: String,

  propertyType: {
    type: String,
    default: "Motel"
  },

  starCategory: {
    type: String,
    enum: ["1 Star","2 Star","3 Star","4 Star","5 Star"],
    default: "3 Star"
  },

  /* ================= LOCATION ================= */
  address: {
    street: String,
    area: String,
    landmark: String,
    city: String,
    state: String,
    country: { type: String, default: "India" },
    pincode: String
  },

  location: {
    latitude: Number,
    longitude: Number
  },

  googleMapLink: String,

  nearbyPlaces: [
    {
      placeName: String,
      distance: String
    }
  ],

  /* ================= CONTACT INFO ================= */
  contactPerson: String,
  phone: String,
  alternatePhone: String,
  email: String,
  website: String,

  /* ================= IMAGES ================= */
  thumbnailImage: String,
  propertyImages: [String],
  receptionImages: [String],
  roomImages: [String],
  washroomImages:[String],
  parkingImages:[String],

  /* ================= DOCUMENTS ================= */
  documents: {
    gstCertificate: {
      documentNumber: String,
      images: [String]
    },
    panCard: {
      documentNumber: String,
      images: [String]
    },
    ownerIdProof: {
      documentNumber: String,
      images: [String]
    },
    tradeLicense: {
      documentNumber: String,
      images: [String]
    },
    cancelledCheque: {
      images: [String]
    },
    otherDocuments: [
      {
        documentName: String,
        images: [String]
      }
    ]
  },

  /* ================= ROOM DETAILS ================= */
  totalRooms: Number,
  totalFloors: Number,
  buildYear: String,

  roomTypes: [
    {
      roomName: String,
      pricePerNight: Number,
      weekendPrice:Number,
      maxGuests: Number,
      bedType: String,
      roomSize: String,
      amenities: [String],
      roomImages: [String],
      availableRooms:Number,
      isAvailable: { type: Boolean, default: true }
    }
  ],

  /* ================= FACILITIES ================= */
  amenities: [String],
  parkingAvailable: Boolean,
  restaurantAvailable: Boolean,
  wifiAvailable: Boolean,
  poolAvailable: Boolean,
  barAvailable: Boolean,
  liftAvailable:Boolean,
  powerBackup:Boolean,
  cctv:Boolean,

  /* ================= POLICIES ================= */
  checkInTime: String,
  checkOutTime: String,
  cancellationPolicy: String,
  houseRules: String,
  petPolicy: String,
  coupleFriendly:{type:Boolean,default:true},
  localIdAllowed:{type:Boolean,default:true},

  /* ================= RATING ================= */
  rating: {
    type: Number,
    default: 0
  },
  reviewsCount: {
    type: Number,
    default: 0
  },

  reviews:[
    {
      userName:String,
      rating:Number,
      comment:String,
      date:{type:Date,default:Date.now}
    }
  ],

  /* ================= PRICE CONTROL ================= */
  basePrice: Number,
  weekendPrice: Number,
  taxPercentage: Number,
  discountPercentage: Number,
  serviceCharge:Number,

  /* ================= AVAILABILITY ================= */
  totalBookings:{type:Number,default:0},
  availableRooms:{type:Number,default:0},
  isFull:{type:Boolean,default:false},

  /* ================= ADMIN CONTROL ================= */
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  rejectionReason: String,

  approvedBy: String,

  /* ================= FLAGS ================= */
  isFeatured: { type: Boolean, default: false },
  isTopRated: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },

  /* ================= SEO ================= */
  slug:String,
  metaTitle:String,
  metaDescription:String,

}, { timestamps: true });

module.exports = mongoose.model("Motel", motelSchema);