const Brand = require("../model/brandmodel");

const create = async (req, res) => {
  try {
    const { name, category, description, isActive } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Brand name and category are required",
      });
    }

    const exists = await Brand.findOne({
      name,
      category,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Brand already exists in this category",
      });
    }

    const brand = await Brand.create({
      name,
      category,
      description,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      success: true,
      message: "Brand created successfully",
      data: brand,
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

    const brands = await Brand.find(query)
      .populate("category", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: brands,
    });
  } catch (error) {
    console.log("BRAND LIST ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Brand list failed",
      error: error.message,
    });
  }
};

const details = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.brand_id).populate(
      "category",
      "title"
    );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.json({
      success: true,
      data: brand,
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
    const brand = await Brand.findByIdAndUpdate(
      req.params.brand_id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.json({
      success: true,
      message: "Brand updated successfully",
      data: brand,
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
    const brand = await Brand.findByIdAndDelete(req.params.brand_id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.json({
      success: true,
      message: "Brand deleted successfully",
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
