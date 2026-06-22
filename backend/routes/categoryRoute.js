const express= require("express")
const router =express.Router()

const {shop,list}=require("../controller/categoryController")
router.post("/shop",shop)
router.post("/list",list)
router.post("/update/:id",list)
module.exports=router;