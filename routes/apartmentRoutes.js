const express = require("express");
const router = express.Router();
const multer = require("multer");

const controller = require("../controllers/apartmentController");

/* MULTER */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

/* ADD */
router.post(
  "/add",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 }
  ]),
  controller.addApartment
);

/* ADMIN */
router.get("/admin/all", controller.getAllApartmentAdmin);
router.put("/approve/:id", controller.approveApartment);
router.put("/reject/:id", controller.rejectApartment);
router.delete("/delete/:id", controller.deleteApartment);
router.put("/update/:id", controller.updateApartment);

/* USER */
router.get("/approved", controller.getApprovedApartment);

module.exports = router;