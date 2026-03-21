const FarmStay = require("../models/farmStayModel");
const slugify = require("slugify");

/* =========================================================
   COMMON FILE HANDLER
========================================================= */
const getFiles = (req, field) => {
  if (!req.files || !req.files[field]) return [];
  return req.files[field].map(file => file.path);
};

/* =========================================================
   ADD FARM STAY (ADMIN + VENDOR)
========================================================= */
exports.addFarmStay = async (req, res) => {
  try {
    const body = req.body;

    // Generate Property ID
    const random = Math.floor(1000 + Math.random() * 9000);
    body.propertyId = "FARM" + random;

    // Slug
    body.slug = slugify(body.farmName || "farm-stay", { lower: true });

    /* ================= IMAGES ================= */
    body.thumbnailImage = req.files?.thumbnailImage?.[0]?.path || "";
    body.bannerImage = req.files?.bannerImage?.[0]?.path || "";
    body.images = getFiles(req, "images");
    body.galleryImages = getFiles(req, "galleryImages");

    /* ================= DOCUMENTS ================= */
    body.documents = {
      idProof: getFiles(req, "idProof"),
      propertyLicense: getFiles(req, "propertyLicense"),
      pollutionCertificate: getFiles(req, "pollutionCertificate"),
      fireSafetyCertificate: getFiles(req, "fireSafetyCertificate"),
      otherDocuments: getFiles(req, "otherDocuments"),
    };

    /* ================= ROLE LOGIC ================= */
    if (req.user.role === "vendor") {
      body.vendorId = req.user.id;
      body.addedBy = "vendor";
      body.status = "pending";
    } else {
      body.addedBy = "admin";
      body.status = "active";
    }

    const data = await FarmStay.create(body);

    res.status(201).json({
      success: true,
      message: "Farm Stay added successfully",
      data,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   UPDATE FARM STAY
========================================================= */
exports.updateFarmStay = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const farm = await FarmStay.findById(id);
    if (!farm) return res.status(404).json({ message: "Not found" });

    if (body.farmName) {
      body.slug = slugify(body.farmName, { lower: true });
    }

    // Image updates
    if (req.files?.thumbnailImage)
      body.thumbnailImage = req.files.thumbnailImage[0].path;

    if (req.files?.bannerImage)
      body.bannerImage = req.files.bannerImage[0].path;

    if (req.files?.images)
      body.images = [...farm.images, ...getFiles(req, "images")];

    if (req.files?.galleryImages)
      body.galleryImages = [...farm.galleryImages, ...getFiles(req, "galleryImages")];

    // Document updates
    body.documents = {
      idProof: [...(farm.documents?.idProof || []), ...getFiles(req, "idProof")],
      propertyLicense: [...(farm.documents?.propertyLicense || []), ...getFiles(req, "propertyLicense")],
      pollutionCertificate: [...(farm.documents?.pollutionCertificate || []), ...getFiles(req, "pollutionCertificate")],
      fireSafetyCertificate: [...(farm.documents?.fireSafetyCertificate || []), ...getFiles(req, "fireSafetyCertificate")],
      otherDocuments: [...(farm.documents?.otherDocuments || []), ...getFiles(req, "otherDocuments")],
    };

    const updated = await FarmStay.findByIdAndUpdate(id, body, { new: true });

    res.json({
      success: true,
      message: "Farm Stay updated",
      data: updated,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   GET ALL (ADMIN)
========================================================= */
exports.getAllFarmStays = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, city, status } = req.query;

    const query = {};

    if (city) query["address.city"] = city;
    if (status) query.status = status;
    if (search) {
      query.$text = { $search: search };
    }

    const data = await FarmStay.find(query)
      .populate("vendorId", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await FarmStay.countDocuments(query);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   GET SINGLE
========================================================= */
exports.getSingleFarmStay = async (req, res) => {
  try {
    const data = await FarmStay.findById(req.params.id)
      .populate("vendorId", "name email phone");

    if (!data) return res.status(404).json({ message: "Not found" });

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   DELETE FARM STAY
========================================================= */
exports.deleteFarmStay = async (req, res) => {
  try {
    await FarmStay.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   APPROVE
========================================================= */
exports.approveFarmStay = async (req, res) => {
  try {
    const data = await FarmStay.findByIdAndUpdate(
      req.params.id,
      { status: "active", documentStatus: "approved", rejectionReason: "" },
      { new: true }
    );
    res.json({ success: true, message: "Approved", data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   REJECT
========================================================= */
exports.rejectFarmStay = async (req, res) => {
  try {
    const { reason } = req.body;

    const data = await FarmStay.findByIdAndUpdate(
      req.params.id,
      { status: "inactive", documentStatus: "rejected", rejectionReason: reason || "Rejected" },
      { new: true }
    );

    res.json({ success: true, message: "Rejected", data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   STATUS UPDATE (FEATURE CONTROL)
========================================================= */
exports.updateStatus = async (req, res) => {
  try {
    const { status, isFeatured, isPopular, isTop } = req.body;

    const data = await FarmStay.findByIdAndUpdate(
      req.params.id,
      { status, isFeatured, isPopular, isTop },
      { new: true }
    );

    res.json({ success: true, message: "Updated", data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   DELETE IMAGE
========================================================= */
exports.deleteImage = async (req, res) => {
  try {
    const { imageUrl, type } = req.body;
    const farm = await FarmStay.findById(req.params.id);
    if (!farm) return res.status(404).json({ message: "Not found" });

    if (type === "images") {
      farm.images = farm.images.filter(img => img !== imageUrl);
    }

    if (type === "gallery") {
      farm.galleryImages = farm.galleryImages.filter(img => img !== imageUrl);
    }

    await farm.save();

    res.json({ success: true, message: "Image deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};