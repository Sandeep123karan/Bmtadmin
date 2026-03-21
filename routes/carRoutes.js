
// const express = require("express");
// const router = express.Router();
// const {
//   searchCars,
//   getDepots,  
//   getDepotReviews,
//   getCarDetails,
//   getSuppliers,
//   getConstants
// } = require("../controllers/carController");

// router.post("/search", searchCars);
// router.get("/depots", getDepots);
// router.get("/depots/reviews", getDepotReviews);
// router.get("/details/:id", getCarDetails);
// router.get("/suppliers", getSuppliers);
// router.get("/constants", getConstants);

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const carController = require("../controllers/carController");

// router.post("/add", carController.addCar);   // add car
// router.get("/", carController.getCars);     // all cars
// router.delete("/:id", carController.deleteCar); // delete

// module.exports = router;



const express = require("express");
const router = express.Router();
const multer = require("multer");
const carController = require("../controllers/carController");

// multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add", upload.single("image"), carController.addCar);
router.get("/", carController.getCars);
router.delete("/:id", carController.deleteCar);
router.put("/:id", upload.single("image"), carController.updateCar);


module.exports = router;
