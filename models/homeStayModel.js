const mongoose = require("mongoose");

const homeStaySchema = new mongoose.Schema({

/* ================= BASIC ================= */
propertyId: String,
propertyName: { type: String, required: true },
propertyType: String, // villa, apartment, cottage
hostName: String,
vendorName: String,

/* ================= CONTACT ================= */
email: String,
phone: String,
altPhone: String,

/* ================= LOCATION ================= */
country: String,
state: String,
city: String,
area: String,
address: String,
pincode: String,

mapLocation: {
  lat: String,
  lng: String
},

/* ================= PROPERTY DETAILS ================= */
bedrooms: Number,
bathrooms: Number,
maxGuests: Number,
beds: Number,
checkInTime: String,
checkOutTime: String,

/* ================= AMENITIES ================= */
amenities: [String],

/* ================= PRICE ================= */
pricePerNight: String,
cleaningFee: String,
serviceFee: String,
tax: String,
discount: String,
finalPrice: String,
vendorCost: String,
profit: String,

/* ================= ROOM INFO ================= */
roomType: String,
mealPlan: String,

/* ================= AVAILABILITY ================= */
availableFrom: Date,
availableTo: Date,

/* ================= OWNER FULL DETAILS ================= */
owner:{

  /* PERSONAL */
  fullName:String,
  fatherName:String,
  dob:String,
  gender:String,

  phone:String,
  alternatePhone:String,
  email:String,

  /* ADDRESS */
  addressLine1:String,
  addressLine2:String,
  city:String,
  state:String,
  country:String,
  pincode:String,

  /* KYC */
  aadharNumber:String,
  panNumber:String,
  passportNumber:String,

  aadharFront:String,
  aadharBack:String,
  panCardImage:String,
  passportImage:String,

  /* PROPERTY DOC */
  propertyProof:String,
  agreementCopy:String,
  electricityBill:String,

  /* BANK */
  bankAccountHolder:String,
  bankName:String,
  accountNumber:String,
  ifscCode:String,
  upiId:String,

  /* GST */
  gstNumber:String,

  /* VERIFY */
  isVerified:{
    type:Boolean,
    default:false
  },
  verifiedBy:String,
  verifiedAt:Date
},

/* ================= IMAGES ================= */
thumbnail: String,
// gallery: {
//   type: [String],
//   validate:{
//     validator:v=>v.length>=3,
//     message:"Minimum 3 images required"
//   }
// },
gallery:[String],

/* ================= RULES ================= */
houseRules: String,
cancellationPolicy: String,

/* ================= RATING ================= */
rating: String,
reviews: String,

/* ================= DATE ================= */
addedDate:{
  type:Date,
  default:Date.now
},
modifiedDate:Date,
startBookingDate:Date,
endBookingDate:Date,

/* ================= STATUS ================= */
status:{
  type:String,
  default:"pending"
},

/* ================= ADMIN ================= */
assignUser:String,
addedBy:String,
notes:String

},{timestamps:true});

module.exports = mongoose.model("HomeStay",homeStaySchema);