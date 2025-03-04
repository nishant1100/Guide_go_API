//const { default: mongoose } = require("mongoose");

const mongoose=require("mongoose");

const placeSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    images:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
})

const Place=mongoose.model("places",placeSchema);

module.exports=Place;