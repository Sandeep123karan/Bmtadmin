const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  addLounge,
  getAllLounge,
  getApprovedLounge,
  getSingleLounge,
  updateLounge,
  deleteLounge,
  approveLounge,
  rejectLounge
} = require("../controllers/loungeController");


// ===== Multer Setup =====
const storage = multer.diskStorage({
  destination: "uploads/lounge",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


// ===== Routes =====
router.post("/add", upload.fields([{ name: "loungeImages", maxCount: 10 }]), addLounge);

router.get("/all", getAllLounge);
router.get("/approved", getApprovedLounge);
router.get("/:id", getSingleLounge);

router.put("/update/:id", upload.fields([{ name: "loungeImages", maxCount: 10 }]), updateLounge);

router.delete("/delete/:id", deleteLounge);

router.put("/approve/:id", approveLounge);
router.put("/reject/:id", rejectLounge);

module.exports = router;