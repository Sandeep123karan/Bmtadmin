


// const Car = require("../models/carModel");
// const apiClient = require("../services/bookingApi");

// // 🔍 Search cars
// exports.searchCars = async (req, res) => {
//   try {
//     const { pickup, dropoff, dateFrom, dateTo } = req.body;

//     const response = await apiClient.post("/api/cars/search", {
//       pickup,
//       dropoff,
//       dateFrom,
//       dateTo
//     });

//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // 🏬 Get depots
// exports.getDepots = async (req, res) => {
//   try {
//     const response = await apiClient.get("/api/cars/depots");
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // 📊 Depot Reviews
// exports.getDepotReviews = async (req, res) => {
//   try {
//     const response = await apiClient.get("/api/cars/depots/reviews/scores");
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // 🚗 Car Details
// exports.getCarDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const response = await apiClient.get(`/api/cars/details/${id}`);
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // 🏢 Suppliers
// exports.getSuppliers = async (req, res) => {
//   try {
//     const response = await apiClient.get("/api/cars/suppliers");
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ⚙️ Constants
// exports.getConstants = async (req, res) => {
//   try {
//     const response = await apiClient.get("/api/cars/constants");
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// const Car = require("../models/carModel");

// // ➕ ADD CAR
// exports.addCar = async (req, res) => {
//   try {
//     const { name, supplier, price, location, rating, image, seats, fuelType, description } = req.body;

//     const car = new Car({
//       name,
//       supplier,
//       price,
//       location,
//       rating,
//       image,
//       seats,
//       fuelType,
//       description
//     });

//     await car.save();

//     res.json({
//       success: true,
//       message: "Car added successfully",
//       car
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// // 📜 GET ALL CARS
// exports.getCars = async (req, res) => {
//   try {
//     const cars = await Car.find().sort({ createdAt: -1 });
//     res.json(cars);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// // ❌ DELETE CAR
// exports.deleteCar = async (req, res) => {
//   try {
//     await Car.findByIdAndDelete(req.params.id);
//     res.json({ message: "Car deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


const Car = require("../models/carModel");
const cloudinary = require("../config/cloudinary");

// ➕ ADD CAR
exports.addCar = async (req, res) => {
  try {
       console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    let imageUrl = "";

    // 🔥 upload image to cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "cars" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const car = new Car({
      name: req.body.name,
      carModel: req.body.carModel,
      fuelType: req.body.fuelType,
      carType: req.body.carType,
      seatCapacity: req.body.seatCapacity,
      gearType: req.body.gearType,
      carColor: req.body.carColor,
      carCategory: req.body.carCategory,
      pickupLocation: req.body.pickupLocation,
      dropLocation: req.body.dropLocation,
      price: req.body.price,
      image: imageUrl,
      currency: "INR",
      rating: 0
    });

    await car.save();

    res.json({
      success: true,
      message: "Car added successfully",
      car
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success:false, message: err.message });
  }
};



// 📜 GET ALL
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      total: cars.length,
      cars
    });

  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};


// ❌ DELETE
exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Car deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};
// UPDATE
exports.updateCar = async (req,res)=>{
  try{
    let imageUrl = req.body.image || "";

    if(req.file){
      const result = await new Promise((resolve,reject)=>{
        const stream = cloudinary.uploader.upload_stream(
          {folder:"cars"},
          (error,result)=>{
            if(error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const updated = await Car.findByIdAndUpdate(
      req.params.id,
      {...req.body,image:imageUrl},
      {new:true}
    );

    res.json({success:true,message:"Car updated",car:updated});
  }catch(err){
    res.status(500).json({message:err.message});
  }
};
