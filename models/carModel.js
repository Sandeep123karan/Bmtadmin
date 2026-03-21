// const mongoose = require("mongoose");

// const carSchema = new mongoose.Schema(
//   {
//     carName: String,
//     carModel: String,
//     fuelType: String,
//     carType: String,
//     seatCapacity: String,
//     gearType: String,
//     carColor: String,
//     carCategory: String,
//     pickupLocation: String,
//     dropLocation: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Car", carSchema);


// // const mongoose = require("mongoose");

// // const carSchema = new mongoose.Schema({
// //   carId: { type: String, required: true },
// //   name: { type: String },
// //   supplier: { type: String },
// //   price: { type: Number },
// //   currency: { type: String },
// //   location: { type: String },
// //   rating: { type: Number },
// //   image: { type: String },
// //   createdAt: { type: Date, default: Date.now }
// // });

// // module.exports = mongoose.model("Car", carSchema);





// const mongoose = require("mongoose");

// const carSchema = new mongoose.Schema({
//   carId: { type: String },
//   name: { type: String, required: true },

//   supplier: { type: String },
//   location: { type: String },

//   price: { type: Number, required: true },   // ✅ price added mandatory
//   currency: { type: String, default: "INR" },

//   rating: { type: Number, default: 0 },
//   image: { type: String },

//   seats: { type: Number },        // optional
//   fuelType: { type: String },     // optional
//   description: { type: String },  // optional

//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Car", carSchema);




const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  carModel: String,
  fuelType: String,
  carType: String,
  seatCapacity: String,
  gearType: String,
  carColor: String,
  carCategory: String,
  pickupLocation: String,
  dropLocation: String,

  price: Number,
  currency: { type: String, default: "INR" },
  rating: { type: Number, default: 0 },
  image: String
}, { timestamps:true });

module.exports = mongoose.model("Car", carSchema);
