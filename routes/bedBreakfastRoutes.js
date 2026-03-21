const express = require("express");
const router = express.Router();

const cloudUpload = require("../middleware/cloudUpload");
const {
  createBedBreakfast,
  getAllBedBreakfast,
  getSingleBedBreakfast,
  updateBedBreakfast,
  deleteBedBreakfast,
  getPendingBNB,
  getApprovedBNB,
  approveRejectBNB
} = require("../controllers/bedBreakfastController");

/* ======================================================
   CREATE BNB (WITH IMAGES)
====================================================== */
router.post(
  "/add",
  cloudUpload("bnb").fields([
    { name: "propertyImages", maxCount: 10 },
    { name: "frontImage", maxCount: 5 },
    { name: "receptionImage", maxCount: 5 },

    { name: "ownerPhoto", maxCount: 2 },
    { name: "aadharFront", maxCount: 2 },
    { name: "aadharBack", maxCount: 2 },
    { name: "panCard", maxCount: 2 },
    { name: "gstCertificate", maxCount: 2 },
    { name: "propertyProof", maxCount: 5 },
    { name: "passbook", maxCount: 2 },
    { name: "cancelledCheque", maxCount: 2 },
    { name: "license", maxCount: 2 },
    { name: "otherDocuments", maxCount: 5 }
  ]),
  createBedBreakfast
);

/* ======================================================
   GET ALL BNB
====================================================== */
router.get("/", getAllBedBreakfast);

/* ======================================================
   GET APPROVED BNB (website)
====================================================== */
router.get("/approved/all", getApprovedBNB);

/* ======================================================
   GET PENDING (admin panel)
====================================================== */
router.get("/pending/all", getPendingBNB);

/* ======================================================
   GET SINGLE BNB
====================================================== */
router.get("/:id", getSingleBedBreakfast);

/* ======================================================
   UPDATE BNB WITH IMAGE
====================================================== */
router.put(
  "/update/:id",
  cloudUpload("bnb").fields([
    { name: "propertyImages", maxCount: 10 },
    { name: "frontImage", maxCount: 5 },
    { name: "receptionImage", maxCount: 5 },

    { name: "ownerPhoto", maxCount: 2 },
    { name: "aadharFront", maxCount: 2 },
    { name: "aadharBack", maxCount: 2 },
    { name: "panCard", maxCount: 2 },
    { name: "gstCertificate", maxCount: 2 },
    { name: "propertyProof", maxCount: 5 },
    { name: "passbook", maxCount: 2 },
    { name: "cancelledCheque", maxCount: 2 },
    { name: "license", maxCount: 2 },
    { name: "otherDocuments", maxCount: 5 }
  ]),
  updateBedBreakfast
);

/* ======================================================
   DELETE
====================================================== */
router.delete("/delete/:id", deleteBedBreakfast);

/* ======================================================
   ADMIN APPROVE / REJECT
====================================================== */
router.put("/approve/:id", approveRejectBNB);

module.exports = router;