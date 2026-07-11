const brand = require("../model/brandmodel")
const create = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    const brands = await brand.create({
      name,
      description,
      isActive,
    });
    res.stauts(200).json({
      success: true,
      message: "brand creteded successfull",
      data:brand
    });
  } catch (err) {
    res.stauts(500).json({
      success: false,
      message: "brand is failed",
      err:err.message
    });
  }
};

const list = async (req, res) => {
  try {
    const brands =await  brand.find();
    res.stauts(200).json({
      success: true,
      message: "brand listed successfull",
    });
  } catch (err) {
    res.stauts(400).json({
      success: false,
      message: "brand listed failed",
    });
  }
};

const update = async (rea,res) => {
    try {
        const barnds = await brand.FindByIdAndUpdate()
        res.stauts(200).json({
      success: true,
      message: "brand update successfull",
    });
    } catch (err) {
        res.stauts(400).json({
      success: false,
      message: "brand updated failed",
    });
    }
}
const destory = async (rea,res) => {
    try {
        const barnds = await brand.FindByIdAndDelete()
        res.stauts(200).json({
      success: true,
      message: "brand deleted successfull",
    });
    } catch (err) {
        res.stauts(400).json({
      success: false,
      message: "brand deleted  failed",
    });
    }
}

module.exports = { create, list,update,destory };
