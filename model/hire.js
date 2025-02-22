const { required } = require("joi");
const mongoose = require("mongoose");

const hireSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"  // Ensure this matches the model name for the User collection in your MongoDB
    },
    pickupLocation: {
        type:String,
        required: true
    },
    pickupDate: {
        type: String,
        required: true
    },
    pickupTime: {
        type: String,
        required: true
    },
    noofPeople:{
        type:String,
        required: true
    },

    pickupType: {
        type: String,
        required: true
    }
});

const Hire = mongoose.model("hire", hireSchema);

module.exports = Hire;
