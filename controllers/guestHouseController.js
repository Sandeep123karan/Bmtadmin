const GuestHouse = require("../models/guestHouseModel");

/* ================= ADD GUEST HOUSE ================= */
exports.addGuestHouse = async (req, res) => {
  try {
    const data = req.body;

    const guestHouse = new GuestHouse(data);
    await guestHouse.save();

    res.status(201).json({
      success: true,
      message: "Guest House added successfully",
      data: guestHouse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding guest house",
      error: error.message,
    });
  }
};

/* ================= GET ALL ================= */
exports.getAllGuestHouses = async (req, res) => {
  try {
    const data = await GuestHouse.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      total: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching guest houses",
      error: error.message,
    });
  }
};

/* ================= GET SINGLE ================= */
exports.getSingleGuestHouse = async (req, res) => {
  try {
    const data = await GuestHouse.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Guest house not found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching guest house",
      error: error.message,
    });
  }
};

/* ================= UPDATE ================= */
exports.updateGuestHouse = async (req, res) => {
  try {
    const updated = await GuestHouse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Guest House updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: error.message,
    });
  }
};

/* ================= DELETE ================= */
exports.deleteGuestHouse = async (req, res) => {
  try {
    await GuestHouse.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Guest House deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message,
    });
  }
};

/* ================= STATUS UPDATE ================= */
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await GuestHouse.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      message: "Status updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Status update failed",
      error: error.message,
    });
  }
};

/* ================= VERIFY OWNER DOC ================= */
exports.verifyOwner = async (req, res) => {
  try {
    const { verificationStatus, verifiedBy } = req.body;

    const updated = await GuestHouse.findByIdAndUpdate(
      req.params.id,
      {
        "ownerDocuments.verificationStatus": verificationStatus,
        "ownerDocuments.verifiedBy": verifiedBy,
        "ownerDocuments.verificationDate": new Date(),
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Owner verification updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Verification failed",
      error: error.message,
    });
  }
};