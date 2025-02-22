const Hire = require("../model/hire");

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
        console.log("Request Body:", req.body);

        // Ensure userId is provided
        if (!req.body.userId) {
            return res.status(400).json({ error: "UserId is required" });
        }

        const hiring = new Hire(req.body);
        console.log("Hiring Before Save:", hiring); // Log the hiring document before saving

        await hiring.save();

        const populatedHiring = await Hire.findById(hiring._id).populate('userId');
        console.log("Populated Hiring:", populatedHiring); // Log populated hiring document

        res.status(201).json(populatedHiring);
    } catch (e) {
        console.error("Error:", e.message); // Log the error for debugging
        res.status(500).json({ error: e.message });
    }
};




module.exports = {
    findall,
    save
};
