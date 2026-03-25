

const express = require("express");
const router = express.Router();

const hostelController = require("../controllers/hostelController");
const cloudUpload = require("../middleware/cloudUpload");

const upload = cloudUpload("hostel"); // cloudinary folder name

/* ==========================================
   🏨 ADD HOSTEL WITH CLOUDINARY
========================================== */
router.post(
  "/add",
  upload.fields([
    { name: "hostelImages", maxCount: 20 },
    { name: "receptionImages", maxCount: 10 },
    { name: "roomGallery", maxCount: 20 },
    { name: "washroomImages", maxCount: 10 },
    { name: "kitchenImages", maxCount: 10 },

    /* DOCUMENTS */
    { name: "ownerAadharFront", maxCount: 1 },
    { name: "ownerAadharBack", maxCount: 1 },
    { name: "ownerPanCard", maxCount: 1 },
    { name: "gstCertificate", maxCount: 1 },
    { name: "propertyDocument", maxCount: 1 },
    { name: "policeVerification", maxCount: 1 },
    { name: "ownerPhoto", maxCount: 1 },
    { name: "cancelledCheque", maxCount: 1 },
    { name: "otherDocuments", maxCount: 10 },
  ]),
  hostelController.addHostel
);

/* ==========================================
   ✏️ UPDATE HOSTEL
========================================== */
router.put(
  "/update/:id",
  upload.fields([
    { name: "hostelImages", maxCount: 20 },
    { name: "receptionImages", maxCount: 10 },
    { name: "roomGallery", maxCount: 20 },
    { name: "washroomImages", maxCount: 10 },
    { name: "kitchenImages", maxCount: 10 },

    /* DOCUMENTS */
    { name: "ownerAadharFront", maxCount: 1 },
    { name: "ownerAadharBack", maxCount: 1 },
    { name: "ownerPanCard", maxCount: 1 },
    { name: "gstCertificate", maxCount: 1 },
    { name: "propertyDocument", maxCount: 1 },
    { name: "policeVerification", maxCount: 1 },
    { name: "ownerPhoto", maxCount: 1 },
    { name: "cancelledCheque", maxCount: 1 },
    { name: "otherDocuments", maxCount: 10 },
  ]),
  hostelController.updateHostel
);

/* GET ALL */
router.get("/all", hostelController.getAllHostels);

/* SINGLE */
router.get("/:id", hostelController.getSingleHostel);

/* DELETE */
router.delete("/delete/:id", hostelController.deleteHostel);

/* APPROVE */
router.put("/status/:id", hostelController.updateHostelStatus);

module.exports = router;