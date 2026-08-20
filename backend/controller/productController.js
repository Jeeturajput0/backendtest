const mongoose = require("mongoose");
const Product = require("../model/productmodel");
const Brand = require("../model/brandmodel");
const Size = require("../model/sizemodel");

const publicPopulate = (query) => query.populate("category");
const adminPopulate = (query) => query.populate("category").populate("vendor", "name email");

const validSelection = async ({ brand, size, category }) => {
  if (!mongoose.isValidObjectId(brand) || !mongoose.isValidObjectId(size) || !mongoose.isValidObjectId(category)) return false;
  const [brandExists, sizeExists] = await Promise.all([
    Brand.exists({ _id: brand, $or: [{ categories: category }, { category }] }),
    Size.exists({ _id: size, $or: [{ categories: category }, { category }] }),
  ]);
  return Boolean(brandExists && sizeExists);
};

// Admin creates products directly. They are approved immediately.
const create = async (req, res) => {
  try {
    if (!(await validSelection(req.body))) return res.status(400).json({ success: false, message: "Select a brand and size belonging to the selected category" });
    const product = await Product.create({
      ...req.body,
      vendor: req.user.userId,
      approvalStatus: "approved",
      approvedAt: new Date(),
      rejectionReason: "",
    });
    res.status(201).json({ success: true, message: "Product created successfully", data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: "Product creation failed", error: error.message });
  }
};

// Admin list: every product, including pending and rejected vendor products.
const list = async (req, res) => {
  try {
    const query = {};
    const isActive = req.query.is_active ?? req.query.isActive;
    if (isActive !== undefined && isActive !== "") query.isActive = isActive === "true" || isActive === true;
    if (req.query.search?.trim()) query.name = { $regex: req.query.search.trim(), $options: "i" };
    const products = await adminPopulate(Product.find(query).sort({ createdAt: -1 }));
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Product list failed", error: error.message });
  }
};

// Public APIs are intentionally restricted to approved products.
const publicList = async (req, res) => {
  try {
    const query = { approvalStatus: "approved", isActive: true };
    if (req.query.search?.trim()) query.name = { $regex: req.query.search.trim(), $options: "i" };
    const products = await publicPopulate(Product.find(query).sort({ createdAt: -1 }));
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Product list failed", error: error.message });
  }
};

const details = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.product_id)) return res.status(404).json({ success: false, message: "Product not available" });
    const product = await publicPopulate(Product.findOne({ _id: req.params.product_id, approvalStatus: "approved", isActive: true }));
    if (!product) return res.status(404).json({ success: false, message: "Product not available" });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Product details failed", error: error.message });
  }
};

const adminDetails = async (req, res) => {
  try {
    const product = await adminPopulate(Product.findById(req.params.product_id));
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid product id", error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const current = await Product.findById(req.params.product_id);
    if (!current) return res.status(404).json({ success: false, message: "Product not found" });
    const selection = { brand: req.body.brand || current.brand, size: req.body.size || current.size, category: req.body.category || current.category };
    if (!(await validSelection(selection))) return res.status(400).json({ success: false, message: "Select a brand and size belonging to the selected category" });
    delete req.body.vendor; delete req.body.approvalStatus; delete req.body.approvedAt; delete req.body.rejectionReason;
    const product = await Product.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators: true });
    res.json({ success: true, message: "Product updated successfully", data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: "Product update failed", error: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.product_id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Product delete failed", error: error.message });
  }
};

const approve = async (req, res) => {
  try {
    const product = await Product.findById(req.params.product_id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    if (product.approvalStatus === "approved") return res.status(400).json({ success: false, message: "Product is already approved" });
    product.approvalStatus = "approved"; product.approvedAt = new Date(); product.rejectionReason = "";
    await product.save();
    res.json({ success: true, message: "Product approved successfully", data: product });
  } catch (error) { res.status(400).json({ success: false, message: "Product approval failed", error: error.message }); }
};

const reject = async (req, res) => {
  try {
    const reason = req.body.reason?.trim();
    if (!reason) return res.status(400).json({ success: false, message: "Rejection reason is required" });
    const product = await Product.findById(req.params.product_id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    if (product.approvalStatus === "rejected") return res.status(400).json({ success: false, message: "Product is already rejected" });
    product.approvalStatus = "rejected"; product.rejectionReason = reason; product.approvedAt = null;
    await product.save();
    res.json({ success: true, message: "Product rejected", data: product });
  } catch (error) { res.status(400).json({ success: false, message: "Product rejection failed", error: error.message }); }
};

module.exports = { create, list, publicList, details, adminDetails, update, destroy, approve, reject, validSelection };
