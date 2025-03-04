const express = require("express");
const { save,getBookingById,findall, getUserHires } = require("../controller/HireController");
const router = express.Router();

// Route to create a new booking (hire a guide)
router.post("/", save);

// Route to get all bookings with populated guide and user details
router.get("/", findall);
router.get('/get/:bookingId', getBookingById);  // :bookingId is the dynamic route parameter
router.get('/user/:userId',getUserHires)

module.exports = router;
