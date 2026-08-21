const mongoose = require("mongoose");
const Product = require("../../model/productmodel");
const { validSelection } = require("../productController");

const products = async (req, res) => {
  try {
    const data = await Product.find({ vendor: req.user.userId })
      .populate("category")
      .populate("brand", "name")
      .populate("size", "name")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Vendor products fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Vendor products failed",
      error: error.message,
    });
  }
};

const productDetails = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.product_id))
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    const data = await Product.findOne({
      _id: req.params.product_id,
      vendor: req.user.userId,
    })
      .populate("category")
      .populate("brand", "name")
      .populate("size", "name");
    if (!data)
      return res.status(404).json({
        success: false,
        message: "Product not found or access denied",
      });
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product details failed",
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
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
      image,
      variations,
      quantity,
      isActive,
    } = req.body;
    if (!(await validSelection({ brand, size, category })))
      return res.status(400).json({
        success: false,
        message: "Select a brand and size belonging to the selected category",
      });
    const product = await Product.create({
      name,
      details,
      mrp,
      saleprice,
      color,
      size,
      brand,
      category,
      image,
      variations,
      quantity,
      isActive,
      vendor: req.user.userId,
      approvalStatus: "pending",
      approvedAt: null,
      rejectionReason: "",
    });
    res.status(201).json({
      success: true,
      message: "Product submitted for admin approval",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product creation failed",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.product_id,
      vendor: req.user.userId,
    });
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found or access denied",
      });
    const selection = {
      brand: req.body.brand || product.brand,
      size: req.body.size || product.size,
      category: req.body.category || product.category,
    };
    if (!(await validSelection(selection)))
      return res.status(400).json({
        success: false,
        message: "Select a brand and size belonging to the selected category",
      });
    const allowed = [
      "name",
      "details",
      "mrp",
      "saleprice",
      "color",
      "size",
      "brand",
      "category",
      "image",
      "variations",
      "quantity",
      "isActive",
    ];
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) product[key] = req.body[key];
    });
    // Simple safe rule: editing an approved product sends it back for review.
    if (product.approvalStatus === "approved") {
      product.approvalStatus = "pending";
      product.approvedAt = null;
      product.rejectionReason = "";
    }
    await product.save();
    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product update failed",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.product_id,
      vendor: req.user.userId,
    });
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found or access denied",
      });
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product delete failed",
      error: error.message,
    });
  }
};

module.exports = {
  products,
  productDetails,
  createProduct,
  updateProduct,
  deleteProduct,
};
