const Size = require("../model/sizemodel");

const create = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Size name and category are required",
      });
    }

    const exists = await Size.findOne({
      name,
      category,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Size already exists in this category",
      });
    }

    const size = await Size.create({
      name,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Size created successfully",
      data: size,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const list = async (req, res) => {
  try {
    const { category } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    const sizes = await Size.find(query)
      .populate("category", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: sizes,
    });
  } catch (error) {
    console.log("SIZE LIST ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Size list failed",
      error: error.message,
    });
  }
};

const details = async (req, res) => {
  try {
    const size = await Size.findById(req.params.size_id).populate(
      "category",
      "title"
    );

    if (!size) {
      return res.status(404).json({
        success: false,
        message: "Size not found",
      });
    }

    res.json({
      success: true,
      data: size,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const size = await Size.findByIdAndUpdate(
      req.params.size_id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!size) {
      return res.status(404).json({
        success: false,
        message: "Size not found",
      });
    }

    res.json({
      success: true,
      message: "Size updated successfully",
      data: size,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const size = await Size.findByIdAndDelete(req.params.size_id);

    if (!size) {
      return res.status(404).json({
        success: false,
        message: "Size not found",
      });
    }

    res.json({
      success: true,
      message: "Size deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  create,
  list,
  details,
  update,
  destroy,
};