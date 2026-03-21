const express = require("express");
const router = express.Router();

const loveHotelCtrl = require("../controllers/loveHotelController");
const { protect, isAdmin, isVendor } = require("../middleware/authMiddleware");
const cloudUpload = require("../middleware/cloudUpload");

const upload = cloudUpload("lovehotels");

/* ================= VENDOR ================= */

/* ADD HOTEL */
router.post(
  "/add",
  protect,
  
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "gallery", maxCount: 20 },
  ]),
  loveHotelCtrl.addLoveHotel
);

/* UPDATE HOTEL */
router.put(
  "/update/:id",
  protect,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "gallery", maxCount: 20 },
  ]),
  loveHotelCtrl.updateLoveHotel
);

/* DELETE */
router.delete("/delete/:id", protect, loveHotelCtrl.deleteLoveHotel);


/* ================= ADMIN ================= */

/* APPROVE */
router.put("/approve/:id", protect, isAdmin, loveHotelCtrl.approveLoveHotel);

/* REJECT */
router.put("/reject/:id", protect, isAdmin, loveHotelCtrl.rejectLoveHotel);
router.get("/admin/pending", protect, isAdmin, loveHotelCtrl.getPendingHotels);


/* ================= PUBLIC ================= */

router.get("/all", loveHotelCtrl.getAllLoveHotel);
router.get("/single/:id", loveHotelCtrl.getSingleLoveHotel);

module.exports = router;