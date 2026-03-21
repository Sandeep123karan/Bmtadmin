

// const express = require("express");
// const router = express.Router();
// const darshanController = require("../controllers/darshanController");

// router.post("/", darshanController.upload.single("image"), darshanController.createDarshan);
// router.get("/", darshanController.getDarshans);
// router.get("/:id", darshanController.getDarshanById);
// router.put("/:id", darshanController.upload.single("image"), darshanController.updateDarshan);
// router.delete("/:id", darshanController.deleteDarshan);

// module.exports = router;



const express = require("express");
const router = express.Router();
const darshanController = require("../controllers/darshanController");

router.post("/", darshanController.upload.array("images",10), darshanController.createDarshan);
router.get("/", darshanController.getDarshans);
router.put("/:id", darshanController.upload.array("images",10), darshanController.updateDarshan);
router.delete("/:id", darshanController.deleteDarshan);

module.exports = router;
