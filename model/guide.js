// const { default: mongoose } = require("mongoose");

const mongoose=require("mongoose");

const guideSchema =new mongoose.Schema({

    full_name:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    image: {
        type: String,
        require:false
    },
    avaiable:{
        type:String,
        require:true
    },

})

const Guide=mongoose.model("guide",guideSchema);

module.exports=Guide;