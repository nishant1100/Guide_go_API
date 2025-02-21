const express = require("express");
const multer = require("multer");
const router = express.Router();
const { findall, save, findById, deleteById, update } = require("../controller/PlaceController");
const { authenticateToken } = require("../security/Auth");

// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "place_images/"); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Define routes
router.get("/", findall);
router.get("/:id", findById);
router.delete("/:id", deleteById);
router.put("/:id", update);
router.post("/save", upload.single("file"), save); 

module.exports = router;

