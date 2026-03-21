const express = require("express");
const router = express.Router();

const {
  addVacationHouse,
  getAllVacationHouses,
  getSingleVacationHouse,
  updateVacationHouse,
  deleteVacationHouse,
  approveVacationHouse,
  rejectVacationHouse,
  toggleActive,
  toggleFeatured
} = require("../controllers/vacationHouseController");

const { protect, isAdmin } = require("../middleware/authMiddleware");
const cloudUpload = require("../middleware/cloudUpload");

/* =========================================================
   CLOUDINARY MULTER
========================================================= */
const upload = cloudUpload("vacation_houses");

/* =========================================================
   🏡 ADD VACATION HOUSE (ADMIN ONLY)
========================================================= */
router.post(
  "/add",
  protect,
  
  upload.fields([
    { name: "thumbnail", maxCount: 1 },

    // house images
    { name: "frontView", maxCount: 10 },
    { name: "livingRoom", maxCount: 10 },
    { name: "bedRoom", maxCount: 10 },
    { name: "kitchen", maxCount: 10 },
    { name: "washroom", maxCount: 10 },
    { name: "balcony", maxCount: 10 },
    { name: "amenities", maxCount: 10 },
    { name: "surroundings", maxCount: 10 },
    { name: "otherImages", maxCount: 10 },

    // documents
    { name: "propertyDocument", maxCount: 5 },
    { name: "ownerIdProof", maxCount: 5 },
    { name: "addressProof", maxCount: 5 },
    { name: "govtLicense", maxCount: 5 },
    { name: "otherDocuments", maxCount: 5 },
  ]),
  addVacationHouse
);

/* =========================================================
   📋 GET ALL
========================================================= */
router.get("/", getAllVacationHouses);

/* =========================================================
   🔍 GET SINGLE
========================================================= */
router.get("/:id", getSingleVacationHouse);

/* =========================================================
   ✏ UPDATE (ADMIN)
========================================================= */
router.put(
  "/update/:id",
  protect,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "frontView", maxCount: 10 },
    { name: "livingRoom", maxCount: 10 },
    { name: "bedRoom", maxCount: 10 },
    { name: "kitchen", maxCount: 10 },
    { name: "washroom", maxCount: 10 },
    { name: "balcony", maxCount: 10 },
    { name: "amenities", maxCount: 10 },
    { name: "surroundings", maxCount: 10 },
    { name: "otherImages", maxCount: 10 },

    { name: "propertyDocument", maxCount: 5 },
    { name: "ownerIdProof", maxCount: 5 },
    { name: "addressProof", maxCount: 5 },
    { name: "govtLicense", maxCount: 5 },
    { name: "otherDocuments", maxCount: 5 },
  ]),
  updateVacationHouse
);

/* =========================================================
   ❌ DELETE
========================================================= */
router.delete("/delete/:id", protect, isAdmin, deleteVacationHouse);

/* =========================================================
   ✅ APPROVE
========================================================= */
router.put("/approve/:id", protect, isAdmin, approveVacationHouse);

/* =========================================================
   ❌ REJECT
========================================================= */
router.put("/reject/:id", protect, isAdmin, rejectVacationHouse);

/* =========================================================
   🔥 ACTIVE / INACTIVE
========================================================= */
router.put("/toggle-active/:id", protect, isAdmin, toggleActive);

/* =========================================================
   ⭐ FEATURE PROPERTY
========================================================= */
router.put("/toggle-featured/:id", protect, isAdmin, toggleFeatured);

module.exports = router;