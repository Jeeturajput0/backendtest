const category = require("../model/categorymodel");
const shop = async (req, res) => {
  try {
    const { title, activeIs } = req.body;
    const categorys = category.create({
      title: "",
      activeIs: "",
    });

    res.status(200).json({
      success: true,
      message: "the category is successfuly is create",
      categorys,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "category is failed".error,
    });
  }
};
const list = async (req, res) => {
  try {
    const body = res.body;
    console.log(body);
    const categorys = await category.find();
    res.status(500).json({
      success: true,
      message: "category list is showing",
      categorys,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "categorys is faild".error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const categorys = await category.findByIdAndUpdate(
      id.params.category_Id,
      res.body,
      { new: true },
    );
    res.status(500).json({
      success: true,
      message: "category update succefully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "categorys is faild".error.message,
    });
  }
};

module.exports = { shop, list, update };
