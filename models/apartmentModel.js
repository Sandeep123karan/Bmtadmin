const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({

/* ================= BASIC ================= */
propertyId: String,
apartmentName: { type: String, required: true },
propertyType: { type: String, default: "Apartment" },
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
landmark: String,

mapLocation:{
  lat:String,
  lng:String
},

/* ================= BUILDING DETAILS ================= */
buildingName:String,
towerName:String,
floorNumber:String,
totalFloors:String,
flatNumber:String,
societyName:String,

/* ================= APARTMENT DETAILS ================= */
apartmentType:String, // 1BHK, 2BHK, 3BHK, studio
bedrooms:Number,
hall:Number,
kitchen:Number,
bathrooms:Number,
balcony:Number,

furnishing:String, // furnished/semi/unfurnished
carpetArea:String,
superArea:String,

maxGuests:Number,
beds:Number,

checkInTime:String,
checkOutTime:String,

/* ================= AMENITIES ================= */
amenities:[String], 
// wifi, lift, parking, ac, kitchen, tv, geyser, power backup

/* ================= PRICE ================= */
pricePerNight:String,
pricePerMonth:String,
securityDeposit:String,

cleaningFee:String,
serviceFee:String,
tax:String,
discount:String,
finalPrice:String,

vendorCost:String,
profit:String,

/* ================= ROOM INFO ================= */
roomType:String, // entire apartment/private room
mealPlan:String,

/* ================= AVAILABILITY ================= */
availableFrom:Date,
availableTo:Date,

/* ================= OWNER DETAILS ================= */
owner:{
 fullName:String,
 phone:String,
 email:String,
 address:String,

 aadharNumber:String,
 panNumber:String,

 bankAccountHolder:String,
 bankName:String,
 accountNumber:String,
 ifscCode:String,
 upiId:String,

 isVerified:{
   type:Boolean,
   default:false
 }
},

/* ================= IMAGES ================= */
thumbnail:String,
gallery:[String],

/* ================= RULES ================= */
houseRules:String,
cancellationPolicy:String,

/* ================= RATING ================= */
rating:String,
reviews:String,

/* ================= DATE ================= */
addedDate:{
  type:Date,
  default:Date.now
},
startBookingDate:Date,
endBookingDate:Date,

/* ================= STATUS ================= */
status:{
 type:String,
 default:"pending" // pending → approved
},

/* ================= ADMIN ================= */
assignUser:String,
addedBy:String,
notes:String

},{timestamps:true});

module.exports = mongoose.model("Apartment", apartmentSchema);