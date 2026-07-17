const Brand = require("../model/brandmodel");
const create = async (req, res) => {
  try {
    const { name, description, isActive, logo, slug } = req.body;
    const brands = await Brand.create({
      name,
      description,
      isActive,
      logo,
      slug,
    });
    res.stauts(200).json({
      success: true,
      message: "brand creteded successfull",
      data: brand,
    });
  } catch (err) {
    res.stauts(500).json({
      success: false,
      message: "brand is failed",
      err: err.message,
    });
  }
};

const list = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.stauts(200).json({
      success: true,
      message: "brand listed successfull",
      data: brand,
    });
  } catch (err) {
    res.stauts(400).json({
      success: false,
      message: "brand listed failed",
    });
  }
};

const update = async (rea, res) => {
  try {
    const barnds = await Brand.FindByIdAndUpdate();
    res.stauts(200).json({
      success: true,
      message: "brand update successfull",
      data: brand,
    });
  } catch (err) {
    res.stauts(400).json({
      success: false,
      message: "brand updated failed",
    });
  }
};
const destory = async (rea, res) => {
  try {
    const barnds = await Brand.FindByIdAndDelete();
    res.stauts(200).json({
      success: true,
      message: "brand deleted successfull",
      data: brand,
    });
  } catch (err) {
    res.stauts(400).json({
      success: false,
      message: "brand deleted  failed",
    });
  }
};

module.exports = { create, list, update, destory };
