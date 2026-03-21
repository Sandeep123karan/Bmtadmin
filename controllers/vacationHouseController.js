const VacationHouse = require("../models/VacationHouse");

/* =========================================================
   🏡 ADD VACATION HOUSE (ADMIN)
========================================================= */
// exports.addVacationHouse = async (req, res) => {
//   try {
//     const body = req.body;
//     const files = req.files || {};

//     const random = Math.floor(1000 + Math.random() * 9000);
//     const propertyId = "VAC" + random;

//     const getFiles = (field) =>
//       files[field] ? files[field].map(file => file.path) : [];

//     const thumbnail = files?.thumbnail?.[0]?.path || "";

//     const vacation = new VacationHouse({
//       ...body,
//       propertyId,

//       images: {
//         thumbnail,
//         frontView: getFiles("frontView"),
//         livingRoom: getFiles("livingRoom"),
//         bedRoom: getFiles("bedRoom"),
//         kitchen: getFiles("kitchen"),
//         washroom: getFiles("washroom"),
//         balcony: getFiles("balcony"),
//         amenities: getFiles("amenities"),
//         surroundings: getFiles("surroundings"),
//         otherImages: getFiles("otherImages"),
//       },

//       documents: {
//         propertyDocument: getFiles("propertyDocument"),
//         ownerIdProof: getFiles("ownerIdProof"),
//         addressProof: getFiles("addressProof"),
//         govtLicense: getFiles("govtLicense"),
//         otherDocuments: getFiles("otherDocuments"),
//       },

//       addedBy: req.user.id,
//       isApproved: true, // admin added auto approve
//       isActive: true
//     });

//     await vacation.save();

//     res.status(201).json({
//       success: true,
//       message: "Vacation house added successfully",
//       data: vacation
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
exports.addVacationHouse = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    /* ================= SAFE BODY PARSE ================= */
    const body = req.body || {};

    // agar form-data me nested object string aaye
    const parseJSON = (data) => {
      if (!data) return {};
      if (typeof data === "object") return data;
      try {
        return JSON.parse(data);
      } catch {
        return {};
      }
    };

    const address = parseJSON(body.address);
    const geoLocation = parseJSON(body.geoLocation);
    const contactDetails = parseJSON(body.contactDetails);
    const price = parseJSON(body.price);
    const discount = parseJSON(body.discount);
    const policies = parseJSON(body.policies);
    const rooms = parseJSON(body.rooms);
    const amenities = body.amenities || [];

    /* ================= PROPERTY ID ================= */
    const random = Math.floor(1000 + Math.random() * 9000);
    const propertyId = "VAC" + random;

    /* ================= FILE HANDLER ================= */
    const files = req.files || {};
    const getFiles = (field) =>
      files[field] ? files[field].map(file => file.path) : [];

    const thumbnail = files?.thumbnail?.[0]?.path || "";

    /* ================= VALIDATION ================= */
    if (!body.propertyName) {
      return res.status(400).json({
        success: false,
        message: "propertyName is required"
      });
    }

    /* ================= CREATE ================= */
    const vacation = new VacationHouse({
      propertyName: body.propertyName,
      propertyId,
      description: body.description,
      shortDescription: body.shortDescription,
      starRating: body.starRating,

      address,
      geoLocation,
      contactDetails,

      amenities,
      rooms,

      price,
      discount,

      checkInTime: body.checkInTime,
      checkOutTime: body.checkOutTime,
      policies,

      images: {
        thumbnail,
        frontView: getFiles("frontView"),
        livingRoom: getFiles("livingRoom"),
        bedRoom: getFiles("bedRoom"),
        kitchen: getFiles("kitchen"),
        washroom: getFiles("washroom"),
        balcony: getFiles("balcony"),
        amenities: getFiles("amenitiesImages"),
        surroundings: getFiles("surroundings"),
        otherImages: getFiles("otherImages"),
      },

      documents: {
        propertyDocument: getFiles("propertyDocument"),
        ownerIdProof: getFiles("ownerIdProof"),
        addressProof: getFiles("addressProof"),
        govtLicense: getFiles("govtLicense"),
        otherDocuments: getFiles("otherDocuments"),
      },

      addedBy: req.user?.id,
      isApproved: true,
      isActive: true
    });

    await vacation.save();

    res.status(201).json({
      success: true,
      message: "Vacation house added successfully",
      data: vacation
    });

  } catch (err) {
    console.error("ADD ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
/* =========================================================
   📋 GET ALL
========================================================= */
exports.getAllVacationHouses = async (req, res) => {
  try {
    const data = await VacationHouse.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      total: data.length,
      data
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   🔍 GET SINGLE
========================================================= */
exports.getSingleVacationHouse = async (req, res) => {
  try {
    const data = await VacationHouse.findById(req.params.id);

    if (!data)
      return res.status(404).json({ message: "Property not found" });

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   ✏ UPDATE
========================================================= */
exports.updateVacationHouse = async (req, res) => {
  try {
    const body = req.body;
    const files = req.files || {};

    const getFiles = (field) =>
      files[field] ? files[field].map(file => file.path) : [];

    const updateData = { ...body };

    if (Object.keys(files).length > 0) {
      updateData.images = {
        thumbnail: files?.thumbnail?.[0]?.path,
        frontView: getFiles("frontView"),
        livingRoom: getFiles("livingRoom"),
        bedRoom: getFiles("bedRoom"),
        kitchen: getFiles("kitchen"),
        washroom: getFiles("washroom"),
        balcony: getFiles("balcony"),
        amenities: getFiles("amenities"),
        surroundings: getFiles("surroundings"),
        otherImages: getFiles("otherImages"),
      };

      updateData.documents = {
        propertyDocument: getFiles("propertyDocument"),
        ownerIdProof: getFiles("ownerIdProof"),
        addressProof: getFiles("addressProof"),
        govtLicense: getFiles("govtLicense"),
        otherDocuments: getFiles("otherDocuments"),
      };
    }

    const updated = await VacationHouse.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Updated successfully",
      data: updated
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   ❌ DELETE
========================================================= */
exports.deleteVacationHouse = async (req, res) => {
  try {
    await VacationHouse.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   ✅ APPROVE PROPERTY
========================================================= */
exports.approveVacationHouse = async (req, res) => {
  try {
    const property = await VacationHouse.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    res.json({
      success: true,
      message: "Property approved successfully",
      data: property
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   ❌ REJECT PROPERTY
========================================================= */
exports.rejectVacationHouse = async (req, res) => {
  try {
    const property = await VacationHouse.findByIdAndUpdate(
      req.params.id,
      { isApproved: false },
      { new: true }
    );

    res.json({
      success: true,
      message: "Property rejected",
      data: property
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   🔥 TOGGLE ACTIVE
========================================================= */
exports.toggleActive = async (req, res) => {
  try {
    const property = await VacationHouse.findById(req.params.id);

    property.isActive = !property.isActive;
    await property.save();

    res.json({
      success: true,
      message: `Property ${property.isActive ? "Activated" : "Deactivated"}`,
      data: property
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   ⭐ FEATURE PROPERTY
========================================================= */
exports.toggleFeatured = async (req, res) => {
  try {
    const property = await VacationHouse.findById(req.params.id);

    property.isFeatured = !property.isFeatured;
    await property.save();

    res.json({
      success: true,
      message: property.isFeatured
        ? "Added to featured"
        : "Removed from featured",
      data: property
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};