const Product = require("../model/productmodel");
const Order = require("../model/ordermodel");

// ===============================
// Vendor Dashboard
// ===============================
const dashboard = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    const products = await Product.find({
      vendor: vendorId,
    });

    const totalProducts = products.length;

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalOrders: 0,
        totalSales: 0,
        pendingOrders: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Vendor dashboard failed",
      error: error.message,
    });
  }
};

// ===============================
// Vendor Products
// ===============================
const products = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    const data = await Product.find({
      vendor: vendorId,
    }).populate("category");

    res.status(200).json({
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

// ===============================
// Create Vendor Product
// ===============================
const createProduct = async (req, res) => {
  try {
    const vendorId = req.user.userId;

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
    } = req.body;

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

      // JWT se vendor ID
      vendor: vendorId,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
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

// ===============================
// Update Vendor Product
// ===============================
const updateProduct = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.product_id,
        vendor: vendorId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or access denied",
      });
    }

    res.status(200).json({
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

// ===============================
// Delete Vendor Product
// ===============================
const deleteProduct = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    const product = await Product.findOneAndDelete({
      _id: req.params.product_id,
      vendor: vendorId,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product delete failed",
      error: error.message,
    });
  }
};

module.exports = {
  dashboard,
  products,
  createProduct,
  updateProduct,
  deleteProduct,
};
