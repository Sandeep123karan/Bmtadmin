

// const AddHotel = require('../models/addHotelModel');

// // CREATE HOTEL
// exports.createHotel = async (req, res) => {
//   try {
//     let body = req.body;

//     const amenities = body.amenities ? body.amenities.split(',').map(a => a.trim()) : [];

//     let coordinates = { lat: null, lng: null };
//     if (body.coordinates) {
//       const [lat, lng] = body.coordinates.split(',').map(Number);
//       coordinates = { lat, lng };
//     }

//     const hotel = new AddHotel({
//       ...body,
//       amenities,
//       coordinates
//     });

//     await hotel.save();

//     res.status(201).json({ message: "Hotel created", hotel });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // GET ALL HOTELS
// exports.getHotels = async (req, res) => {
//   try {
//     const hotels = await AddHotel.find().sort({ createdAt: -1 });
//     res.json(hotels);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // GET ONE HOTEL
// exports.getHotelById = async (req, res) => {
//   try {
//     const hotel = await AddHotel.findById(req.params.id);
//     res.json(hotel);
//   } catch (err) {
//     res.status(404).json({ error: "Hotel not found" });
//   }
// };

// // UPDATE
// exports.updateHotel = async (req, res) => {
//   try {
//     let body = req.body;

//     const amenities = body.amenities ? body.amenities.split(',').map(a => a.trim()) : [];

//     let coordinates = { lat: null, lng: null };
//     if (body.coordinates) {
//       const [lat, lng] = body.coordinates.split(',').map(Number);
//       coordinates = { lat, lng };
//     }

//     const hotel = await AddHotel.findByIdAndUpdate(
//       req.params.id,
//       { ...body, amenities, coordinates },
//       { new: true }
//     );

//     res.json(hotel);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // DELETE
// exports.deleteHotel = async (req, res) => {
//   try {
//     await AddHotel.findByIdAndDelete(req.params.id);
//     res.json({ message: "Hotel deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };





// const Hotel = require("../models/addHotelModel");

// /* =========================================================
//    ADD HOTEL (95+ FIELDS SUPPORT)
// ========================================================= */
// exports.addHotel = async (req, res) => {
//   try {
//     const data = req.body;

//     /* ===============================
//        ROOMS PARSE (JSON)
//     =============================== */
//     let rooms = [];
//     if (data.rooms) {
//       try {
//         rooms = JSON.parse(data.rooms);
//       } catch (err) {
//         return res.status(400).json({
//           success: false,
//           message: "Rooms must be valid JSON"
//         });
//       }
//     }
//     /* GET ALL HOTELS */
// exports.getAllHotels = async (req,res)=>{
//  try{
//    const hotels = await Hotel.find().sort({createdAt:-1});
//    res.json(hotels);
//  }catch(err){
//    res.status(500).json({error:err.message});
//  }
// };

// /* SINGLE HOTEL */
// exports.getSingleHotel = async (req,res)=>{
//  try{
//    const hotel = await Hotel.findById(req.params.id);
//    res.json(hotel);
//  }catch(err){
//    res.status(500).json({error:err.message});
//  }
// };

// /* UPDATE HOTEL */
// exports.updateHotel = async (req,res)=>{
//  try{
//    const hotel = await Hotel.findByIdAndUpdate(
//      req.params.id,
//      req.body,
//      {new:true}
//    );
//    res.json(hotel);
//  }catch(err){
//    res.status(500).json({error:err.message});
//  }
// };

// /* DELETE HOTEL */
// exports.deleteHotel = async (req,res)=>{
//  try{
//    await Hotel.findByIdAndDelete(req.params.id);
//    res.json({message:"Hotel Deleted"});
//  }catch(err){
//    res.status(500).json({error:err.message});
//  }
// };

// /* APPROVE HOTEL */
// exports.approveHotel = async (req,res)=>{
//  try{
//    const hotel = await Hotel.findByIdAndUpdate(
//      req.params.id,
//      {status:"approved"},
//      {new:true}
//    );
//    res.json(hotel);
//  }catch(err){
//    res.status(500).json({error:err.message});
//  }
// };

// /* VENDOR HOTELS */
// exports.getVendorHotels = async (req,res)=>{
//  try{
//    const hotels = await Hotel.find({vendorId:req.params.vendorId});
//    res.json(hotels);
//  }catch(err){
//    res.status(500).json({error:err.message});
//  }
// };

// /* NEARBY HOTELS */
// exports.getNearbyHotels = async (req,res)=>{
//  try{
//    const {lat,lng} = req.query;

//    const hotels = await Hotel.find({
//      location:{
//        $near:{
//          $geometry:{
//            type:"Point",
//            coordinates:[parseFloat(lng),parseFloat(lat)]
//          },
//          $maxDistance:10000
//        }
//      }
//    });

//    res.json(hotels);
//  }catch(err){
//    res.status(500).json({error:err.message});
//  }
// };


//     /* ===============================
//        HOTEL IMAGES
//     =============================== */
//     let hotelImages = [];
//     let roomImages = [];
//     let videos = [];

//     if (req.files) {
//       if (req.files.hotelImages) {
//         hotelImages = req.files.hotelImages.map(f => f.path);
//       }
//       if (req.files.roomImages) {
//         roomImages = req.files.roomImages.map(f => f.path);
//       }
//       if (req.files.videos) {
//         videos = req.files.videos.map(f => f.path);
//       }
//     }

//     /* ===============================
//        LOCATION (MAP)
//     =============================== */
//     let location = undefined;

//     if (data.latitude && data.longitude) {
//       location = {
//         type: "Point",
//         coordinates: [
//           parseFloat(data.longitude),
//           parseFloat(data.latitude)
//         ]
//       };
//     }

//     /* ===============================
//        ARRAY FIELDS CONVERT
//     =============================== */
//     const parseArray = (field) => {
//       if (!data[field]) return [];
//       if (Array.isArray(data[field])) return data[field];
//       return data[field].split(",");
//     };

//     const amenities = parseArray("amenities");
//     const propertyHighlights = parseArray("propertyHighlights");
//     const foodAndDining = parseArray("foodAndDining");
//     const safetyAndSecurity = parseArray("safetyAndSecurity");
//     const wellnessAndSpa = parseArray("wellnessAndSpa");
//     const businessFacilities = parseArray("businessFacilities");
//     const mediaAndTechnology = parseArray("mediaAndTechnology");
//     const transportServices = parseArray("transportServices");
//     const paymentMethods = parseArray("paymentMethods");

//     /* ===============================
//        CREATE HOTEL OBJECT
//     =============================== */
//     const hotel = new Hotel({

//       /* BASIC */
//       hotelName: data.hotelName,
//       hotelType: data.hotelType,
//       description: data.description,
//       starRating: data.starRating,
//       yearBuilt: data.yearBuilt,

//       /* CONTACT */
//       phone: data.phone,
//       alternatePhone: data.alternatePhone,
//       email: data.email,
//       website: data.website,

//       /* LOCATION */
//       country: data.country,
//       state: data.state,
//       city: data.city,
//       area: data.area,
//       address: data.address,
//       pincode: data.pincode,
//       landmark: data.landmark,
//       location,

//       /* AMENITIES */
//       amenities,
//       propertyHighlights,
//       foodAndDining,
//       safetyAndSecurity,
//       wellnessAndSpa,
//       businessFacilities,
//       mediaAndTechnology,
//       transportServices,

//       /* ROOMS */
//       rooms,

//       /* MEDIA */
//       hotelImages,
//       roomImages,
//       videos,
//       virtualTourLink: data.virtualTourLink,

//       /* POLICIES */
//       checkInTime: data.checkInTime,
//       checkOutTime: data.checkOutTime,
//       earlyCheckInAllowed: data.earlyCheckInAllowed,
//       lateCheckOutAllowed: data.lateCheckOutAllowed,
//       cancellationPolicy: data.cancellationPolicy,
//       childPolicy: data.childPolicy,
//       petPolicy: data.petPolicy,
//       coupleFriendly: data.coupleFriendly,
//       localIdAllowed: data.localIdAllowed,

//       /* FINANCE */
//       pricePerNight: data.pricePerNight,
//       taxPercentage: data.taxPercentage,
//       serviceCharge: data.serviceCharge,
//       extraBedCharge: data.extraBedCharge,
//       paymentMethods,
//       refundPolicy: data.refundPolicy,
//       gstNumber: data.gstNumber,

//       /* RATING */
//       averageRating: data.averageRating,
//       totalReviews: data.totalReviews,

//       /* VENDOR */
//       vendorId: data.vendorId,
//       vendorName: data.vendorName,

//       /* ADMIN */
//       status: data.status || "pending",
//       featured: data.featured || false,
//       isActive: data.isActive || true
//     });

//     await hotel.save();

//     res.status(201).json({
//       success: true,
//       message: "Hotel Added Successfully",
//       hotel
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };




const Hotel = require("../models/addHotelModel");

/* =========================================================
   ADD HOTEL
========================================================= */
// exports.addHotel = async (req, res) => {
//   try {
//     const data = req.body;

   
    
// let rooms = [];
// if (data.rooms) {
//   try {
//     rooms = typeof data.rooms === "string"
//       ? JSON.parse(data.rooms)
//       : data.rooms;
//   } catch (err) {
//     rooms = [];
//   }
// }



//     /* IMAGES */
//     let hotelImages = [];
//     let roomImages = [];
//     let videos = [];

//     if (req.files) {
//       if (req.files.hotelImages) {
//         hotelImages = req.files.hotelImages.map(f => f.path);
//       }
//       if (req.files.roomImages) {
//         roomImages = req.files.roomImages.map(f => f.path);
//       }
//       if (req.files.videos) {
//         videos = req.files.videos.map(f => f.path);
//       }
//     }

//     /* LOCATION */
//     // let location;
//     // if (data.latitude && data.longitude) {
//     //   location = {
//     //     type: "Point",
//     //     coordinates: [
//     //       parseFloat(data.longitude),
//     //       parseFloat(data.latitude)
//     //     ]
//     //   };
//     // }
//     let location = {
//   type: "Point",
//   coordinates: [0,0]
// };

// if (data.latitude && data.longitude) {
//   location = {
//     type: "Point",
//     coordinates: [
//       parseFloat(data.longitude),
//       parseFloat(data.latitude)
//     ]
//   };
// }


//     /* ARRAY FIX */
//     const parseArray = (field) => {
//       if (!data[field]) return [];
//       if (Array.isArray(data[field])) return data[field];
//       return data[field].split(",");
//     };

//     const amenities = parseArray("amenities");
//     const paymentMethods = parseArray("paymentMethods");

//     /* CREATE HOTEL */
//     const hotel = new Hotel({
//       ...data,
//       amenities,
//       paymentMethods,
//       rooms,
//       hotelImages,
//       roomImages,
//       videos,
//       location
//     });

//     await hotel.save();

//     res.status(201).json({
//       success: true,
//       message: "Hotel Added Successfully",
//       hotel
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.addHotel = async (req, res) => {
  try {
    const data = req.body;

    /* ROOMS FIX */
    let rooms = [];
    if (data.rooms) {
      try {
        rooms = typeof data.rooms === "string" ? JSON.parse(data.rooms) : data.rooms;
      } catch {
        rooms = [];
      }
    }

    /* IMAGES */
    let hotelImages = [];
    let roomImages = [];
    let videos = [];

    if (req.files) {
      if (req.files.hotelImages) {
        hotelImages = req.files.hotelImages.map(f => f.path);
      }
      if (req.files.roomImages) {
        roomImages = req.files.roomImages.map(f => f.path);
      }
      if (req.files.videos) {
        videos = req.files.videos.map(f => f.path);
      }
    }

    /* LOCATION FIX */
    let location = {
      type:"Point",
      coordinates:[0,0]
    };

    if (data.latitude && data.longitude) {
      location = {
        type:"Point",
        coordinates:[
          parseFloat(data.longitude),
          parseFloat(data.latitude)
        ]
      };
    }

    /* ARRAY FIX */
    const parseArray = (field) => {
      if (!data[field]) return [];
      if (Array.isArray(data[field])) return data[field];
      return data[field].split(",");
    };

    const amenities = parseArray("amenities");
    const paymentMethods = parseArray("paymentMethods");

    const hotel = new Hotel({
      ...data,
      amenities,
      paymentMethods,
      rooms,
      hotelImages,
      roomImages,
      videos,
      location
    });

    await hotel.save();

    res.status(201).json({
      success:true,
      message:"Hotel Added Successfully",
      hotel
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* =========================================================
   GET ALL HOTELS
========================================================= */
exports.getAllHotels = async (req,res)=>{
 try{
   const hotels = await Hotel.find().sort({createdAt:-1});
   res.json(hotels);
 }catch(err){
   res.status(500).json({error:err.message});
 }
};


/* =========================================================
   SINGLE HOTEL
========================================================= */
exports.getSingleHotel = async (req,res)=>{
 try{
   const hotel = await Hotel.findById(req.params.id);
   res.json(hotel);
 }catch(err){
   res.status(500).json({error:err.message});
 }
};


/* =========================================================
   UPDATE HOTEL
========================================================= */
// exports.updateHotel = async (req,res)=>{
//  try{
//    const hotel = await Hotel.findByIdAndUpdate(
//      req.params.id,
//      req.body,
//      {new:true}
//    );
//    res.json(hotel);
//  }catch(err){
//    res.status(500).json({error:err.message});
//  }
// };

exports.updateHotel = async (req,res)=>{
 try{

   let data = req.body;

   /* rooms parse */
   let rooms = [];
   if (data.rooms) {
     rooms = typeof data.rooms === "string" ? JSON.parse(data.rooms) : data.rooms;
   }

   /* images */
   let hotelImages = [];
   let roomImages = [];
   let videos = [];

   if (req.files) {
     if (req.files.hotelImages) {
       hotelImages = req.files.hotelImages.map(f => f.path);
     }
     if (req.files.roomImages) {
       roomImages = req.files.roomImages.map(f => f.path);
     }
     if (req.files.videos) {
       videos = req.files.videos.map(f => f.path);
     }
   }

   /* location */
   let location = {
     type:"Point",
     coordinates:[0,0]
   };

   if (data.latitude && data.longitude) {
     location = {
       type:"Point",
       coordinates:[
         parseFloat(data.longitude),
         parseFloat(data.latitude)
       ]
     };
   }

   const updated = await Hotel.findByIdAndUpdate(
     req.params.id,
     {
       ...data,
       rooms,
       location,
       ...(hotelImages.length && {hotelImages}),
       ...(roomImages.length && {roomImages}),
       ...(videos.length && {videos})
     },
     {new:true}
   );

   res.json(updated);

 }catch(err){
   res.status(500).json({error:err.message});
 }
};

/* =========================================================
   DELETE HOTEL
========================================================= */
exports.deleteHotel = async (req,res)=>{
 try{
   await Hotel.findByIdAndDelete(req.params.id);
   res.json({message:"Hotel Deleted"});
 }catch(err){
   res.status(500).json({error:err.message});
 }
};


/* =========================================================
   APPROVE HOTEL
========================================================= */
exports.approveHotel = async (req,res)=>{
 try{
   const hotel = await Hotel.findByIdAndUpdate(
     req.params.id,
     {status:"approved"},
     {new:true}
   );
   res.json(hotel);
 }catch(err){
   res.status(500).json({error:err.message});
 }
};


/* =========================================================
   VENDOR HOTELS
========================================================= */
exports.getVendorHotels = async (req,res)=>{
 try{
   const hotels = await Hotel.find({vendorId:req.params.vendorId});
   res.json(hotels);
 }catch(err){
   res.status(500).json({error:err.message});
 }
};


/* =========================================================
   NEARBY HOTELS
========================================================= */
exports.getNearbyHotels = async (req,res)=>{
 try{
   const {lat,lng} = req.query;

   const hotels = await Hotel.find({
     location:{
       $near:{
         $geometry:{
           type:"Point",
           coordinates:[parseFloat(lng),parseFloat(lat)]
         },
         $maxDistance:10000
       }
     }
   });

   res.json(hotels);
 }catch(err){
   res.status(500).json({error:err.message});
 }
};
