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
const update = async (req, res) => {
  try {
    const size = await Size.findByIdAndUpdate(req.params.size_id, req.body, {
      new: true,
    });
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
    const size = await Size.findByIdAndDelete(req.params.size_id, req.body);
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

module.exports = { list, create, update, destory };
