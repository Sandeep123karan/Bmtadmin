// const mongoose = require("mongoose");

// /* ================= SEAT SCHEMA ================= */
// const seatSchema = new mongoose.Schema({
//   seatNumber: String,
//   seatType: { type: String, enum: ["sleeper", "seater"] },
//   deck: { type: String, enum: ["upper", "lower", "single"] },
//   price: Number,
//   isBooked: { type: Boolean, default: false }
// });

// /* ================= LIVE TRACKING ================= */
// const liveTrackingSchema = new mongoose.Schema({
//   lat: Number,
//   lng: Number,
//   speed: Number,
//   heading: Number,
//   updatedAt: { type: Date, default: Date.now }
// });

// /* ================= ROUTE GPS HISTORY ================= */
// const routeLocationSchema = new mongoose.Schema({
//   lat: Number,
//   lng: Number,
//   time: { type: Date, default: Date.now }
// });

// /* ================= BUS SCHEMA ================= */
// const busSchema = new mongoose.Schema({

//   /* ================= BASIC INFO ================= */
//   busName: { type: String, required: true },
//   busType: String, // AC Sleeper, Seater
//   operatorName: String,
//   busNumber: String,
//   busModel: String, // Volvo, BharatBenz
//   seatLayoutType: String, // 2+1 sleeper etc
//   totalSeats: Number,

//   /* ================= ROUTE INFO ================= */
//   fromCity: String,
//   toCity: String,
//   boardingPoints: [String],
//   droppingPoints: [String],
//   routeStops: [String],

//   departureTime: String,
//   arrivalTime: String,
//   duration: String,
//   journeyDate: String,

//   /* ================= PRICE INFO ================= */
//   basePrice: Number,
//   offerPrice: Number,
//   tax: Number,
//   discountPercent: Number,
//   couponAllowed: { type: Boolean, default: false },

//   /* ================= SEATS ================= */
//   availableSeats: Number,
//   seats: [seatSchema],

//   /* ================= FACILITIES ================= */
//   amenities: [String], // wifi, charging
//   busFeatures: [String], // water bottle, tv

//   /* ================= IMAGES ================= */
//   busImages: [String],

//   /* ================= LIVE TRACKING ================= */
//   liveLocation: liveTrackingSchema,
//   routeLocation: [routeLocationSchema], // full route path history

//   busRunningStatus: {
//     type: String,
//     enum: ["on-time", "delayed", "cancelled"],
//     default: "on-time"
//   },

//   /* ================= POLICIES ================= */
//   cancellationPolicy: String,
//   refundPolicy: String,

//   /* ================= RATING ================= */
//   averageRating: { type: Number, default: 0 },
//   totalReviews: { type: Number, default: 0 },

//   /* ================= VENDOR ================= */
//   vendorId: String,
//   vendorName: String,

//   /* ================= WHO ADDED ================= */
//   addedBy: {
//     type: String,
//     enum: ["admin", "vendor"],
//     default: "vendor"
//   },

//   /* ================= ADMIN APPROVAL ================= */
//   status: {
//     type: String,
//     enum: ["pending", "approved", "rejected"],
//     default: "pending"
//   },

//   isActive: { type: Boolean, default: true }

// }, { timestamps: true });

// module.exports = mongoose.model("Bus", busSchema);






const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
{
/* ================= BASIC INFO ================= */
busId: String, // internal id
busName: { type: String, required: true },
busNumber: { type: String, required: true, unique: true },
operatorName: String,
vendorName: String,
busOwner: String,

/* ================= OPERATOR CONTACT ================= */
email: String,
phone: String,
altPhone: String,
address: String,
city: String,
state: String,
country: String,

/* ================= ROUTE INFO ================= */
fromCity: { type: String, required: true },
toCity: { type: String, required: true },
viaCities: [String],
routeName: String,

/* ================= BOARDING ================= */
boardingPoints: [
  {
    location: String,
    time: String,
    address: String,
    landmark: String
  }
],

/* ================= DROPPING ================= */
droppingPoints: [
  {
    location: String,
    time: String,
    address: String,
    landmark: String
  }
],

/* ================= TIMING ================= */
departureTime: String,
arrivalTime: String,
journeyDuration: String,
reportingTime: String,

/* ================= BUS DETAILS ================= */
busType: String, // AC/Non AC
busCategory: String, // sleeper/seater
busModel: String,
busColor: String,
seatLayoutType: String, // 2x2
totalSeats: Number,
availableSeats: Number,
upperSeats: Number,
lowerSeats: Number,

/* ================= SEAT SYSTEM ================= */
seatNumbers: [String], // A1,A2
bookedSeats: [String],
blockedSeats: [String],

seatPrice: [
  {
    seatNo: String,
    price: String
  }
],

/* ================= PRICE ================= */
basePrice: String,
tax: String,
tollTax: String,
discount: String,
offerPrice: String,
finalPrice: String,

agentCommission: String,
agentPrice: String,

vendorCost: String,
vendorPaymentStatus: String,
profit: String,

/* ================= DRIVER ================= */
driverName: String,
driverPhone: String,
driverLicense: String,
helperName: String,
helperPhone: String,

/* ================= DOCUMENTS ================= */
rcNumber: String,
insuranceNumber: String,
permitNumber: String,
fitnessExpiry: String,

/* ================= LIVE TRACK ================= */
gpsDeviceId: String,
liveTrackingLink: String,
busCurrentLocation: String,

/* ================= AMENITIES ================= */
amenities: [String], // wifi, blanket

/* ================= DATE ================= */
travelDate: String,
returnDate: String,

/* ================= EXTRA DATE ================= */

addedDate: {
  type: Date,
  default: Date.now
},

modifiedDate: Date,

startBookingDate: Date,
endBookingDate: Date,

cancelDate: Date,
completedDate: Date,
/* ================= MAP ================= */
routeMap: {
  fromLat: String,
  fromLng: String,
  toLat: String,
  toLng: String
},

/* ================= IMAGES ================= */
frontImage: String,
backImage: String,
seatLayoutImage: String,
insideImages: [String],

gallery: {
  type: [String],
  validate: {
    validator: v => v.length >= 3,
    message: "Minimum 3 gallery images required",
  },
},

/* ================= POLICY ================= */
cancellationPolicy: String,
rating: String,
reviews: String,

/* ================= STATUS ================= */
status: {
  type: String,
   default: "pending" // pending → approved → rejected
},

/* ================= ADMIN ================= */
assignUser: String,
notes: String,
addedBy: String,
},
{ timestamps: true }
);

module.exports = mongoose.model("Bus", busSchema);