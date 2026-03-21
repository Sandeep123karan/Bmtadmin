


// const Bus = require("../models/busModel");

// /* =========================================================
//    HELPER: UNIVERSAL ARRAY FIX
// ========================================================= */
// const parseArray = (field) => {
//   if (!field) return [];
//   if (Array.isArray(field)) return field;
//   if (typeof field === "string") return field.split(",");
//   return [];
// };


// /* =========================================================
//    ADD BUS (VENDOR / ADMIN)
// ========================================================= */
// exports.addBus = async (req, res) => {
//   try {
//     const data = req.body;

//     const amenities = parseArray(data.amenities);
//     const boardingPoints = parseArray(data.boardingPoints);
//     const droppingPoints = parseArray(data.droppingPoints);
//     const busFeatures = parseArray(data.busFeatures);

//     /* IMAGES */
//     let busImages = [];
//     if (req.files && req.files.length > 0) {
//       busImages = req.files.map(file => file.path);
//     }

//     /* AUTO SEAT GENERATE */
//     const totalSeats = parseInt(data.totalSeats || 40);
//     let seats = [];

//     for (let i = 1; i <= totalSeats; i++) {
//       seats.push({
//         seatNumber: `S${i}`,
//         seatType: data.busType?.toLowerCase().includes("sleeper")
//           ? "sleeper"
//           : "seater",
//         deck: "single",
//         price: data.basePrice || 0,
//         isBooked: false
//       });
//     }

//     const bus = new Bus({
//       ...data,
//       totalSeats,
//       availableSeats: totalSeats,
//       amenities,
//       boardingPoints,
//       droppingPoints,
//       busFeatures,
//       seats,
//       busImages,
//       addedBy: data.addedBy || "vendor",
//       status: data.addedBy === "admin" ? "approved" : "pending"
//     });

//     await bus.save();

//     res.json({
//       success: true,
//       message:
//         data.addedBy === "admin"
//           ? "Bus added & approved by admin"
//           : "Bus added successfully. Waiting for admin approval",
//       bus
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// /* =========================================================
//    ADMIN GET ALL BUS
// ========================================================= */
// exports.getAllBusAdmin = async (req, res) => {
//   try {
//     const buses = await Bus.find().sort({ createdAt: -1 });
//     res.json(buses);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// /* =========================================================
//    VENDOR OWN BUS
// ========================================================= */
// exports.getVendorBus = async (req, res) => {
//   try {
//     const buses = await Bus.find({ vendorId: req.params.vendorId })
//       .sort({ createdAt: -1 });

//     res.json(buses);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// /* =========================================================
//    APPROVE BUS (ADMIN)
// ========================================================= */
// exports.approveBus = async (req, res) => {
//   try {
//     const bus = await Bus.findByIdAndUpdate(
//       req.params.id,
//       { status: "approved" },
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: "Bus approved successfully",
//       bus
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// /* =========================================================
//    REJECT BUS (ADMIN)
// ========================================================= */
// exports.rejectBus = async (req, res) => {
//   try {
//     const bus = await Bus.findByIdAndUpdate(
//       req.params.id,
//       { status: "rejected" },
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: "Bus rejected",
//       bus
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// /* =========================================================
//    DELETE BUS
// ========================================================= */
// exports.deleteBus = async (req, res) => {
//   try {
//     await Bus.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Bus deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// /* =========================================================
//    UPDATE BUS
// ========================================================= */
// exports.updateBus = async (req, res) => {
//   try {
//     const data = req.body;

//     const amenities = parseArray(data.amenities);
//     const boardingPoints = parseArray(data.boardingPoints);
//     const droppingPoints = parseArray(data.droppingPoints);
//     const busFeatures = parseArray(data.busFeatures);

//     let updateData = {
//       ...data,
//       amenities,
//       boardingPoints,
//       droppingPoints,
//       busFeatures
//     };

//     /* IMAGE UPDATE */
//     if (req.files && req.files.length > 0) {
//       updateData.busImages = req.files.map(file => file.path);
//     }

//     const bus = await Bus.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: "Bus updated successfully",
//       bus
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// /* =========================================================
//    USER SEARCH (ONLY APPROVED)
// ========================================================= */
// exports.searchBus = async (req, res) => {
//   try {
//     const { fromCity, toCity, date } = req.query;

//     const buses = await Bus.find({
//       fromCity,
//       toCity,
//       journeyDate: date,
//       status: "approved",
//       isActive: true
//     });

//     res.json(buses);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// /* =========================================================
//    LIVE LOCATION UPDATE
// ========================================================= */
// exports.updateLiveLocation = async (req, res) => {
//   try {
//     const { busId, lat, lng, speed, heading } = req.body;

//     const bus = await Bus.findByIdAndUpdate(
//       busId,
//       {
//         liveLocation: {
//           lat,
//           lng,
//           speed,
//           heading,
//           updatedAt: new Date()
//         },
//         $push: {
//           routeLocation: { lat, lng }
//         }
//       },
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: "Live location updated",
//       bus
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// /* =========================================================
//    GET LIVE LOCATION
// ========================================================= */
// exports.getLiveLocation = async (req, res) => {
//   try {
//     const bus = await Bus.findById(req.params.id);
//     res.json(bus.liveLocation);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };








const Bus = require("../models/busModel");

/* =========================================================
   HELPERS
========================================================= */

// Parse comma-separated string to array
const parseArray = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === "string") return field.split(",").map(s => s.trim()).filter(Boolean);
  return [];
};

// Parse boarding/dropping points
// Accepts JSON string OR "Location|Time|Address|Landmark, Location2|Time2|..." format
const parsePoints = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;

  // Try JSON first
  try {
    const parsed = JSON.parse(field);
    if (Array.isArray(parsed)) return parsed;
  } catch (_) {}

  // Try pipe-separated string format: "Dadar|06:00|Dadar ST|Near MCd, Thane|07:00|..."
  return field.split(",").map(s => s.trim()).filter(Boolean).map(point => {
    const parts = point.split("|").map(p => p.trim());
    return {
      location: parts[0] || "",
      time:     parts[1] || "",
      address:  parts[2] || "",
      landmark: parts[3] || "",
    };
  });
};

// Parse seatPrice array: "A1:500, A2:600" or JSON
const parseSeatPrice = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  try {
    const parsed = JSON.parse(field);
    if (Array.isArray(parsed)) return parsed;
  } catch (_) {}
  return field.split(",").map(s => s.trim()).filter(Boolean).map(item => {
    const [seatNo, price] = item.split(":").map(p => p.trim());
    return { seatNo: seatNo || "", price: price || "" };
  });
};


/* =========================================================
   ADD BUS  (Vendor / Admin)
========================================================= */
exports.addBus = async (req, res) => {
  try {
    const d = req.body;

    // ── Arrays
    const amenities       = parseArray(d.amenities);
    const viaCities       = parseArray(d.viaCities);
    const seatNumbers     = parseArray(d.seatNumbers);
    const bookedSeats     = parseArray(d.bookedSeats);
    const blockedSeats    = parseArray(d.blockedSeats);

    // ── Structured arrays
    const boardingPoints  = parsePoints(d.boardingPoints);
    const droppingPoints  = parsePoints(d.droppingPoints);
    const seatPrice       = parseSeatPrice(d.seatPrice);

    // ── Images from multer (field names mapped)
    const files = req.files || {};
    const frontImage      = files.frontImage?.[0]?.path || "";
    const backImage       = files.backImage?.[0]?.path  || "";
    const seatLayoutImage = files.seatLayoutImage?.[0]?.path || "";
    const insideImages    = (files.insideImages || []).map(f => f.path);
    const gallery         = (files.gallery || []).map(f => f.path);

    // ── Route map
    const routeMap = {
      fromLat: d.fromLat || "",
      fromLng: d.fromLng || "",
      toLat:   d.toLat   || "",
      toLng:   d.toLng   || "",
    };

    // ── Auto-generate seats if seat numbers not provided
    const totalSeats = parseInt(d.totalSeats || 40);
    let autoSeatNumbers = seatNumbers;
    if (autoSeatNumbers.length === 0) {
      for (let i = 1; i <= totalSeats; i++) autoSeatNumbers.push(`S${i}`);
    }

    const bus = new Bus({
      // Basic
      busId:          d.busId,
      busName:        d.busName,
      busNumber:      d.busNumber,
      operatorName:   d.operatorName,
      vendorName:     d.vendorName,
      busOwner:       d.busOwner,

      // Contact
      email:    d.email,
      phone:    d.phone,
      altPhone: d.altPhone,
      address:  d.address,
      city:     d.city,
      state:    d.state,
      country:  d.country,

      // Route
      fromCity:        d.fromCity,
      toCity:          d.toCity,
      viaCities,
      routeName:       d.routeName,
      boardingPoints,
      droppingPoints,

      // Timing
      departureTime:  d.departureTime,
      arrivalTime:    d.arrivalTime,
      journeyDuration: d.journeyDuration,
      reportingTime:  d.reportingTime,

      // Bus details
      busType:        d.busType,
      busCategory:    d.busCategory,
      busModel:       d.busModel,
      busColor:       d.busColor,
      seatLayoutType: d.seatLayoutType,
      totalSeats,
      availableSeats: totalSeats,
      upperSeats:     parseInt(d.upperSeats || 0),
      lowerSeats:     parseInt(d.lowerSeats || 0),

      // Seats
      seatNumbers:  autoSeatNumbers,
      bookedSeats,
      blockedSeats,
      seatPrice,

      // Pricing
      basePrice:     d.basePrice,
      tax:           d.tax,
      tollTax:       d.tollTax,
      discount:      d.discount,
      offerPrice:    d.offerPrice,
      finalPrice:    d.finalPrice,
      agentCommission: d.agentCommission,
      agentPrice:    d.agentPrice,
      vendorCost:    d.vendorCost,
      vendorPaymentStatus: d.vendorPaymentStatus,
      profit:        d.profit,

      // Driver
      driverName:    d.driverName,
      driverPhone:   d.driverPhone,
      driverLicense: d.driverLicense,
      helperName:    d.helperName,
      helperPhone:   d.helperPhone,

      // Documents
      rcNumber:        d.rcNumber,
      insuranceNumber: d.insuranceNumber,
      permitNumber:    d.permitNumber,
      fitnessExpiry:   d.fitnessExpiry,

      // Live Track
      gpsDeviceId:        d.gpsDeviceId,
      liveTrackingLink:   d.liveTrackingLink,
      busCurrentLocation: d.busCurrentLocation,

      // Amenities
      amenities,

      // Dates
      travelDate:       d.travelDate,
      returnDate:       d.returnDate,
      startBookingDate: d.startBookingDate || null,
      endBookingDate:   d.endBookingDate   || null,

      // Map
      routeMap,

      // Images
      frontImage,
      backImage,
      seatLayoutImage,
      insideImages,
      gallery,

      // Policy
      cancellationPolicy: d.cancellationPolicy,
      rating:   d.rating,
      reviews:  d.reviews,

      // Status & Admin
      status:     d.addedBy === "admin" ? "approved" : "pending",
      assignUser: d.assignUser,
      notes:      d.notes,
      addedBy:    d.addedBy || "vendor",
    });

    await bus.save();

    res.json({
      success: true,
      message: d.addedBy === "admin"
        ? "Bus added & approved by admin"
        : "Bus added successfully. Waiting for admin approval",
      bus,
    });

  } catch (err) {
    console.error("addBus error:", err);
    res.status(500).json({ error: err.message });
  }
};


/* =========================================================
   UPDATE BUS
========================================================= */
exports.updateBus = async (req, res) => {
  try {
    const d = req.body;

    const amenities       = parseArray(d.amenities);
    const viaCities       = parseArray(d.viaCities);
    const seatNumbers     = parseArray(d.seatNumbers);
    const boardingPoints  = parsePoints(d.boardingPoints);
    const droppingPoints  = parsePoints(d.droppingPoints);
    const seatPrice       = parseSeatPrice(d.seatPrice);

    const files = req.files || {};

    const updateData = {
      busName:        d.busName,
      busNumber:      d.busNumber,
      operatorName:   d.operatorName,
      vendorName:     d.vendorName,
      busOwner:       d.busOwner,
      email:          d.email,
      phone:          d.phone,
      altPhone:       d.altPhone,
      address:        d.address,
      city:           d.city,
      state:          d.state,
      country:        d.country,
      fromCity:       d.fromCity,
      toCity:         d.toCity,
      viaCities,
      routeName:      d.routeName,
      boardingPoints,
      droppingPoints,
      departureTime:  d.departureTime,
      arrivalTime:    d.arrivalTime,
      journeyDuration: d.journeyDuration,
      reportingTime:  d.reportingTime,
      busType:        d.busType,
      busCategory:    d.busCategory,
      busModel:       d.busModel,
      busColor:       d.busColor,
      seatLayoutType: d.seatLayoutType,
      totalSeats:     parseInt(d.totalSeats || 40),
      upperSeats:     parseInt(d.upperSeats || 0),
      lowerSeats:     parseInt(d.lowerSeats || 0),
      seatNumbers,
      seatPrice,
      basePrice:      d.basePrice,
      tax:            d.tax,
      tollTax:        d.tollTax,
      discount:       d.discount,
      offerPrice:     d.offerPrice,
      finalPrice:     d.finalPrice,
      agentCommission: d.agentCommission,
      agentPrice:     d.agentPrice,
      vendorCost:     d.vendorCost,
      vendorPaymentStatus: d.vendorPaymentStatus,
      profit:         d.profit,
      driverName:     d.driverName,
      driverPhone:    d.driverPhone,
      driverLicense:  d.driverLicense,
      helperName:     d.helperName,
      helperPhone:    d.helperPhone,
      rcNumber:       d.rcNumber,
      insuranceNumber: d.insuranceNumber,
      permitNumber:   d.permitNumber,
      fitnessExpiry:  d.fitnessExpiry,
      gpsDeviceId:    d.gpsDeviceId,
      liveTrackingLink: d.liveTrackingLink,
      busCurrentLocation: d.busCurrentLocation,
      amenities,
      travelDate:     d.travelDate,
      returnDate:     d.returnDate,
      startBookingDate: d.startBookingDate || null,
      endBookingDate:   d.endBookingDate   || null,
      routeMap: {
        fromLat: d.fromLat || "",
        fromLng: d.fromLng || "",
        toLat:   d.toLat   || "",
        toLng:   d.toLng   || "",
      },
      cancellationPolicy: d.cancellationPolicy,
      assignUser:     d.assignUser,
      notes:          d.notes,
      addedBy:        d.addedBy,
      modifiedDate:   new Date(),
    };

    // Update images only if new ones sent
    if (files.frontImage?.[0])      updateData.frontImage      = files.frontImage[0].path;
    if (files.backImage?.[0])       updateData.backImage       = files.backImage[0].path;
    if (files.seatLayoutImage?.[0]) updateData.seatLayoutImage = files.seatLayoutImage[0].path;
    if (files.insideImages?.length) updateData.insideImages    = files.insideImages.map(f => f.path);
    if (files.gallery?.length)      updateData.gallery         = files.gallery.map(f => f.path);

    const bus = await Bus.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!bus) return res.status(404).json({ error: "Bus not found" });

    res.json({ success: true, message: "Bus updated successfully", bus });

  } catch (err) {
    console.error("updateBus error:", err);
    res.status(500).json({ error: err.message });
  }
};


/* =========================================================
   ADMIN — GET ALL BUSES
========================================================= */
exports.getAllBusAdmin = async (req, res) => {
  try {
    const buses = await Bus.find().sort({ createdAt: -1 });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* =========================================================
   VENDOR — OWN BUSES
========================================================= */
exports.getVendorBus = async (req, res) => {
  try {
    const buses = await Bus.find({ vendorId: req.params.vendorId }).sort({ createdAt: -1 });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* =========================================================
   APPROVE BUS
========================================================= */
exports.approveBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!bus) return res.status(404).json({ error: "Bus not found" });
    res.json({ success: true, message: "Bus approved successfully", bus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* =========================================================
   REJECT BUS
========================================================= */
exports.rejectBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!bus) return res.status(404).json({ error: "Bus not found" });
    res.json({ success: true, message: "Bus rejected", bus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* =========================================================
   DELETE BUS
========================================================= */
exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json({ error: "Bus not found" });
    res.json({ success: true, message: "Bus deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* =========================================================
   USER SEARCH  (approved only)
========================================================= */
exports.searchBus = async (req, res) => {
  try {
    const { fromCity, toCity, date } = req.query;
    const query = { status: "approved" };
    if (fromCity) query.fromCity = new RegExp(fromCity, "i");
    if (toCity)   query.toCity   = new RegExp(toCity, "i");
    if (date)     query.travelDate = date;

    const buses = await Bus.find(query);
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* =========================================================
   LIVE LOCATION — UPDATE
========================================================= */
exports.updateLiveLocation = async (req, res) => {
  try {
    const { busId, lat, lng, speed, heading, locationName } = req.body;

    const bus = await Bus.findByIdAndUpdate(
      busId,
      {
        busCurrentLocation: locationName || `${lat},${lng}`,
        "routeMap.fromLat": lat,
        "routeMap.fromLng": lng,
      },
      { new: true }
    );

    res.json({ success: true, message: "Live location updated", bus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* =========================================================
   LIVE LOCATION — GET
========================================================= */
exports.getLiveLocation = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id, "busCurrentLocation routeMap gpsDeviceId liveTrackingLink");
    if (!bus) return res.status(404).json({ error: "Bus not found" });
    res.json({
      busCurrentLocation: bus.busCurrentLocation,
      routeMap:           bus.routeMap,
      gpsDeviceId:        bus.gpsDeviceId,
      liveTrackingLink:   bus.liveTrackingLink,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};