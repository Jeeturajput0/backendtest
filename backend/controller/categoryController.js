const Category = require("../model/categorymodel");
const create = async (req, res) => {
  try {
    const { title, isActive, slug, image } = req.body;
    const categorys = await Category.create({
      title,
      image,
      isActive,
      slug,
    });

    res.status(201).json({
      success: true,
      message: "category created is successfuly ",
      data: categorys,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "category created is failed",
      error: error.message,
    });
  }
};
const list = async (req, res) => {
  try {
    const categorys = await Category.find();
    res.status(200).json({
      success: true,
      message: "category list is showing",
      data: categorys,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "categorys list is faild",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const categorys = await Category.findByIdAndUpdate(
      req.params.category_id,
      req.body,
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: "category update succefully ",
      data: categorys,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "categorys update is faild",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const categorys = await Category.findByIdAndDelete(req.params.category_id);
    res.status(200).json({
      success: true,
      message: "category deleted succefully ",
      data: error.message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "categorys is deleted faild",
      error: error.message,
    });
  }
};
module.exports = { create, list, update, destroy };
