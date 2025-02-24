const express = require("express");
const { save } = require("../controller/HireController");
const router = express.Router();

// Route to create a new booking (hire a guide)
router.post("/:guideId", save);

// Route to get all bookings with populated guide and user details
//router.get("/", getHires);

module.exports = router;
