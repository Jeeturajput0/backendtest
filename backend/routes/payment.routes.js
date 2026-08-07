const express=require("express");
const router=express.Router();
const {createPayment,verifyPayment}=require("../controller/paymentController");
const { protect } = require("../middleware/auth.middleware");

router.post("/create", protect, createPayment);
router.post("/verify", protect, verifyPayment);

module.exports=router;
