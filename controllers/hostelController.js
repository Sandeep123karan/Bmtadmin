const Hostel = require("../models/hostelmodel");

/* =========================================================
   🏨 ADD HOSTEL (CLOUDINARY IMAGES + SAFE JSON)
========================================================= */
exports.addHostel = async (req, res) => {
  try {
    const body = req.body;
    const files = req.files || {};

    /* 🔥 AUTO PROPERTY ID */
    const random = Math.floor(1000 + Math.random() * 9000);
    const propertyId = "HSTL" + random;

    /* ================= HOSTEL IMAGES ================= */
   const hostelImages = files.hostelImages?.map(f => f.path || f.url) || [];
    const receptionImages = files.receptionImages?.map(f => f.path || f.url)
    const roomGallery = files.roomGallery?.map(f => f.path || f.url)
    const washroomImages = files.washroomImages?.map(f => f.path) || [];
    const kitchenImages = files.kitchenImages?.map(f => f.path) || [];

    /* ================= DOCUMENT IMAGES ================= */
    const documents = {
      ownerAadharFront: files.ownerAadharFront?.[0]?.path || "",
      ownerAadharBack: files.ownerAadharBack?.[0]?.path || "",
      ownerPanCard: files.ownerPanCard?.[0]?.path || "",
      gstNumber: body.gstNumber || "",
      gstCertificate: files.gstCertificate?.[0]?.path || "",
      propertyDocument: files.propertyDocument?.[0]?.path || "",
      policeVerification: files.policeVerification?.[0]?.path || "",
      ownerPhoto: files.ownerPhoto?.[0]?.path || "",
      cancelledCheque: files.cancelledCheque?.[0]?.path || "",
      otherDocuments: files.otherDocuments?.map(f => f.path) || [],
    };

    /* ================= SAFE JSON PARSE ================= */
    const parseField = (field) => {
      if (!field) return [];
      if (typeof field === "string") {
        try {
          return JSON.parse(field);
        } catch {
          return [];
        }
      }
      return field;
    };

    const roomTypes = parseField(body.roomTypes);
    const amenities = parseField(body.amenities);
    const rules = parseField(body.rules);

    /* ================= SAVE HOSTEL ================= */
    const hostel = new Hostel({
      ...body,
      propertyId,
      roomTypes,
      amenities,
      rules,
      hostelImages,
      receptionImages,
      roomGallery,
      washroomImages,
      kitchenImages,
      documents,
    });

    await hostel.save();

    res.status(201).json({
      success: true,
      message: "Hostel added successfully, waiting for admin approval",
      hostel,
    });

  } catch (error) {
    console.log("ADD HOSTEL ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error adding hostel",
      error: error.message,
    });
  }
};

/* =========================================================
   📋 GET ALL HOSTELS
========================================================= */
exports.getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      total: hostels.length,
      hostels,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =========================================================
   🔎 GET SINGLE HOSTEL
========================================================= */
exports.getSingleHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
      });
    }

    res.json({
      success: true,
      hostel,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =========================================================
   🗑 DELETE HOSTEL
========================================================= */
exports.deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndDelete(req.params.id);

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
      });
    }

    res.json({
      success: true,
      message: "Hostel deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =========================================================
   ✅ ADMIN APPROVE / REJECT
========================================================= */
exports.updateHostelStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const hostel = await Hostel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
      });
    }

    res.json({
      success: true,
      message: `Hostel ${status} successfully`,
      hostel,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.updateHostel = async (req, res) => {
  try {
    const files = req.files || {};
    let body = { ...req.body };

    /* 🔥 IMPORTANT FIX */
    if (body.roomTypes && typeof body.roomTypes === "string") {
      body.roomTypes = JSON.parse(body.roomTypes);
    }

    if (body.documents && typeof body.documents === "string") {
      body.documents = JSON.parse(body.documents);
    }

    const existing = await Hostel.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found"
      });
    }

    const updateData = {
      ...body,

      hostelImages: files.hostelImages
        ? files.hostelImages.map(f => f.path)
        : existing.hostelImages,

      frontImage: files.frontImage
        ? files.frontImage.map(f => f.path)
        : existing.frontImage,

      receptionImage: files.receptionImage
        ? files.receptionImage.map(f => f.path)
        : existing.receptionImage
    };

    const updated = await Hostel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Hostel updated successfully",
      data: updated
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// exports.updateHostel = async (req, res) => {
//   try {
//     const { id } = req.params;

//     let updateData = { ...req.body };

//     /* =====================
//        HANDLE FILES
//     ====================== */
//     if (req.files) {
//       Object.keys(req.files).forEach((key) => {
//         updateData[key] = req.files[key].map((file) => file.path);
//       });
//     }

//     const updatedHostel = await Hostel.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true }
//     );

//     if (!updatedHostel) {
//       return res.status(404).json({
//         success: false,
//         message: "Hostel not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Hostel updated successfully",
//       data: updatedHostel,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error updating hostel",
//       error: error.message,
//     });
//   }
// };