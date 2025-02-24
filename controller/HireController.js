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
        console.log("Request Params (Guide ID):", req.params.guideId);
        console.log("Request Body:", req.body);

        const { guideId } = req.params; // Fix: correctly extracting guideId
        const { userId, pickupLocation, pickupDate, pickupTime, noofPeople, pickupType } = req.body;

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





module.exports = {
    findall,
    save
};

