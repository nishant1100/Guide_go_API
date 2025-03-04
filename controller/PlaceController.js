const Place = require('../model/place');

const findall = async (req, res) => {
    try {
        const places = await Place.find();
        res.status(200).json(places);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const save = async (req, res) => {
    try {
        const { name, location, description } = req.body;
        const place = new Place({
            name,
            location,
            description,
            images: req.file.originalname,
        });
        await place.save();
        res.status(201).json(place);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const findById = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }
        res.status(200).json(place);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }
        res.status(200).json({ message: "Place deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const update = async (req, res) => {
    try {
        const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }
        res.status(200).json(place);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
    findall,
    save,
    findById,
    deleteById,
    update,
};
