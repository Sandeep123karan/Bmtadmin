


const LoveHotel = require("../models/lovehotelModel");
const slugify = require("slugify");

/* =========================================================
   ADD LOVE HOTEL (Vendor)
========================================================= */
exports.addLoveHotel = async (req, res) => {
  try {
    const body = req.body;

    const propertyId = "LOVE" + Date.now();

    const slug = slugify(body.propertyName || "love-hotel", {
      lower: true,
      strict: true,
    });

    const hotel = new LoveHotel({
      ...body,
      propertyId,
      slug,
      addedBy: req.user.id,
      isApproved: true, // admin approval required
      isActive: true,
    });

    await hotel.save();

    res.status(201).json({
      success: true,
      message: "Hotel added successfully. Waiting for admin approval.",
      data: hotel,
    });

  } catch (error) {
    console.error("ADD HOTEL ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =========================================================
   UPDATE HOTEL
========================================================= */
exports.updateLoveHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await LoveHotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // vendor can update only own hotel
    if (
      req.user.role === "vendor" &&
      hotel.addedBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await LoveHotel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Hotel updated successfully",
      data: updated,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================================================
   DELETE HOTEL
========================================================= */
exports.deleteLoveHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await LoveHotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    await LoveHotel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Hotel deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================================================
   GET ALL (Public - Approved Only)
========================================================= */
exports.getAllLoveHotel = async (req, res) => {
  try {
    const hotels = await LoveHotel.find({
      isApproved: false,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      total: hotels.length,
      data: hotels,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================================================
   GET SINGLE
========================================================= */
exports.getSingleLoveHotel = async (req, res) => {
  try {
    const hotel = await LoveHotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json({
      success: true,
      data: hotel,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================================================
   ADMIN APPROVE
========================================================= */
exports.approveLoveHotel = async (req, res) => {
  try {
    const hotel = await LoveHotel.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json({
      success: true,
      message: "Hotel approved successfully",
      data: hotel,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================================================
   ADMIN REJECT
========================================================= */
exports.rejectLoveHotel = async (req, res) => {
  try {
    const hotel = await LoveHotel.findByIdAndUpdate(
      req.params.id,
      { isApproved: false, isActive: false },
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json({
      success: true,
      message: "Hotel rejected",
      data: hotel,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================================================
   ADMIN ALL
========================================================= */
exports.getAllAdminHotels = async (req, res) => {
  try {
    const hotels = await LoveHotel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      total: hotels.length,
      data: hotels,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================================================
   ADMIN PENDING
========================================================= */
exports.getPendingHotels = async (req, res) => {
  try {
    const hotels = await LoveHotel.find({ isApproved: false });

    res.json({
      success: true,
      total: hotels.length,
      data: hotels,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};