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
    res.status(201).json({
      success: true,
      message: "brand creteded successfull",
      data: brands,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "brand is failed",
      err: err.message,
    });
  }
};

const list = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({
      success: true,
      message: "brand listed successfull",
      data: brands,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "brand listed failed",
    });
  }
};

const update = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.brand_id, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: "brand update successfull",
      data: brand,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "brand updated failed",
    });
  }
};
const destory = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.brand_id);
    res.status(200).json({
      success: true,
      message: "brand deleted successfull",
      data: brand,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "brand deleted  failed",
    });
  }
};

module.exports = { create, list, update, destory };
