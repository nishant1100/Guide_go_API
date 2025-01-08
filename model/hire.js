const mongoose = require("mongoose");

const hireSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"  // Ensure this matches the model name for the User collection in your MongoDB
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "places"  // Ensure this matches the model name for the Place collection in your MongoDB
    },
    date: {
        type: String,
        required: true
    },
    timeFrom: {
        type: String,
        required: true
    },
    timeTo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Hire = mongoose.model("hire", hireSchema);

module.exports = Hire;
