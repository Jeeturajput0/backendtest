const User = require("../model/usermodel");
async function register(req, res) {
  try {
    const { name, email, password, mobile } = req.body;

    const user = await User.create({
      name,
      email,
      password, 
      mobile,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  register,
};