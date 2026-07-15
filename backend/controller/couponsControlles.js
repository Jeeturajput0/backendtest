const Coupons = require("../model/couponsmodel");
const create = async (req, res) => {
  try {
    const { code, discount, expiry, StartDate, isActive, usageLimit } =
      req.body;

    const coupon = await Coupons.create({
      code,
      discount,
      expiry,
      StartDate,
      isActive,
      usageLimit,
    });
    res.status(200).json({
      success: true,
      message: "coupons creteded successful",
      data: coupon,
    });
  } catch (err) {
    res.status(200).json({
      success: true,
      message: "coupon update successfull",
      err:err.message ,
    });
  }
};


const list = async (req, res) => {
  try {
    const coupon = await Coupons.find();
    res.status(200).json({
      success: true,
      message: "coupon listed successfull",
      data: coupon,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "coupon listed failed",
    });
  }
};

const update = async (rea, res) => {
  try {
    const coupon = await Coupons.findByIdAndUpdate();
    res.status(200).json({
      success: true,
      message: "coupon update successfull",
      data: coupon,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "coupon updated failed",
    });
  }
};
const destory = async (rea, res) => {
  try {
    const coupon = await Coupons.findByIdAndDelete();
    res.status(200).json({
      success: true,
      message: "coupon deleted successfull",
      data: coupon,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "coupon deleted  failed",
    });
  }
};

const details = async (req, res) => {
  try {
    const coupon = await Coupons.findById(req.params.coupon_id);

    res.status(200).json({
      success: true,
      message: "coupon details fetched successfully",
      data: coupon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "coupon details failed",
      error: error.message,
    });
  }
};


module.exports = { create, list, update, destory,details };
