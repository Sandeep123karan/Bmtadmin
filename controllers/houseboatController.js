const HouseBoat = require("../models/houseboatModel");

/* ================= ADD HOUSEBOAT ================= */
exports.addHouseboat = async (req, res) => {
  try {
    const data = req.body;

    // cloudinary files
    const files = req.files;

    const coverImage = files?.coverImage?.[0]?.path || "";

    const houseboatImages =
      files?.houseboatImages?.map(file => file.path) || [];

    const interiorImages =
      files?.interiorImages?.map(file => file.path) || [];

    const exteriorImages =
      files?.exteriorImages?.map(file => file.path) || [];

    const videos =
      files?.houseboatVideos?.map(file => file.path) || [];

    const newHouseboat = new HouseBoat({
      ...data,
      coverImage,
      houseboatImages,
      interiorImages,
      exteriorImages,
      houseboatVideos: videos
    });

    await newHouseboat.save();

    res.status(201).json({
      success: true,
      message: "Houseboat added successfully",
      data: newHouseboat
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};


/* ================= GET ALL ================= */
exports.getAllHouseboats = async (req, res) => {
  try {
    const data = await HouseBoat.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      total: data.length,
      data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ================= GET SINGLE ================= */
exports.getSingleHouseboat = async (req, res) => {
  try {
    const data = await HouseBoat.findById(req.params.id);

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ================= UPDATE HOUSEBOAT ================= */
exports.updateHouseboat = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updated = await HouseBoat.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    res.json({
      success: true,
      message: "Houseboat updated",
      data: updated
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ================= DELETE ================= */
exports.deleteHouseboat = async (req, res) => {
  try {
    await HouseBoat.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Houseboat deleted"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ================= ADMIN APPROVE ================= */
exports.approveHouseboat = async (req, res) => {
  try {
    const data = await HouseBoat.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json({
      success: true,
      message: "Houseboat approved",
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ================= ADMIN REJECT ================= */
exports.rejectHouseboat = async (req, res) => {
  try {
    const { reason } = req.body;

    const data = await HouseBoat.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", rejectReason: reason },
      { new: true }
    );

    res.json({
      success: true,
      message: "Houseboat rejected",
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};