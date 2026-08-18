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
      isActive,
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
      image, vendor: req.user.userId,
      isActive: isActive !== undefined ? isActive === true || isActive === "true" : true,
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
    const isActive = req.query?.is_active ?? req.query?.isActive;
    if (isActive !== undefined && isActive !== "") {
      query.isActive = isActive === "true" || isActive === true;
    }
    if (req.query?.search?.trim()) {
      query.name = { $regex: req.query.search.trim(), $options: "i" };
    }

    const products = await Product.find(query,{vendor: req.user.userId,}).populate("category");
    if (!product) {
  return res.status(404).json({
    success: false,
    message: "Product not found or access denied",
  });
}
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
    const Products = await Product.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true,
    });

    if (!Products) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
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
