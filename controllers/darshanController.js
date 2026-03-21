

// const cloudinary = require("../config/cloudinary");
// const Darshan = require("../models/Darshan");

// const multer = require("multer");
// const streamifier = require("streamifier");

// /* ================= MULTER MEMORY ================= */
// const storage = multer.memoryStorage();
// exports.upload = multer({ storage });

// /* ================= CLOUDINARY UPLOAD FUNCTION ================= */
// const uploadToCloudinary = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder: "darshans" },
//       (error, result) => {
//         if (error) {
//           console.log("Cloudinary Error:", error);
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );
//     streamifier.createReadStream(buffer).pipe(stream);
//   });
// };

// /* ================= CREATE DARSHAN ================= */
// exports.createDarshan = async (req, res) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     let imageUrl = "";

//     // upload image if exists
//     if (req.file) {
//       console.log("Uploading to cloudinary...");
//       const result = await uploadToCloudinary(req.file.buffer);
//       console.log("Cloudinary URL:", result.secure_url);
//       imageUrl = result.secure_url;
//     }

//     const darshan = new Darshan({
//       name: req.body.name,
//       location: req.body.location,
//       date: req.body.date,
//       time: req.body.time,
//       description: req.body.description,
//       price: req.body.price,
//       availableSeats: req.body.availableSeats,
//       status: req.body.status,
//       image: imageUrl,
//     });

//     await darshan.save();
//     res.status(201).json(darshan);

//   } catch (err) {
//     console.log("CREATE ERROR:", err);
//     res.status(500).json({
//       message: "Error creating darshan",
//       error: err.message,
//     });
//   }
// };

// /* ================= GET ALL ================= */
// exports.getDarshans = async (req, res) => {
//   try {
//     const darshans = await Darshan.find().sort({ createdAt: -1 });
//     res.json(darshans);
//   } catch (err) {
//     res.status(500).json({
//       message: "Error fetching darshans",
//       error: err.message,
//     });
//   }
// };

// /* ================= GET ONE ================= */
// exports.getDarshanById = async (req, res) => {
//   try {
//     const darshan = await Darshan.findById(req.params.id);
//     if (!darshan) {
//       return res.status(404).json({ message: "Darshan not found" });
//     }
//     res.json(darshan);
//   } catch (err) {
//     res.status(500).json({
//       message: "Error fetching darshan",
//       error: err.message,
//     });
//   }
// };

// /* ================= UPDATE DARSHAN ================= */
// exports.updateDarshan = async (req, res) => {
//   try {
//     console.log("UPDATE BODY:", req.body);
//     console.log("UPDATE FILE:", req.file);

//     let updateData = {
//       name: req.body.name,
//       location: req.body.location,
//       date: req.body.date,
//       time: req.body.time,
//       description: req.body.description,
//       price: req.body.price,
//       availableSeats: req.body.availableSeats,
//       status: req.body.status,
//     };

//     // upload new image if exists
//     if (req.file) {
//       console.log("Updating image...");
//       const result = await uploadToCloudinary(req.file.buffer);
//       updateData.image = result.secure_url;
//     }

//     const darshan = await Darshan.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     if (!darshan) {
//       return res.status(404).json({ message: "Darshan not found" });
//     }

//     res.json(darshan);

//   } catch (err) {
//     console.log("UPDATE ERROR:", err);
//     res.status(500).json({
//       message: "Error updating darshan",
//       error: err.message,
//     });
//   }
// };

// /* ================= DELETE ================= */
// exports.deleteDarshan = async (req, res) => {
//   try {
//     const darshan = await Darshan.findByIdAndDelete(req.params.id);
//     if (!darshan) {
//       return res.status(404).json({ message: "Darshan not found" });
//     }

//     res.json({ message: "Darshan deleted successfully" });
//   } catch (err) {
//     res.status(500).json({
//       message: "Error deleting darshan",
//       error: err.message,
//     });
//   }
// };






const cloudinary = require("../config/cloudinary");
const Darshan = require("../models/Darshan");
const multer = require("multer");
const streamifier = require("streamifier");

/* ================= MULTER ================= */
const storage = multer.memoryStorage();
exports.upload = multer({ storage });

/* ================= CLOUDINARY UPLOAD ================= */
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "darshan_gallery" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/* ================= CREATE ================= */
exports.createDarshan = async (req, res) => {
  try {
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        imageUrls.push(result.secure_url);
      }
    }

    const darshan = new Darshan({
      name: req.body.name,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
      description: req.body.description,
      price: req.body.price,
      availableSeats: req.body.availableSeats,
      status: req.body.status,
      images: imageUrls,
    });

    await darshan.save();
    res.status(201).json(darshan);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL ================= */
exports.getDarshans = async (req, res) => {
  const data = await Darshan.find().sort({ createdAt: -1 });
  res.json(data);
};

/* ================= UPDATE (FIXED) ================= */
exports.updateDarshan = async (req, res) => {
  try {
    const darshan = await Darshan.findById(req.params.id);
    if (!darshan) return res.status(404).json({ message: "Not found" });

    let imageUrls = darshan.images || [];

    // new images add
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        imageUrls.push(result.secure_url);
      }
    }

    darshan.name = req.body.name;
    darshan.location = req.body.location;
    darshan.date = req.body.date;
    darshan.time = req.body.time;
    darshan.description = req.body.description;
    darshan.price = req.body.price;
    darshan.availableSeats = req.body.availableSeats;
    darshan.status = req.body.status;
    darshan.images = imageUrls;

    await darshan.save();
    res.json(darshan);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteDarshan = async (req, res) => {
  await Darshan.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

