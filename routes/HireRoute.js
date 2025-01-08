const express=require("express");
const router=express.Router();
const { findall, save} = require("../controller/HireController");



router.get("/", findall);
router.post("/", save);



module.exports=router;
