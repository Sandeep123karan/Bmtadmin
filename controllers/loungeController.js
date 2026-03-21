const Lounge = require("../models/loungeModel");


// ================= ADD LOUNGE =================
exports.addLounge = async (req, res) => {
  try {
    let images = [];

    if (req.files && req.files.loungeImages) {
      images = req.files.loungeImages.map(file => file.filename);
    }

    const loungeData = {
      ...req.body,
      loungeImages: images,
      status: "pending" // default approval
    };

    const newLounge = await Lounge.create(loungeData);

    res.status(201).json({
      success: true,
      message: "Lounge submitted for approval",
      data: newLounge
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ================= GET ALL (ADMIN) =================
exports.getAllLounge = async (req, res) => {
  try {
    const lounges = await Lounge.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      total: lounges.length,
      data: lounges
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// ================= GET APPROVED (USER SIDE) =================
exports.getApprovedLounge = async (req, res) => {
  try {
    const lounges = await Lounge.find({ status: "approved" })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: lounges.length,
      data: lounges
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// ================= GET SINGLE =================
exports.getSingleLounge = async (req, res) => {
  try {
    const lounge = await Lounge.findById(req.params.id);

    if (!lounge) {
      return res.status(404).json({
        success: false,
        message: "Lounge not found"
      });
    }

    res.json({
      success: true,
      data: lounge
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// ================= UPDATE =================
exports.updateLounge = async (req, res) => {
  try {

    if (req.files && req.files.loungeImages) {
      const images = req.files.loungeImages.map(file => file.filename);
      req.body.loungeImages = images;
    }

    const updated = await Lounge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Lounge not found"
      });
    }

    res.json({
      success: true,
      message: "Lounge updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// ================= DELETE =================
exports.deleteLounge = async (req, res) => {
  try {

    const deleted = await Lounge.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Lounge not found"
      });
    }

    res.json({
      success: true,
      message: "Lounge deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// ================= APPROVE =================
exports.approveLounge = async (req, res) => {
  try {

    const lounge = await Lounge.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
        approvedAt: new Date()
      },
      { new: true }
    );

    if (!lounge) {
      return res.status(404).json({
        success: false,
        message: "Lounge not found"
      });
    }

    res.json({
      success: true,
      message: "Lounge approved successfully",
      data: lounge
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// ================= REJECT =================
exports.rejectLounge = async (req, res) => {
  try {

    const lounge = await Lounge.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected"
      },
      { new: true }
    );

    if (!lounge) {
      return res.status(404).json({
        success: false,
        message: "Lounge not found"
      });
    }

    res.json({
      success: true,
      message: "Lounge rejected",
      data: lounge
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};