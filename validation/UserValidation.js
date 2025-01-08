const joi= require("joi");
const { model } = require("mongoose");



const Userschema= joi.object({
    full_name:joi.string().required(),
    email:joi.string().required().email(),
    contact:joi.string().required(),
})


function Uservalidation(req,res,next){
    const {full_name,email,contact}=req.body;
    const {error}=Userschema.validate({full_name,email,contact})
    if (error){
    return res.json(error)
    }
    next()
}


module.exports=Uservalidation;