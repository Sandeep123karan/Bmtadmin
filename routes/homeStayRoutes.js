const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controllers/homeStayController");

/* MULTER */
const storage = multer.diskStorage({
 destination:(req,file,cb)=>cb(null,"uploads/"),
 filename:(req,file,cb)=>cb(null,Date.now()+"-"+file.originalname)
});
const upload = multer({storage});

/* ADD HOMESTAY */
router.post(
 "/add",
 upload.fields([
  {name:"thumbnail",maxCount:1},
  {name:"gallery",maxCount:10},

  /* OWNER DOC */
  {name:"aadharFront",maxCount:1},
  {name:"aadharBack",maxCount:1},
  {name:"panCardImage",maxCount:1},
  {name:"passportImage",maxCount:1},
  {name:"propertyProof",maxCount:1},
  {name:"agreementCopy",maxCount:1},
  {name:"electricityBill",maxCount:1}
 ]),
 controller.addHomeStay
);

/* ADMIN */
router.get("/admin/all",controller.getAllHomeStayAdmin);
router.put("/approve/:id",controller.approveHomeStay);
router.put("/reject/:id",controller.rejectHomeStay);
router.delete("/delete/:id",controller.deleteHomeStay);
router.put("/update/:id",controller.updateHomeStay);

/* USER */
router.get("/approved",controller.getApprovedHomeStay);

module.exports = router;