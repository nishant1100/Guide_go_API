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


router.get("/",authenticateToken, findall);
router.post("/", upload.single('file'),save);
router.get("/:id",findById);
router.delete("/:id",deleteById);
router.put("/:id",update)



module.exports=router;
