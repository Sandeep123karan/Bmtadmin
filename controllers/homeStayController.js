const HomeStay = require("../models/homeStayModel");

/* ================= HELPER ================= */
const parseArray = (field)=>{
  if(!field) return [];
  if(Array.isArray(field)) return field;
  if(typeof field==="string") return field.split(",");
  return [];
};

/* =====================================================
   ADD HOMESTAY
===================================================== */
exports.addHomeStay = async (req,res)=>{
try{

const data = req.body;

/* AMENITIES */
const amenities = parseArray(data.amenities);

/* OWNER JSON PARSE */
let owner = {};
if(data.owner){
  owner = typeof data.owner === "string" ? JSON.parse(data.owner) : data.owner;
}

/* IMAGES */
let thumbnail="";
let gallery=[];

/* OWNER DOC IMAGES */
if(req.files){

 if(req.files.thumbnail)
   thumbnail = req.files.thumbnail[0].filename;

 if(req.files.gallery)
   gallery = req.files.gallery.map(f=>f.filename);

 /* OWNER DOCS */
 if(owner){
   if(req.files.aadharFront) owner.aadharFront=req.files.aadharFront[0].filename;
   if(req.files.aadharBack) owner.aadharBack=req.files.aadharBack[0].filename;
   if(req.files.panCardImage) owner.panCardImage=req.files.panCardImage[0].filename;
   if(req.files.passportImage) owner.passportImage=req.files.passportImage[0].filename;
   if(req.files.propertyProof) owner.propertyProof=req.files.propertyProof[0].filename;
   if(req.files.agreementCopy) owner.agreementCopy=req.files.agreementCopy[0].filename;
   if(req.files.electricityBill) owner.electricityBill=req.files.electricityBill[0].filename;
 }
}

/* CREATE */
const homeStay = new HomeStay({
 ...data,
 amenities,
 owner,
 thumbnail,
 gallery,
 status:data.addedBy==="admin"?"approved":"pending"
});

await homeStay.save();

res.json({
 success:true,
 message:"HomeStay added successfully",
 homeStay
});

}catch(err){
 console.log("❌ ADD HOMESTAY ERROR",err);
 res.status(500).json({message:err.message});
}
};

/* =====================================================
   ADMIN ALL
===================================================== */
exports.getAllHomeStayAdmin = async(req,res)=>{
try{
const data = await HomeStay.find().sort({createdAt:-1});
res.json({success:true,data});
}catch(err){
res.status(500).json({message:err.message});
}
};

/* =====================================================
   APPROVED USER
===================================================== */
exports.getApprovedHomeStay = async(req,res)=>{
try{
const data = await HomeStay.find({status:"approved"});
res.json({success:true,data});
}catch(err){
res.status(500).json({message:err.message});
}
};

/* =====================================================
   APPROVE
===================================================== */
exports.approveHomeStay = async(req,res)=>{
try{
const data = await HomeStay.findByIdAndUpdate(
 req.params.id,
 {status:"approved"},
 {new:true}
);
res.json({success:true,message:"Approved",data});
}catch(err){
res.status(500).json({message:err.message});
}
};

/* =====================================================
   REJECT
===================================================== */
exports.rejectHomeStay = async(req,res)=>{
try{
const data = await HomeStay.findByIdAndUpdate(
 req.params.id,
 {status:"rejected"},
 {new:true}
);
res.json({success:true,message:"Rejected",data});
}catch(err){
res.status(500).json({message:err.message});
}
};

/* =====================================================
   DELETE
===================================================== */
exports.deleteHomeStay = async(req,res)=>{
try{
await HomeStay.findByIdAndDelete(req.params.id);
res.json({success:true,message:"Deleted"});
}catch(err){
res.status(500).json({message:err.message});
}
};

/* =====================================================
   UPDATE
===================================================== */
exports.updateHomeStay = async(req,res)=>{
try{
const data = await HomeStay.findByIdAndUpdate(
 req.params.id,
 req.body,
 {new:true}
);
res.json({success:true,message:"Updated",data});
}catch(err){
res.status(500).json({message:err.message});
}
};