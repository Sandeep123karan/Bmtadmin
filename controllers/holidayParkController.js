const HolidayPark = require("../models/HolidayPark");

/* =========================================================
   🏕️ ADD HOLIDAY PARK (ADMIN/VENDOR)
========================================================= */
exports.addHolidayPark = async (req, res) => {
  try {
    const body = req.body;

    const random = Math.floor(1000 + Math.random() * 9000);
    const propertyId = "HPARK" + random;

    /* ========= IMAGE HANDLING ========= */
    const getFiles = (field) =>
      req.files && req.files[field]
        ? req.files[field].map((f) => f.path)
        : [];

    const thumbnailImage = req.files?.thumbnailImage?.[0]?.path || "";

    /* ========= SAFE JSON PARSE ========= */
    const safeParse = (data) => {
      try {
        return data ? JSON.parse(data) : [];
      } catch {
        return [];
      }
    };

    const park = new HolidayPark({
      parkName: body.parkName,
      propertyId,
      description: body.description,
      shortDescription: body.shortDescription,
      propertyType: body.propertyType,
      starCategory: body.starCategory,

      address: {
        street: body.street,
        area: body.area,
        landmark: body.landmark,
        city: body.city,
        state: body.state,
        country: body.country,
        pincode: body.pincode,
        latitude: body.latitude,
        longitude: body.longitude,
      },

      priceRange: {
        basePrice: body.basePrice,
        weekendPrice: body.weekendPrice,
        peakPrice: body.peakPrice,
      },

      pricePerNight: body.pricePerNight,
      discount: body.discount,
      taxIncluded: body.taxIncluded,

      totalRooms: body.totalRooms,
      totalCottages: body.totalCottages,
      maxGuests: body.maxGuests,
      roomTypes: safeParse(body.roomTypes),

      amenities: safeParse(body.amenities),
      facilities: safeParse(body.facilities),
      activities: safeParse(body.activities),

      thumbnailImage,
      bannerImages: getFiles("bannerImages"),
      galleryImages: getFiles("galleryImages"),
      roomImages: getFiles("roomImages"),

      foodOptions: {
        breakfast: body.breakfast,
        lunch: body.lunch,
        dinner: body.dinner,
        restaurantAvailable: body.restaurantAvailable,
      },

      checkInTime: body.checkInTime,
      checkOutTime: body.checkOutTime,

      rules: {
        petsAllowed: body.petsAllowed,
        smokingAllowed: body.smokingAllowed,
        alcoholAllowed: body.alcoholAllowed,
        coupleFriendly: body.coupleFriendly,
        idProofRequired: body.idProofRequired,
      },

      cancellationPolicy: body.cancellationPolicy,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      slug: body.slug,

      addedBy: req.user?.id,
      vendorId: req.user?.id,
    });

    await park.save();

    res.status(201).json({
      success: true,
      message: "Holiday Park Added Successfully",
      data: park,
    });

  } catch (err) {
    console.log("ADD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


/* =========================================================
   ✏️ UPDATE PARK
========================================================= */
// exports.updateHolidayPark = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const body = req.body;

//     const park = await HolidayPark.findById(id);
//     if (!park) return res.status(404).json({ message: "Not found" });

//     const getFiles = (field) =>
//       req.files && req.files[field]
//         ? req.files[field].map((f) => f.path)
//         : [];

//     const safeParse = (data) => {
//       try {
//         return data ? JSON.parse(data) : [];
//       } catch {
//         return [];
//       }
//     };

//     if (req.files?.thumbnailImage)
//       park.thumbnailImage = req.files.thumbnailImage[0].path;

//     if (req.files?.bannerImages)
//       park.bannerImages = getFiles("bannerImages");

//     if (req.files?.galleryImages)
//       park.galleryImages = getFiles("galleryImages");

//     if (req.files?.roomImages)
//       park.roomImages = getFiles("roomImages");

//     /* JSON */
//     if (body.amenities) park.amenities = safeParse(body.amenities);
//     if (body.facilities) park.facilities = safeParse(body.facilities);
//     if (body.activities) park.activities = safeParse(body.activities);
//     if (body.roomTypes) park.roomTypes = safeParse(body.roomTypes);

//     Object.assign(park, body);

//     await park.save();

//     res.json({
//       success: true,
//       message: "Holiday Park Updated",
//       data: park,
//     });

//   } catch (err) {
//     console.log("UPDATE ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };
exports.updateHolidayPark = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const park = await HolidayPark.findById(id);
    if (!park) return res.status(404).json({ message: "Not found" });

    const getFiles = (field) =>
      req.files && req.files[field]
        ? req.files[field].map((f) => f.path)
        : [];

    const safeParse = (data) => {
      try {
        return data ? JSON.parse(data) : [];
      } catch {
        return [];
      }
    };

    /* ========== IMAGES ========== */
    if (req.files?.thumbnailImage)
      park.thumbnailImage = req.files.thumbnailImage[0].path;

    if (req.files?.bannerImages)
      park.bannerImages = getFiles("bannerImages");

    if (req.files?.galleryImages)
      park.galleryImages = getFiles("galleryImages");

    if (req.files?.roomImages)
      park.roomImages = getFiles("roomImages");

    /* ========== BASIC ========== */
    park.parkName = body.parkName;
    park.description = body.description;
    park.shortDescription = body.shortDescription;
    park.propertyType = body.propertyType;
    park.starCategory = body.starCategory;

    /* ========== ADDRESS ========== */
    park.address = {
      street: body.street,
      area: body.area,
      landmark: body.landmark,
      city: body.city,
      state: body.state,
      country: body.country,
      pincode: body.pincode,
      latitude: body.latitude,
      longitude: body.longitude,
    };

    /* ========== PRICE ========== */
    park.priceRange = {
      basePrice: body.basePrice,
      weekendPrice: body.weekendPrice,
      peakPrice: body.peakPrice,
    };

    park.pricePerNight = body.pricePerNight;
    park.discount = body.discount;
    park.taxIncluded = body.taxIncluded;

    /* ========== ROOMS ========== */
    park.totalRooms = body.totalRooms;
    park.totalCottages = body.totalCottages;
    park.maxGuests = body.maxGuests;
    park.roomTypes = safeParse(body.roomTypes);

    /* ========== ARRAYS ========== */
    park.amenities = safeParse(body.amenities);
    park.facilities = safeParse(body.facilities);
    park.activities = safeParse(body.activities);

    /* ========== FOOD ========== */
    park.foodOptions = {
      breakfast: body.breakfast,
      lunch: body.lunch,
      dinner: body.dinner,
      restaurantAvailable: body.restaurantAvailable,
    };

    /* ========== RULES ========== */
    park.rules = {
      petsAllowed: body.petsAllowed,
      smokingAllowed: body.smokingAllowed,
      alcoholAllowed: body.alcoholAllowed,
      coupleFriendly: body.coupleFriendly,
      idProofRequired: body.idProofRequired,
    };

    park.checkInTime = body.checkInTime;
    park.checkOutTime = body.checkOutTime;
    park.cancellationPolicy = body.cancellationPolicy;
    park.metaTitle = body.metaTitle;
    park.metaDescription = body.metaDescription;
    park.slug = body.slug;

    await park.save();

    res.json({
      success: true,
      message: "Holiday Park Updated",
      data: park,
    });

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   📋 GET ALL PARKS
========================================================= */
exports.getAllHolidayParks = async (req, res) => {
  try {
    const parks = await HolidayPark.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      total: parks.length,
      data: parks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* =========================================================
   📋 GET PENDING (ADMIN APPROVAL PANEL)
========================================================= */
exports.getPendingParks = async (req, res) => {
  try {
    const parks = await HolidayPark.find({ approvalStatus: "pending" });

    res.json({
      success: true,
      total: parks.length,
      data: parks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* =========================================================
   📋 GET APPROVED
========================================================= */
exports.getApprovedParks = async (req, res) => {
  try {
    const parks = await HolidayPark.find({ approvalStatus: "approved" });

    res.json({
      success: true,
      total: parks.length,
      data: parks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* =========================================================
   👤 VENDOR MY PARKS
========================================================= */
exports.vendorMyParks = async (req, res) => {
  try {
    const parks = await HolidayPark.find({ vendorId: req.user.id });

    res.json({
      success: true,
      total: parks.length,
      data: parks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* =========================================================
   ✅ APPROVE PARK (ADMIN)
========================================================= */
exports.approveHolidayPark = async (req, res) => {
  try {
    const park = await HolidayPark.findById(req.params.id);
    if (!park) return res.status(404).json({ message: "Not found" });

    park.approvalStatus = "approved";
    park.rejectionReason = "";
    park.approvedBy = req.user.id;
    park.approvedAt = new Date();
    park.isActive = true;

    await park.save();

    res.json({ success: true, message: "Approved", data: park });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* =========================================================
   ❌ REJECT PARK
========================================================= */
exports.rejectHolidayPark = async (req, res) => {
  try {
    const { reason } = req.body;

    const park = await HolidayPark.findById(req.params.id);
    if (!park) return res.status(404).json({ message: "Not found" });

    park.approvalStatus = "rejected";
    park.rejectionReason = reason || "Rejected by admin";
    park.approvedBy = req.user.id;
    park.approvedAt = new Date();
    park.isActive = false;

    await park.save();

    res.json({ success: true, message: "Rejected", data: park });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* =========================================================
   🗑️ DELETE
========================================================= */
exports.deleteHolidayPark = async (req, res) => {
  try {
    await HolidayPark.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* =========================================================
   🔍 SINGLE
========================================================= */
exports.getSingleHolidayPark = async (req, res) => {
  try {
    const park = await HolidayPark.findById(req.params.id);

    if (!park) return res.status(404).json({ message: "Not found" });

    res.json({ success: true, data: park });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};