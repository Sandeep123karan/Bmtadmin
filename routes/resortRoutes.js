const express = require("express");
const router = express.Router();
const resortController = require("../controllers/resortController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const multiUpload = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "images", maxCount: 20 },
]);

router.post("/add", multiUpload, resortController.addResort);
router.get("/all", resortController.getAllResorts);
router.get("/:id", resortController.getSingleResort);
router.put("/update/:id", resortController.updateResort);
router.delete("/delete/:id", resortController.deleteResort);

router.put("/approve/:id", resortController.approveResort);
router.put("/reject/:id", resortController.rejectResort);

module.exports = router;