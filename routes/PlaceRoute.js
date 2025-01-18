const express=require("express");
const router=express.Router();
const { findall, save, findById, deleteById, update } = require("../controller/PlaceController");
const {authenticateToken,}=require("../security/Auth");


const multer= require("multer")
const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'place_images')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage})


router.get("/", findall);
router.post("/",authenticateToken, upload.single('file'),save);
router.get("/:id",authenticateToken,findById);
router.delete("/:id",authenticateToken,deleteById);
router.put("/:id",authenticateToken,update)



module.exports=router;
