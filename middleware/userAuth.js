const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/holidayParkController");

// ✅ correct middleware path
const { protect, isAdmin, isVendor } = require("../middleware/authMiddleware");
const cloudUpload = require("../middleware/cloudUpload");

/* =========================================================
   📸 CLOUDINARY UPLOAD
========================================================= */
const upload = cloudUpload("holidayparks");

/* =========================================================
   🏕️ ADD HOLIDAY PARK (ADMIN + VENDOR)
========================================================= */
router.post(
  "/add",
  protect,
  upload.fields([
    { name: "thumbnailImage", maxCount: 1 },
    { name: "bannerImages", maxCount: 10 },
    { name: "galleryImages", maxCount: 15 },
    { name: "roomImages", maxCount: 15 },
  ]),
  ctrl.addHolidayPark
);

/* =========================================================
   ✏️ UPDATE HOLIDAY PARK
========================================================= */
router.put(
  "/update/:id",
  protect,
  upload.fields([
    { name: "thumbnailImage", maxCount: 1 },
    { name: "bannerImages", maxCount: 10 },
    { name: "galleryImages", maxCount: 15 },
    { name: "roomImages", maxCount: 15 },
  ]),
  ctrl.updateHolidayPark
);

/* =========================================================
   📋 GET ALL PARKS (ADMIN)
========================================================= */
router.get("/all", protect,  ctrl.getAllHolidayParks);

/* =========================================================
   👤 VENDOR MY PARKS
========================================================= */
router.get("/vendor/my", protect, isVendor, ctrl.vendorMyParks);

/* =========================================================
   🔍 GET SINGLE PARK
========================================================= */
router.get("/single/:id", ctrl.getSingleHolidayPark);

/* =========================================================
   🗑️ DELETE PARK (ADMIN)
========================================================= */
router.delete("/delete/:id", protect,  ctrl.deleteHolidayPark);

/* =========================================================
   🔥 ADMIN APPROVAL SYSTEM
========================================================= */

/* pending list */
router.get("/pending/all", protect,  ctrl.getPendingParks);

/* approved list */
router.get("/approved/all", protect,  ctrl.getApprovedParks);

/* approve */
router.put("/approve/:id", protect,  ctrl.approveHolidayPark);

/* reject */
router.put("/reject/:id", protect,  ctrl.rejectHolidayPark);

module.exports = router;
