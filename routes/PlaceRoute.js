const express=require("express");
const router=express.Router();
const { findall, save, findById, deleteById, update } = require("../controller/PlaceController");
const {authenticateToken,}=require("../security/Auth");





router.get("/", findall);
router.get("/:id",authenticateToken,findById);
router.delete("/:id",authenticateToken,deleteById);
router.put("/:id",authenticateToken,update)



module.exports=router;
