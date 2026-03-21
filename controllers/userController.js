


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ✅ ADMIN REGISTER
exports.registerAdmin = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // 🔥 Only ONE admin allowed
    // const existingAdmin = await User.findOne();

    // if(existingAdmin){
    //   return res.status(400).json({
    //     message:"Admin already exists"
    //   });
    // }

    const hashedPassword = await bcrypt.hash(password,10);

    const admin = await User.create({
      name,
      email,
      password:hashedPassword,
      role:"admin"
    });

    res.status(201).json({
      message:"Admin registered successfully"
    });

  } catch (err) {

    res.status(500).json({
      message:"Registration failed",
      error:err.message
    });

  }
};



// ✅ ADMIN LOGIN
// exports.loginAdmin = async (req, res) => {

//   try {

//     const { email, password } = req.body;

//     const admin = await User.findOne({email});

//     if(!admin){
//       return res.status(400).json({
//         message:"Invalid email or password"
//       });
//     }

//     if(admin.status === "blocked"){
//       return res.status(403).json({
//         message:"Admin is blocked"
//       });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);

//     if(!isMatch){
//       return res.status(400).json({
//         message:"Invalid email or password"
//       });
//     }

//     const token = jwt.sign(
//       {id:admin._id},
//       process.env.JWT_SECRET,
//       {expiresIn:"7d"}
//     );

//     res.status(200).json({
//       message:"Login successful",
//       token,
//       admin
//     });

//   } catch (err) {

//     res.status(500).json({
//       message:"Login failed",
//       error:err.message
//     });

//   }

// };
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (admin.status === "blocked") {
      return res.status(403).json({ message: "Admin is blocked" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 🔥 TOKEN WITH ROLE
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role   // 🔥 IMPORTANT
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin
    });

  } catch (err) {
    res.status(500).json({
      message: "Login failed",
      error: err.message
    });
  }
};




// ✅ GET ADMIN PROFILE (Protected)
exports.getAdminProfile = async (req,res)=>{
  try{

    const admin = await User.findById(req.user.id).select("-password");

    res.json(admin);

  }catch(err){
    res.status(500).json({
      message:"Failed to fetch profile"
    });
  }
};
