



const Campsite = require("../models/campsiteModel");
const slugify = require("slugify");

/* =========================================================
   COMMON IMAGE GET
========================================================= */
const getFiles = (req, field) => {
  if (!req.files || !req.files[field]) return [];
  return req.files[field].map(file => file.path);
};

/* =========================================================
   ADD CAMPSITE
========================================================= */
const addCampsite = async (req, res) => {
  try {
    const body = req.body;

    // propertyId
    const random = Math.floor(1000 + Math.random() * 9000);
    body.propertyId = "CAMP" + random;

    // slug
    body.slug = slugify(body.campsiteName || "campsite", { lower: true });

    // images
    body.thumbnailImage = req.files?.thumbnailImage?.[0]?.path || "";
    body.bannerImage = req.files?.bannerImage?.[0]?.path || "";
    body.images = getFiles(req, "images");
    body.galleryImages = getFiles(req, "galleryImages");

    // documents
    body.documents = {
      idProof: getFiles(req, "idProof"),
      campsiteLicense: getFiles(req, "campsiteLicense"),
      pollutionCertificate: getFiles(req, "pollutionCertificate"),
      fireSafetyCertificate: getFiles(req, "fireSafetyCertificate"),
      otherDocuments: getFiles(req, "otherDocuments"),
    };

    // vendor/admin
    if (req.user?.role === "vendor") {
      body.vendorId = req.user.id;
      body.addedBy = "vendor";
      body.status = "pending";
    } else {
      body.addedBy = "admin";
      body.status = "active";
    }

    const data = await Campsite.create(body);

    res.status(201).json({
      success: true,
      message: "Campsite added",
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   UPDATE CAMPSITE
========================================================= */
const updateCampsite = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const campsite = await Campsite.findById(id);
    if (!campsite) return res.status(404).json({ message: "Not found" });

    if (body.campsiteName) {
      body.slug = slugify(body.campsiteName, { lower: true });
    }

    // images update
    if (req.files?.thumbnailImage)
      body.thumbnailImage = req.files.thumbnailImage[0].path;

    if (req.files?.bannerImage)
      body.bannerImage = req.files.bannerImage[0].path;

    if (req.files?.images)
      body.images = [...campsite.images, ...getFiles(req, "images")];

    if (req.files?.galleryImages)
      body.galleryImages = [...campsite.galleryImages, ...getFiles(req, "galleryImages")];

    // documents update
    body.documents = {
      idProof: [...(campsite.documents?.idProof || []), ...getFiles(req, "idProof")],
      campsiteLicense: [...(campsite.documents?.campsiteLicense || []), ...getFiles(req, "campsiteLicense")],
      pollutionCertificate: [...(campsite.documents?.pollutionCertificate || []), ...getFiles(req, "pollutionCertificate")],
      fireSafetyCertificate: [...(campsite.documents?.fireSafetyCertificate || []), ...getFiles(req, "fireSafetyCertificate")],
      otherDocuments: [...(campsite.documents?.otherDocuments || []), ...getFiles(req, "otherDocuments")],
    };

    const updated = await Campsite.findByIdAndUpdate(id, body, { new: true });

    res.json({ success: true, message: "Updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   GET ALL
========================================================= */
const getAllCampsites = async (req, res) => {
  try {
    const data = await Campsite.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   GET SINGLE
========================================================= */
const getSingleCampsite = async (req, res) => {
  try {
    const data = await Campsite.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   DELETE
========================================================= */
const deleteCampsite = async (req, res) => {
  try {
    await Campsite.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   APPROVE
========================================================= */
const approveCampsite = async (req, res) => {
  try {
    const data = await Campsite.findByIdAndUpdate(
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
const rejectCampsite = async (req, res) => {
  try {
    const { reason } = req.body;

    const data = await Campsite.findByIdAndUpdate(
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
   STATUS UPDATE
========================================================= */
const updateStatus = async (req, res) => {
  try {
    const { status, isFeatured, isPopular, isTop } = req.body;

    const data = await Campsite.findByIdAndUpdate(
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
const deleteImage = async (req, res) => {
  try {
    const { imageUrl, type } = req.body;
    const campsite = await Campsite.findById(req.params.id);

    if (!campsite) return res.status(404).json({ message: "Not found" });

    if (type === "images") {
      campsite.images = campsite.images.filter(img => img !== imageUrl);
    }
    if (type === "gallery") {
      campsite.galleryImages = campsite.galleryImages.filter(img => img !== imageUrl);
    }

    await campsite.save();

    res.json({ success: true, message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   EXPORT ALL
========================================================= */
module.exports = {
  addCampsite,
  updateCampsite,
  getAllCampsites,
  getSingleCampsite,
  deleteCampsite,
  approveCampsite,
  rejectCampsite,
  updateStatus,
  deleteImage
};