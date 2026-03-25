const Place = require("../models/placeModel");
const slugify = require("slugify");


// ================= CREATE PLACE =================
// exports.createPlace = async (req, res) => {
//   try {
//     const data = req.body;

//     // slug
//     if (data.placeName) {
//       data.slug = slugify(data.placeName, { lower: true });
//     }

//     // cloudinary images
//     if (req.files?.coverImage) {
//       data.coverImage = req.files.coverImage[0].path;
//     }

//     if (req.files?.bannerImage) {
//       data.bannerImage = req.files.bannerImage[0].path;
//     }

//     if (req.files?.gallery) {
//       data.gallery = req.files.gallery.map(file => file.path);
//     }

//     const place = await Place.create(data);

//     res.status(201).json({
//       success: true,
//       message: "Place created successfully",
//       data: place
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
exports.createPlace = async (req, res) => {
  try {
    let data = req.body;

    /* ================= VALIDATION ================= */
    if (!data.placeName || !data.country || !data.city) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    /* ================= SAFE PARSE ================= */
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

    data.highlights = parseField(data.highlights);
    data.amenities = parseField(data.amenities);
    data.tags = parseField(data.tags);
    data.faqs = parseField(data.faqs);
    data.activities = parseField(data.activities);

    /* ================= BOOLEAN FIX ================= */
    data.isTrending = data.isTrending === "true";
    data.isPopular = data.isPopular === "true";
    data.isTopDestination = data.isTopDestination === "true";
    data.isRecommended = data.isRecommended === "true";

    /* ================= SLUG FIX ================= */
    data.slug = slugify(
      data.placeName + "-" + Date.now(),
      { lower: true }
    );

    /* ================= IMAGES ================= */
    if (req.files?.coverImage) {
      data.coverImage = req.files.coverImage[0].path;
    }

    if (req.files?.bannerImage) {
      data.bannerImage = req.files.bannerImage[0].path;
    }

    if (req.files?.gallery) {
      data.gallery = req.files.gallery.map(file => file.path);
    }

    /* ================= SAVE ================= */
    const place = await Place.create(data);

    res.status(201).json({
      success: true,
      message: "Place created successfully",
      data: place
    });

  } catch (error) {
    console.log("PLACE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ================= GET ALL (SEARCH + FILTER + PAGINATION) =================
exports.getAllPlaces = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      category,
      search,
      isTrending,
      isPopular
    } = req.query;

    let filter = {};

    if (city) filter.city = city;
    if (category) filter.category = category;
    if (isTrending) filter.isTrending = isTrending;
    if (isPopular) filter.isPopular = isPopular;

    if (search) {
      filter.placeName = { $regex: search, $options: "i" };
    }

    const places = await Place.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Place.countDocuments(filter);

    res.json({
      success: true,
      total,
      page: Number(page),
      data: places
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET SINGLE =================
exports.getSinglePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.json({
      success: true,
      data: place
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE PLACE =================
exports.updatePlace = async (req, res) => {
  try {
    const data = req.body;

    if (data.placeName) {
      data.slug = slugify(data.placeName, { lower: true });
    }

    if (req.files?.coverImage) {
      data.coverImage = req.files.coverImage[0].path;
    }

    if (req.files?.bannerImage) {
      data.bannerImage = req.files.bannerImage[0].path;
    }

    if (req.files?.gallery) {
      data.gallery = req.files.gallery.map(file => file.path);
    }

    const place = await Place.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json({
      success: true,
      message: "Place updated successfully",
      data: place
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= DELETE =================
exports.deletePlace = async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Place deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= ADD REVIEW =================
exports.addReview = async (req, res) => {
  try {
    const { rating, comment, userName } = req.body;

    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    const review = { userName, rating, comment };
    place.reviews.push(review);

    // update rating
    place.totalReviews = place.reviews.length;
    place.rating =
      place.reviews.reduce((acc, item) => acc + item.rating, 0) /
      place.reviews.length;

    await place.save();

    res.json({
      success: true,
      message: "Review added",
      data: place
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= TRENDING =================
exports.getTrendingPlaces = async (req, res) => {
  try {
    const data = await Place.find({ isTrending: true });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= TOP DESTINATION =================
exports.getTopDestinations = async (req, res) => {
  try {
    const data = await Place.find({ isTopDestination: true });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};