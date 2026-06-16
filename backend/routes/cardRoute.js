const express=require("express")
const router=express.Router()
const {getcard,createcard}=require("../controller/cardcontroller");

router.get("/getcard", getcard);

router.post("/createcard", createcard);
module.exports=router;



