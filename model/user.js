// const { default: mongoose } = require("mongoose");

const mongoose=require("mongoose");

const userSchema =new mongoose.Schema({

    full_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    }
})

const User=mongoose.model("users",userSchema);

module.exports=User;