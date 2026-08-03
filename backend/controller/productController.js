const Product = require("../model/productmodel");
const create = async (req, res) => {
  try {
    const {
      name,
      details,
      mrp,
      saleprice,
      color,
      size,
      brand,
      category,
      variations,
      image,
    } = req.body;
    const Products = await Product.create({
      name,
      details,
      mrp,
      saleprice,
      color,
      size,
      brand,
      category,
      variations,
      image,
      vendor: req.user?.role === "vendor" ? req.user.userId : undefined,
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
    let query = {};
    if (req.user?.role === "vendor") query.vendor = req.user.userId;
    if (req.query?.is_active || req.body?.is_active) {
      query.isActive = req.query?.is_active;
    }

    const products = await Product.find(query).populate("category");
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

const details = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await Product.findById(product_id).populate("category");
    if (!product || (req.user?.role === "vendor" && String(product.vendor) !== String(req.user.userId))) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "prodcut detail fetched successful",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "product details failed",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const filter = { _id: req.params.product_id };
    if (req.user?.role === "vendor") filter.vendor = req.user.userId;
    const Products = await Product.findOneAndUpdate(
      filter,
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
    const filter = { _id: req.params.product_id };
    if (req.user?.role === "vendor") filter.vendor = req.user.userId;
    const deletedCategory = await Product.findOneAndDelete(filter);
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
module.exports = { create, list, update, destroy, details };
