const Apartment = require("../models/apartmentModel");

/* ================= HELPER ================= */
const parseArray = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === "string") return field.split(",");
  return [];
};

/* =====================================================
   ADD APARTMENT
===================================================== */
exports.addApartment = async (req, res) => {
  try {
    const data = req.body;

    const amenities = parseArray(data.amenities);

    /* IMAGES */
    let thumbnail = "";
    let gallery = [];

    if (req.files) {
      if (req.files.thumbnail)
        thumbnail = req.files.thumbnail[0].filename;

      if (req.files.gallery)
        gallery = req.files.gallery.map(f => f.filename);
    }

    const apartment = new Apartment({
      ...data,
      amenities,
      thumbnail,
      gallery,
      status: data.addedBy === "admin" ? "approved" : "pending"
    });

    await apartment.save();

    res.json({
      success: true,
      message: "Apartment added successfully",
      apartment
    });

  } catch (err) {
    console.log("❌ ADD APARTMENT ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =====================================================
   GET ALL (ADMIN)
===================================================== */
exports.getAllApartmentAdmin = async (req, res) => {
  try {
    const data = await Apartment.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   GET APPROVED (USER)
===================================================== */
exports.getApprovedApartment = async (req, res) => {
  try {
    const data = await Apartment.find({ status: "approved" });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   APPROVE
===================================================== */
exports.approveApartment = async (req, res) => {
  try {
    const data = await Apartment.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json({ success: true, message: "Approved", data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   REJECT
===================================================== */
exports.rejectApartment = async (req, res) => {
  try {
    const data = await Apartment.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    res.json({ success: true, message: "Rejected", data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   DELETE
===================================================== */
exports.deleteApartment = async (req, res) => {
  try {
    await Apartment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   UPDATE
===================================================== */
exports.updateApartment = async (req, res) => {
  try {
    const data = await Apartment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, message: "Updated", data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};