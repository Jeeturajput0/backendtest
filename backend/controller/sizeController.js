const Size = require("../model/sizemodel");
const create = async (req, res) => {
  try {
    const { name } = req.body;
    const sizes = await Size.create({
      name,
    });
    res.status(200).json({
      success: true,
      message: "size create successful",
      data: sizes,
    });
    
  } catch (error) {
   res.status(400).json({
      success: false,
      message: "size creating is failed",
      error: error.message,
    });
  }
};

const list = async (req, res) => {
  try {
    const size = await Size.find();
    res.status(200).json({
      success: true,
      message: "size list successful",
      data: size,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "size list is failed",
      error: error.message,
    });
  }
};
const details = async (req, res) => {
  try {
    const size = await Size.findById(req.params.size_id);
    if (!size) {
      return res.status(404).json({ success: false, message: "Size not found" });
    }
    return res.status(200).json({
      success: true,
      message: "size details successful",
      data: size,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "size details failed",
      error: error.message,
    });
  }
};
const update = async (req, res) => {
  try {
    const size = await Size.findByIdAndUpdate(req.params.size_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!size) {
      return res.status(404).json({ success: false, message: "Size not found" });
    }
    res.status(200).json({
      success: true,
      message: "size update successful",
      data: size,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "size update is failed",
      error: error.message,
    });
  }
};
const destory = async (req, res) => {
  try {
    const size = await Size.findByIdAndDelete(req.params.size_id);
    if (!size) {
      return res.status(404).json({ success: false, message: "Size not found" });
    }
    res.status(200).json({
      success: true,
      message: "size delete successful",
      data: size,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "size delete is failed",
      error: error.message,
    });
  }
};

module.exports = { list, details, create, update, destory };
