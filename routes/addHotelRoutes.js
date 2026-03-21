

// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/addHotelController");

// router.post("/", controller.createHotel);
// router.get("/", controller.getHotels);
// router.get("/:id", controller.getHotelById);
// router.put("/:id", controller.updateHotel);
// router.delete("/:id", controller.deleteHotel);

// module.exports = router;





const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  addHotel,
  getAllHotels,
  getSingleHotel,
  updateHotel,
  deleteHotel,
  approveHotel,
  getVendorHotels,
  getNearbyHotels
} = require("../controllers/addHotelController");


/* ======================================================
   MULTER STORAGE
====================================================== */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* ======================================================
   MULTIPLE FILE FIELDS
====================================================== */
const multiUpload = upload.fields([
  { name: "hotelImages", maxCount: 20 },
  { name: "roomImages", maxCount: 20 },
  { name: "videos", maxCount: 10 }
]);


/* ======================================================
   HOTEL ROUTES
====================================================== */

/* ADD HOTEL */
router.post("/add", multiUpload, addHotel);

/* GET ALL HOTELS (ADMIN) */
router.get("/all", getAllHotels);

/* GET SINGLE HOTEL */
router.get("/:id", getSingleHotel);

/* UPDATE HOTEL */
router.put("/update/:id", multiUpload, updateHotel);

/* DELETE HOTEL */
router.delete("/delete/:id", deleteHotel);

/* APPROVE HOTEL (ADMIN) */
router.put("/approve/:id", approveHotel);

/* VENDOR HOTELS */
router.get("/vendor/:vendorId", getVendorHotels);

/* NEARBY HOTELS (MAP SEARCH) */
router.get("/nearby/search", getNearbyHotels);

module.exports = router;
