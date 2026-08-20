const mongoose = require("mongoose");
const Size = require("../model/sizemodel");

const validCategories = (categories) =>
  Array.isArray(categories) &&
  categories.length > 0 &&
  categories.every((id) => mongoose.isValidObjectId(id));

const create = async (req, res) => {
  try {
    const { name, categories } = req.body;
    if (!name?.trim() || !validCategories(categories)) {
      return res.status(400).json({ success: false, message: "Size name and at least one valid category are required" });
    }

    const size = await Size.create({ name: name.trim(), categories: [...new Set(categories.map(String))] });
    res.status(201).json({ success: true, message: "Size created successfully", data: size });
  } catch (error) {
    const message = error.code === 11000 ? "A size with this name already exists" : error.message;
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
    const sizes = await Size.find(query).populate("categories", "title").sort({ name: 1 });
    res.status(200).json({ success: true, data: sizes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Size list failed", error: error.message });
  }
};

const details = async (req, res) => {
  try {
    const size = await Size.findById(req.params.size_id).populate("categories", "title");
    if (!size) return res.status(404).json({ success: false, message: "Size not found" });
    res.json({ success: true, data: size });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, categories } = req.body;
    if (!name?.trim() || !validCategories(categories)) {
      return res.status(400).json({ success: false, message: "Size name and at least one valid category are required" });
    }

    const size = await Size.findByIdAndUpdate(
      req.params.size_id,
      { name: name.trim(), categories: [...new Set(categories.map(String))] },
      { new: true, runValidators: true },
    );
    if (!size) return res.status(404).json({ success: false, message: "Size not found" });
    res.json({ success: true, message: "Size updated successfully", data: size });
  } catch (error) {
    const message = error.code === 11000 ? "A size with this name already exists" : error.message;
    res.status(400).json({ success: false, message });
  }
};

const destroy = async (req, res) => {
  try {
    const size = await Size.findByIdAndDelete(req.params.size_id);
    if (!size) return res.status(404).json({ success: false, message: "Size not found" });
    res.json({ success: true, message: "Size deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { create, list, details, update, destroy };
