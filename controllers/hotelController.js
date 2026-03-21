const Hotel = require("../models/HotelModel");

/* =====================================================
   ADD HOTEL BY VENDOR
===================================================== */
exports.addHotel = async (req, res) => {
  try {
    const {
      hotelName,
      description,
      hotelType,
      city,
      state,
      address,
      pincode,
      latitude,
      longitude,
      phone,
      email,
      pricePerNight,
      totalRooms,
      amenities,
      vendorId,
      vendorName
    } = req.body;

    let imageUrls = [];
    if (req.files) {
      imageUrls = req.files.map(file => file.path);
    }

    const hotel = new Hotel({
      hotelName,
      description,
      hotelType,
      city,
      state,
      address,
      pincode,
      phone,
      email,
      pricePerNight,
      totalRooms,
      availableRooms: totalRooms,
      amenities,
      vendorId,
      vendorName,
      images: imageUrls,

      location: {
        type: "Point",
        coordinates: [
          parseFloat(longitude),
          parseFloat(latitude)
        ]
      }
    });

    await hotel.save();

    res.status(201).json({
      success: true,
      message: "Hotel added successfully",
      hotel
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* =====================================================
   ADMIN: GET ALL HOTELS (SHOW IN ADMIN PANEL)
===================================================== */
exports.getAllHotelsAdmin = async (req, res) => {
  try {

    const hotels = await Hotel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      totalHotels: hotels.length,
      hotels
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* =====================================================
   SINGLE HOTEL
===================================================== */
exports.getSingleHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* =====================================================
   ADMIN APPROVE HOTEL
===================================================== */
exports.approveHotel = async (req, res) => {
  try {

    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json({
      success: true,
      message: "Hotel approved",
      hotel
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* =====================================================
   UPDATE HOTEL
===================================================== */
exports.updateHotel = async (req, res) => {
  try {

    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Hotel updated",
      hotel
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* =====================================================
   DELETE HOTEL (ADMIN)
===================================================== */
exports.deleteHotel = async (req, res) => {
  try {

    await Hotel.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Hotel deleted"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* =====================================================
   NEARBY HOTELS (MAP)
===================================================== */
exports.getNearbyHotels = async (req, res) => {
  try {

    const { lat, lng } = req.query;

    const hotels = await Hotel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 5000
        }
      }
    });

    res.json({
      success: true,
      hotels
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
