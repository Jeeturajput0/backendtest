const express=require("express")
const router=express.Router()
const {getcard,createcard, updatecard}=require("../controller/cardcontroller");

router.get("/getcard", getcard);

router.post("/createcard", createcard);
router.post("/update", updatecard);
module.exports=router;



