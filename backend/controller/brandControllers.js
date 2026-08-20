const mongoose = require("mongoose");
const Brand = require("../model/brandmodel");

const validCategories = (categories) =>
  Array.isArray(categories) &&
  categories.length > 0 &&
  categories.every((id) => mongoose.isValidObjectId(id));

const create = async (req, res) => {
  try {
    const { name, categories, description, isActive } = req.body;
    if (!name?.trim() || !validCategories(categories)) {
      return res.status(400).json({ success: false, message: "Brand name and at least one valid category are required" });
    }

    const brand = await Brand.create({
      name: name.trim(),
      categories: [...new Set(categories.map(String))],
      description: description?.trim(),
      isActive: isActive ?? true,
    });
    res.status(201).json({ success: true, message: "Brand created successfully", data: brand });
  } catch (error) {
    const duplicateField = Object.keys(error.keyPattern || {})[0];
    const message = error.code === 11000
      ? duplicateField === "name"
        ? "A brand with this name already exists. Edit that brand to add more categories."
        : "Brand database indexes are outdated. Run: node scripts/migrateCategoryIndexes.js"
      : error.message;
    res.status(400).json({ success: false, message });
  }
};

const list = async (req, res) => {
  try {
    const { category } = req.query;
    if (category && !mongoose.isValidObjectId(category)) {
      return res.status(400).json({ success: false, message: "Invalid category id" });
    }

    // `category` fallback keeps old records working until the migration is run.
    const query = category ? { $or: [{ categories: category }, { category }] } : {};
    const brands = await Brand.find(query).populate("categories", "title").sort({ name: 1 });
    res.status(200).json({ success: true, data: brands });
  } catch (error) {
    res.status(500).json({ success: false, message: "Brand list failed", error: error.message });
  }
};

const details = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.brand_id).populate("categories", "title");
    if (!brand) return res.status(404).json({ success: false, message: "Brand not found" });
    res.json({ success: true, data: brand });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, categories, description, isActive } = req.body;
    if (!name?.trim() || !validCategories(categories)) {
      return res.status(400).json({ success: false, message: "Brand name and at least one valid category are required" });
    }

    const brand = await Brand.findByIdAndUpdate(
      req.params.brand_id,
      { name: name.trim(), categories: [...new Set(categories.map(String))], description: description?.trim(), isActive },
      { new: true, runValidators: true },
    );
    if (!brand) return res.status(404).json({ success: false, message: "Brand not found" });
    res.json({ success: true, message: "Brand updated successfully", data: brand });
  } catch (error) {
    const duplicateField = Object.keys(error.keyPattern || {})[0];
    const message = error.code === 11000
      ? duplicateField === "name"
        ? "A brand with this name already exists. Edit that brand to add more categories."
        : "Brand database indexes are outdated. Run: node scripts/migrateCategoryIndexes.js"
      : error.message;
    res.status(400).json({ success: false, message });
  }
};

const destroy = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.brand_id);
    if (!brand) return res.status(404).json({ success: false, message: "Brand not found" });
    res.json({ success: true, message: "Brand deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { create, list, details, update, destroy };
