const express = require("express");
const router = express.Router();
const { getLatLng } = require("../controllers/locationController");

router.get("/get-latlng", getLatLng);

module.exports = router;
