const Colors=require("../model/colormodel")
const create=async(req,res)=>{
    try {
  
    const { name,code,isActive } = req.body;

    const color = await Colors.create({
      name,
      code,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "color created successfully",
      data: color,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "color creation failed",
      error: error.message,
    });
  }
};


const list = async (req, res) => {
  try {
    const color = await Colors.find();

    res.status(200).json({
      success: true,
      data: color,
      message:"color list is successful"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const details = async (req, res) => {
  try {
    const color = await Colors.findById(req.params.color_id);

    res.status(200).json({
      success: true,
      message: "color details fetched successfully",
      data: color,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "color details failed",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const color = await Colors.findByIdAndUpdate(req.params.color_id, req.body, {
      new: true,
     
    });


    res.status(200).json({
      success: true,
      message: "color updated successfully",
      data: color,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "color update failed",
      error: error.message,
    });
  }
};

const destory = async (req, res) => {
  try {
    const color = await Colors.findByIdAndDelete(req.params.color_id);

 

    res.status(200).json({
      success: true,
      message: "color deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "color delete failed",
      error: error.message,
    });
  }
};

module.exports = {
  create,
  list,
  details,
  update,
  destory,
};
