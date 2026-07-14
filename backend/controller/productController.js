const Product = require("../model/productmodel");
const create = async (req, res) => {
  try {
    const { name, details, mrp, saleprice, color, size, brand,category } = req.body;
    const Products = await Product.create({
      name,
      details,
      mrp,
      saleprice,
      color,
      size,
      brand,
      category
    });
    res.status(201).json({
      success: true,
      message: "product create successfull",
      data: Products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "product created failed",
      error: error.message,
    });
  }
};

const list = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json({
      success: true,
      message: "prodcut lists successfull",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "product list failed",
      error: error.message,
    });
  }
};
const update = async (req, res) => {
  try {
    const Products = await Product.findByIdAndUpdate(
      req.params.product_id,
      req.body,
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: "product update successfull",
      data: Products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "product update failed",
      error: error.message,
    });
  }
};
const destroy = async (req, res) => {
  try {
    const deletedCategory = await Product.findByIdAndDelete(
      req.params.product_id,
    );
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "products not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "products deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "product delete failed",
      error: error.message,
    });
  }
};
module.exports = { create, list, update, destroy };
