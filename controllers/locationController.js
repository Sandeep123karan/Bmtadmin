const axios = require("axios");

exports.getLatLng = async (req, res) => {
  try {
    const { address } = req.query;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAP_KEY}`;
    const response = await axios.get(url);

    const loc = response.data.results[0].geometry.location;

    res.json({
      lat: loc.lat,
      lng: loc.lng,
      fullAddress: response.data.results[0].formatted_address
    });

  } catch (err) {
    res.status(500).json({ message: "Location error" });
  }
};
 