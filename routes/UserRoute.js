const express=require("express");
const router=express.Router();
const { findall, save, findById, deleteById, update } = require("../controller/UserController");
const Uservalidation=require("../validation/UserValidation")


router.get("/", findall);
router.post("/",Uservalidation,save);
router.get("/:id",findById);
router.delete("/:id",deleteById);
router.put("/:id",update)



module.exports=router;
