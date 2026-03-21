const express = require("express");
const router = express.Router();

const {
  addCampsite,
  updateCampsite,
  getAllCampsites,
  getSingleCampsite,
  deleteCampsite,
  updateStatus,
  approveCampsite,
  rejectCampsite,
  deleteImage
} = require("../controllers/campsiteController");

const cloudUpload = require("../middleware/cloudUpload");
const { protect, isAdmin, isVendor } = require("../middleware/authMiddleware");

/* =========================================================
   📸 CLOUDINARY UPLOAD CONFIG
========================================================= */
const upload = cloudUpload("campsites");

/* =========================================================
   🏕️ ADD CAMPSITE (ADMIN + VENDOR)
========================================================= */
router.post(
  "/add",
  protect,
  upload.fields([
    { name: "thumbnailImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
    { name: "images", maxCount: 20 },
    { name: "galleryImages", maxCount: 20 },
    { name: "idProof", maxCount: 5 },
    { name: "campsiteLicense", maxCount: 5 },
    { name: "pollutionCertificate", maxCount: 5 },
    { name: "fireSafetyCertificate", maxCount: 5 },
    { name: "otherDocuments", maxCount: 5 }
  ]),
  addCampsite
);

/* =========================================================
   ✏️ UPDATE CAMPSITE
========================================================= */
router.put(
  "/update/:id",
  protect,
  upload.fields([
    { name: "thumbnailImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
    { name: "images", maxCount: 20 },
    { name: "galleryImages", maxCount: 20 },
    { name: "idProof", maxCount: 5 },
    { name: "campsiteLicense", maxCount: 5 },
    { name: "pollutionCertificate", maxCount: 5 },
    { name: "fireSafetyCertificate", maxCount: 5 },
    { name: "otherDocuments", maxCount: 5 }
  ]),
  updateCampsite
);

/* =========================================================
   📋 GET ALL CAMPSITES (ADMIN)
========================================================= */
router.get("/all", protect, isAdmin, getAllCampsites);

/* =========================================================
   🔍 GET SINGLE CAMPSITE
========================================================= */
router.get("/single/:id", getSingleCampsite);

/* =========================================================
   ❌ DELETE CAMPSITE (ADMIN)
========================================================= */
router.delete("/delete/:id", protect, isAdmin, deleteCampsite);

/* =========================================================
   ✅ APPROVE CAMPSITE (ADMIN)
========================================================= */
router.put("/approve/:id", protect, isAdmin, approveCampsite);

/* =========================================================
   ❌ REJECT CAMPSITE (ADMIN)
========================================================= */
router.put("/reject/:id", protect, isAdmin, rejectCampsite);

/* =========================================================
   ⭐ STATUS / FEATURE UPDATE
========================================================= */
router.put("/status/:id", protect, isAdmin, updateStatus);

/* =========================================================
   🖼️ DELETE IMAGE (GALLERY / DOCS)
========================================================= */
router.put("/delete-image/:id", protect, deleteImage);

module.exports = router;