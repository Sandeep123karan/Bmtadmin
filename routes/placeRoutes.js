const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");
const cloudUpload = require("../middleware/cloudUpload");


/* =====================================================
   PLACE IMAGE UPLOAD CONFIG (cloudinary)
===================================================== */
const placeImageUpload = cloudUpload("places").fields([
  { name: "coverImage", maxCount: 1 },
  { name: "bannerImage", maxCount: 1 },
  { name: "gallery", maxCount: 10 }
]);


/* =====================================================
   CREATE PLACE
===================================================== */
router.post("/create", placeImageUpload, placeController.createPlace);


/* =====================================================
   UPDATE PLACE
===================================================== */
router.put("/update/:id", placeImageUpload, placeController.updatePlace);


/* =====================================================
   DELETE PLACE
===================================================== */
router.delete("/delete/:id", placeController.deletePlace);


/* =====================================================
   GET ALL PLACES (search/filter/pagination)
===================================================== */
router.get("/all", placeController.getAllPlaces);


/* =====================================================
   TRENDING PLACES
===================================================== */
router.get("/trending", placeController.getTrendingPlaces);


/* =====================================================
   TOP DESTINATIONS
===================================================== */
router.get("/top-destinations", placeController.getTopDestinations);


/* =====================================================
   SINGLE PLACE BY ID
===================================================== */
router.get("/single/:id", placeController.getSinglePlace);


/* =====================================================
   ADD REVIEW
===================================================== */
router.post("/review/:id", placeController.addReview);


module.exports = router;