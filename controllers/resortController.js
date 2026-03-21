const Resort = require("../models/Resort");

/* ADD RESORT */
exports.addResort = async (req, res) => {
  try {
    const last = await Resort.findOne().sort({ createdAt: -1 });
    let newId = "RST1001";

    if (last && last.resortId) {
      const num = parseInt(last.resortId.replace("RST", ""));
      newId = "RST" + (num + 1);
    }

    const images = req.files?.images?.map(f => f.filename) || [];
    const mainImage = req.files?.mainImage?.[0]?.filename || "";

    const resort = new Resort({
      resortId: newId,
      ...req.body,
      mainImage,
      images,
    });

    await resort.save();

    res.json({
      success: true,
      message: "Resort added successfully",
      resort,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL */
exports.getAllResorts = async (req, res) => {
  try {
    const data = await Resort.find().sort({ createdAt: -1 });
    res.json({ success: true, resorts: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET SINGLE */
exports.getSingleResort = async (req, res) => {
  try {
    const resort = await Resort.findById(req.params.id);
    res.json(resort);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
exports.updateResort = async (req, res) => {
  try {
    const resort = await Resort.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, message: "Updated", resort });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
exports.deleteResort = async (req, res) => {
  try {
    await Resort.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* APPROVE */
exports.approveResort = async (req, res) => {
  try {
    const resort = await Resort.findByIdAndUpdate(
      req.params.id,
      {
        approvalStatus: "approved",
        approvedBy: "admin",
        approvedAt: new Date(),
      },
      { new: true }
    );

    res.json({ success: true, message: "Approved", resort });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* REJECT */
exports.rejectResort = async (req, res) => {
  try {
    const resort = await Resort.findByIdAndUpdate(
      req.params.id,
      {
        approvalStatus: "rejected",
        rejectedReason: req.body.reason,
      },
      { new: true }
    );

    res.json({ success: true, message: "Rejected", resort });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};