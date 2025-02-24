const Guide = require("../model/guide");


// Controller to check booking status of a guide
const checkBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const guide = await Guide.findById(id);

        if (!guide) {
            return res.status(404).json({ message: "Guide not found" });
        }

        const bookingStatus = guide.avaiable.toLowerCase() === "yes" ? "Available for booking" : "Not available for booking";
        
        res.status(200).json({
            guideId: guide._id,
            full_name: guide.full_name,
            bookingStatus
        });
    } catch (error) {
        res.status(500).json({ message: "Error checking booking status", error });
    }
};
// Controller to retrieve existing hire data and populate guide field
const getHires = async (req, res) => {
    try {
        const hires = await Hire.find().populate('guide').populate('userId');
        res.status(200).json(hires);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hire data", error });
    }
};

// Controller to save a new guide
const saveGuide = async (req, res) => {
    try {
        const { full_name, price, image, available } = req.body;

        // Ensure all required fields are provided
        if (!full_name || !price || available === undefined) {
            return res.status(400).json({ message: "Full name, price, and availability are required" });
        }

        // Create a new guide
        const guide = new Guide({
            full_name,
            price,
            image: image || "",  // Default to empty string if no image is provided
            avaiable: available  // Ensure field name matches the schema
        });

        // Save the guide to the database
        await guide.save();
        res.status(201).json({ message: "Guide saved successfully", guide });

    } catch (error) {
        res.status(500).json({ message: "Error saving guide", error });
    }
};
// Controller to get guide details and booking status
const getGuideProfile = async (req, res) => {
    try {
        const guides = await Guide.find();
        res.status(200).json(guides);
    } catch (error) {
        res.status(500).json({ message: "Error fetching guides", error });
    }
};

module.exports = {
    getGuideProfile,
    checkBookingStatus,
    saveGuide,
};
