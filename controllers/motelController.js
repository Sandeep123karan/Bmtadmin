


const Motel = require("../models/Motel");

/* =========================================================
   HELPER FOR CLOUDINARY FILE URL
========================================================= */
const getFiles = (req, field) => {
  if (!req.files || !req.files[field]) return [];
  return req.files[field].map(file => file.path); // 🔥 IMPORTANT: path use karo
};

/* =========================================================
   ADD MOTEL
========================================================= */
exports.addMotel = async (req, res) => {
  try {
    const body = req.body;

    /* ================= IMAGES ================= */
    const thumbnailImage = req.files?.thumbnailImage?.[0]?.path || "";

    const propertyImages = getFiles(req, "propertyImages");
    const receptionImages = getFiles(req, "receptionImages");
    const roomImages = getFiles(req, "roomImages");

    /* ================= DOCUMENTS ================= */
    const documents = {
      gstCertificate: {
        documentNumber: body.gstNumber || "",
        images: getFiles(req, "gstImages")
      },
      panCard: {
        documentNumber: body.panNumber || "",
        images: getFiles(req, "panImages")
      },
      ownerIdProof: {
        documentNumber: body.ownerIdNumber || "",
        images: getFiles(req, "ownerImages")
      },
      tradeLicense: {
        documentNumber: body.tradeNumber || "",
        images: getFiles(req, "tradeImages")
      },
      cancelledCheque: {
        images: getFiles(req, "chequeImages")
      },
      otherDocuments: [
        {
          documentName: "Other",
          images: getFiles(req, "otherDocs")
        }
      ]
    };

    /* ================= CREATE ================= */
    const motel = await Motel.create({
      motelName: body.motelName,
      propertyId: "MOTEL" + Date.now(),
      description: body.description,

      address: {
        street: body.street,
        area: body.area,
        landmark: body.landmark,
        city: body.city,
        state: body.state,
        pincode: body.pincode
      },

      location: {
        latitude: body.latitude,
        longitude: body.longitude
      },

      contactPerson: body.contactPerson,
      phone: body.phone,
      email: body.email,
      website: body.website,

      thumbnailImage,
      propertyImages,
      receptionImages,
      roomImages,

      documents,

      totalRooms: body.totalRooms,
      totalFloors: body.totalFloors,
      buildYear: body.buildYear,

      amenities: body.amenities ? body.amenities.split(",") : [],

      basePrice: body.basePrice,
      weekendPrice: body.weekendPrice,
      taxPercentage: body.taxPercentage,
      discountPercentage: body.discountPercentage,

      
    });

    res.status(201).json({
      success: true,
      message: "Motel added successfully",
      data: motel
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================================================
   GET ALL MOTELS
========================================================= */
exports.getAllMotels = async (req, res) => {
  try {
    const motels = await Motel.find({ isDeleted: false })
  .sort({ createdAt: -1 });

    res.json({ success: true, data: motels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================================================
   GET SINGLE
========================================================= */
exports.getSingleMotel = async (req, res) => {
  try {
    const motel = await Motel.findById(req.params.id)
      .populate("vendorId", "name email");

    if (!motel)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: motel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================================================
   UPDATE MOTEL (WITH IMAGE UPDATE)
========================================================= */
// exports.updateMotel = async (req, res) => {
//   try {
//     const id = req.params.id;
//     let data = { ...req.body };

//     /* ===== IMAGE UPDATE ===== */
//     if (req.files?.thumbnailImage) {
//       data.thumbnailImage = req.files.thumbnailImage[0].path;
//     }

//     if (req.files?.propertyImages) {
//       data.propertyImages = getFiles(req, "propertyImages");
//     }

//     if (req.files?.receptionImages) {
//       data.receptionImages = getFiles(req, "receptionImages");
//     }

//     if (req.files?.roomImages) {
//       data.roomImages = getFiles(req, "roomImages");
//     }

//     /* ===== AMENITIES ===== */
//     if (req.body.amenities) {
//       data.amenities = req.body.amenities.split(",");
//     }

//     const updated = await Motel.findByIdAndUpdate(id, data, { new: true });

//     res.json({
//       success: true,
//       message: "Motel updated successfully",
//       data: updated
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
exports.updateMotel = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    let updateData = { ...body };

    /* ================= SAFE IMAGE UPDATE ================= */

    if (req.files?.thumbnailImage) {
      updateData.thumbnailImage = req.files.thumbnailImage[0].path;
    }

    if (req.files?.propertyImages) {
      updateData.propertyImages = req.files.propertyImages.map(f => f.path);
    }

    if (req.files?.receptionImages) {
      updateData.receptionImages = req.files.receptionImages.map(f => f.path);
    }

    if (req.files?.roomImages) {
      updateData.roomImages = req.files.roomImages.map(f => f.path);
    }

    /* ================= DOCUMENT UPDATE ================= */
    updateData.documents = {
      gstCertificate: {
        documentNumber: body.gstNumber || "",
        images: req.files?.gstImages?.map(f => f.path) || []
      },
      panCard: {
        documentNumber: body.panNumber || "",
        images: req.files?.panImages?.map(f => f.path) || []
      },
      ownerIdProof: {
        documentNumber: body.ownerIdNumber || "",
        images: req.files?.ownerImages?.map(f => f.path) || []
      },
      tradeLicense: {
        documentNumber: body.tradeNumber || "",
        images: req.files?.tradeImages?.map(f => f.path) || []
      },
      cancelledCheque: {
        images: req.files?.chequeImages?.map(f => f.path) || []
      }
    };

    /* ================= AMENITIES FIX ================= */
    if (body.amenities) {
      if (typeof body.amenities === "string") {
        updateData.amenities = body.amenities.split(",");
      } else {
        updateData.amenities = body.amenities;
      }
    }

    /* ================= ADDRESS FIX ================= */
    updateData.address = {
      street: body.street,
      area: body.area,
      landmark: body.landmark,
      city: body.city,
      state: body.state,
      pincode: body.pincode
    };

    /* ================= LOCATION FIX ================= */
    updateData.location = {
      latitude: body.latitude,
      longitude: body.longitude
    };

    /* ================= UPDATE ================= */
    const updated = await Motel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Motel not found"
      });
    }

    res.json({
      success: true,
      message: "Motel updated successfully",
      data: updated
    });

  } catch (error) {
    console.log("UPDATE MOTEL ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
/* =========================================================
   DELETE (SOFT)
========================================================= */
exports.deleteMotel = async (req, res) => {
  try {
    await Motel.findByIdAndUpdate(req.params.id, { isDeleted: true });

    res.json({
      success: true,
      message: "Motel deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================================================
   APPROVE
========================================================= */
exports.approveMotel = async (req, res) => {
  try {
    const motel = await Motel.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json({ success: true, message: "Approved", data: motel });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================================================
   REJECT
========================================================= */
exports.rejectMotel = async (req, res) => {
  try {
    const motel = await Motel.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
        rejectionReason: req.body.reason
      },
      { new: true }
    );

    res.json({ success: true, message: "Rejected", data: motel });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};