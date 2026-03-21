const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  addBus,
  getAllBusAdmin,
  approveBus,
  rejectBus,
  deleteBus,
  searchBus,
  getVendorBus,
  updateLiveLocation,
  getLiveLocation,
  updateBus   // ⭐ ADD THIS
} = require("../controllers/busController");

/* MULTER */
const storage = multer.diskStorage({
  destination: (req,file,cb)=> cb(null,"uploads/"),
  filename: (req,file,cb)=> cb(null,Date.now()+"-"+file.originalname)
});
const upload = multer({storage});

/* ADD BUS */
router.post("/add", upload.array("busImages",10), addBus);

/* ADMIN ALL BUS */
router.get("/admin/all", getAllBusAdmin);

/* VENDOR BUS */
router.get("/vendor/:vendorId", getVendorBus);

/* APPROVE / REJECT */
router.put("/approve/:id", approveBus);
router.put("/reject/:id", rejectBus);

/* UPDATE BUS ⭐ */
router.put("/update/:id", upload.array("busImages",10), updateBus);

/* DELETE */
router.delete("/delete/:id", deleteBus);

/* USER SEARCH */
router.get("/search", searchBus);

/* LIVE TRACK */
router.post("/live/update", updateLiveLocation);
router.get("/live/:id", getLiveLocation);

module.exports = router;
