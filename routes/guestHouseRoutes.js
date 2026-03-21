const express = require("express");
const router = express.Router();

const {
  addGuestHouse,
  getAllGuestHouses,
  getSingleGuestHouse,
  updateGuestHouse,
  deleteGuestHouse,
  updateStatus,
  verifyOwner,
} = require("../controllers/guestHouseController");

/* ================= CRUD ================= */
router.post("/add", addGuestHouse);
router.get("/all", getAllGuestHouses);
router.get("/:id", getSingleGuestHouse);
router.put("/update/:id", updateGuestHouse);
router.delete("/delete/:id", deleteGuestHouse);

/* ================= ADMIN ================= */
router.put("/status/:id", updateStatus);
router.put("/verify-owner/:id", verifyOwner);

module.exports = router;