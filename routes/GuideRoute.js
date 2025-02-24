const express = require("express");
const { getGuideProfile, checkBookingStatus, saveGuide } = require("../controller/guideController");
const router = express.Router();

router.get("/guides", getGuideProfile);
router.get("/guides/:id/status", checkBookingStatus);
router.post("/save", saveGuide);

module.exports = router;
