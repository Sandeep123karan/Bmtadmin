const express = require("express");
const router = express.Router();

const {
  addFarmStay,
  updateFarmStay,
  getAllFarmStays,
  getSingleFarmStay,
  deleteFarmStay,
  approveFarmStay,
  rejectFarmStay,
  updateStatus,
  deleteImage
} = require("../controllers/farmStayController");

const cloudUpload = require("../middleware/cloudUpload");
const { protect, isAdmin, isVendor } = require("../middleware/authMiddleware");

/* =========================================================
   CLOUDINARY UPLOAD CONFIG
========================================================= */
const upload = cloudUpload("farmstays");

/* =========================================================
   ADD FARM STAY (ADMIN + VENDOR)
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
    { name: "propertyLicense", maxCount: 5 },
    { name: "pollutionCertificate", maxCount: 5 },
    { name: "fireSafetyCertificate", maxCount: 5 },
    { name: "otherDocuments", maxCount: 5 }
  ]),
  addFarmStay
);

/* =========================================================
   UPDATE FARM STAY
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
    { name: "propertyLicense", maxCount: 5 },
    { name: "pollutionCertificate", maxCount: 5 },
    { name: "fireSafetyCertificate", maxCount: 5 },
    { name: "otherDocuments", maxCount: 5 }
  ]),
  updateFarmStay
);

/* =========================================================
   GET ALL (ADMIN PANEL)
========================================================= */
router.get("/all", protect, isAdmin, getAllFarmStays);

/* =========================================================
   GET SINGLE
========================================================= */
router.get("/single/:id", getSingleFarmStay);

/* =========================================================
   DELETE (ADMIN)
========================================================= */
router.delete("/delete/:id", protect, isAdmin, deleteFarmStay);

/* =========================================================
   APPROVE (ADMIN)
========================================================= */
router.put("/approve/:id", protect, isAdmin, approveFarmStay);

/* =========================================================
   REJECT (ADMIN)
========================================================= */
router.put("/reject/:id", protect, isAdmin, rejectFarmStay);

/* =========================================================
   STATUS / FEATURE UPDATE
========================================================= */
router.put("/status/:id", protect, isAdmin, updateStatus);

/* =========================================================
   DELETE IMAGE
========================================================= */
router.put("/delete-image/:id", protect, deleteImage);

module.exports = router;