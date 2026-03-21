// const mongoose = require("mongoose");
// const darshanSchema = new mongoose.Schema({
//   name: String,              // Darshan name
//   location: String,          // Temple/place
//   date: Date,
//   time: String,

//   description: String,       // Darshan detail
//   price: Number,             // VIP ticket price
//   availableSeats: Number,    // Kitni booking possible
//   image: String,             // Temple image URL
//   status: { 
//     type: String, 
//     enum: ["active","inactive"], 
//     default: "active" 
//   },
//   createdBy: String
// }, { timestamps:true })
// module.exports = mongoose.model("Darshan", darshanSchema);

 


const mongoose = require("mongoose");

const darshanSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: Date,
  time: String,
  description: String,
  price: Number,
  availableSeats: Number,

  images: [String], // 🔥 multiple images array

  status: {
    type: String,
    enum: ["active","inactive"],
    default: "active"
  }

},{timestamps:true});

module.exports = mongoose.model("Darshan", darshanSchema);
