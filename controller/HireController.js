const Hire = require("../model/hire");
const Guide = require("../model/guide")

const findall = async (req, res) => {
    try {
        const hiring = await Hire.find();
        res.status(200).json(hiring);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const save = async (req, res) => {
    try {
        // console.log("Request Params (Guide ID):", req.params.guideId);
        console.log("Request Body:", req.body);

        // const { guideId } = req.params; // Fix: correctly extracting guideId
        const { userId, pickupLocation, pickupDate, pickupTime, noofPeople, pickupType,guideId } = req.body;

        // Ensure required fields are provided
        if (!guideId) {
            return res.status(400).json({ error: "GuideId is required" });
        }
        

        // Find the guide and update availability
        const guide = await Guide.findById(guideId);
        if (!guide) {
            return res.status(404).json({ error: "Guide not found" });
        }

        guide.avaiable = "no"; // Mark guide as unavailable
        await guide.save();

        // Create new booking
        const hiring = new Hire({
            userId,
            pickupLocation: pickupLocation,  // Mapping correct field
            pickupDate: pickupDate,
            pickupTime: pickupTime,
            noofPeople: noofPeople,
            pickupType: pickupType,
            guideId: guideId
        });
        

        console.log("Hiring Before Save:", hiring);

        await hiring.save();

        const populatedHiring = await Hire.findById(hiring._id)
            .populate('userId')
            .populate('guideId');

        console.log("Populated Hiring:", populatedHiring);

        res.status(201).json(populatedHiring);
    } catch (e) {
        console.error("Error:", e.message);
        res.status(500).json({ error: e.message });
    }
};

const getBookingById = async (req, res) => {
    try {
        const { bookingId } = req.params;  // Extract bookingId from the request parameters

        // Find booking by ID and populate related fields (e.g., guide, user)
        const booking = await Hire.findById(bookingId)
            .populate('userId')   // Populate the user data (if needed)
            .populate('guideId'); // Populate the guide data (if needed)

        // If booking doesn't exist
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Send the booking data as response
        res.status(200).json(booking);
    } catch (e) {
        console.error("Error:", e.message);
        res.status(500).json({ error: "Failed to fetch booking" });
    }
};

const getUserHires = async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from URL params

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const hires = await Hire.find({ userId })
            .populate('guideId')  // Populate guide details
            .populate('userId');  // Populate user details if needed

        if (!hires.length) {
            return res.status(404).json({ error: "No bookings found for this user" });
        }

        res.status(200).json(hires);
    } catch (e) {
        console.error("Error fetching user hires:", e.message);
        res.status(500).json({ error: "Failed to fetch user hires" });
    }
};



module.exports = {
    findall,
    getUserHires,
    save,
    getBookingById
};

