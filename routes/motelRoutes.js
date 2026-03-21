const express = require("express");
const router = express.Router();

const motelController = require("../controllers/motelController");

// 🔥 IMPORTANT: correct path
const cloudUpload = require("../middleware/cloudUpload");


/* =====================================================
   MULTI IMAGE + DOCUMENT UPLOAD (Cloudinary)
===================================================== */
const motelUpload = cloudUpload("motel").fields([
  { name: "thumbnailImage", maxCount: 1 },
  { name: "propertyImages", maxCount: 20 },
  { name: "receptionImages", maxCount: 20 },
  { name: "roomImages", maxCount: 30 },

  { name: "gstImages", maxCount: 5 },
  { name: "panImages", maxCount: 5 },
  { name: "ownerImages", maxCount: 5 },
  { name: "tradeImages", maxCount: 5 },
  { name: "chequeImages", maxCount: 5 },
  { name: "otherDocs", maxCount: 10 }
]);


/* =====================================================
   ADD MOTEL
===================================================== */
router.post("/add-motel", motelUpload, motelController.addMotel);


/* =====================================================
   GET ALL MOTELS (ADMIN)
===================================================== */
router.get("/all-motels", motelController.getAllMotels);


/* =====================================================
   GET SINGLE MOTEL
===================================================== */
router.get("/single-motel/:id", motelController.getSingleMotel);


/* =====================================================
   UPDATE MOTEL
===================================================== */
router.put("/update-motel/:id", motelUpload, motelController.updateMotel);


/* =====================================================
   DELETE MOTEL
===================================================== */
router.delete("/delete-motel/:id", motelController.deleteMotel);


/* =====================================================
   ADMIN APPROVE / REJECT
===================================================== */
router.put("/approve-motel/:id", motelController.approveMotel);
router.put("/reject-motel/:id", motelController.rejectMotel);


module.exports = router;