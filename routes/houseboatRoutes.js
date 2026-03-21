const express = require("express");
const router = express.Router();

const houseboatCtrl = require("../controllers/houseboatController");
const cloudUpload = require("../middleware/cloudUpload");

// cloudinary folder name
const upload = cloudUpload("houseboats");


/* =====================================================
   ADD HOUSEBOAT (WITH IMAGES & VIDEOS)
===================================================== */
router.post(
  "/add",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "houseboatImages", maxCount: 20 },
    { name: "interiorImages", maxCount: 20 },
    { name: "exteriorImages", maxCount: 20 },
    { name: "houseboatVideos", maxCount: 5 }
  ]),
  houseboatCtrl.addHouseboat
);


/* =====================================================
   UPDATE HOUSEBOAT (WITH IMAGE UPDATE)
===================================================== */
router.put(
  "/update/:id",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "houseboatImages", maxCount: 20 },
    { name: "interiorImages", maxCount: 20 },
    { name: "exteriorImages", maxCount: 20 },
    { name: "houseboatVideos", maxCount: 5 }
  ]),
  houseboatCtrl.updateHouseboat
);


/* =====================================================
   GET ALL HOUSEBOATS
===================================================== */
router.get("/all", houseboatCtrl.getAllHouseboats);


/* =====================================================
   GET SINGLE HOUSEBOAT
===================================================== */
router.get("/:id", houseboatCtrl.getSingleHouseboat);


/* =====================================================
   DELETE
===================================================== */
router.delete("/delete/:id", houseboatCtrl.deleteHouseboat);


/* =====================================================
   ADMIN APPROVE
===================================================== */
router.put("/approve/:id", houseboatCtrl.approveHouseboat);


/* =====================================================
   ADMIN REJECT
===================================================== */
router.put("/reject/:id", houseboatCtrl.rejectHouseboat);


module.exports = router;