// const User = require("../model/usermodel");
// async function register(req, res) {
//   try {
//     const { name, email, password, mobile } = req.body;

//     const user = await User.create({
//       name,
//       email,
//       password, 
//       mobile,
//     });

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }

// module.exports = {
//   register,
// };
const bcrypt =require("bcrypt")
const User=require("../model/usermodel")
const jwt =require("jsonwebtoken")
require("dotenv").config();

const register =async (req,res) =>{
  try{
    console.log(req.body)
  const {email,password,name,mobile}=req.body;
    const userExists = await User.findOne({email})
    if(userExists){
      return res.status(400).json({
        success:false,
        message:"user are already exists"
      });
    }

    const hashedPassword =await bcrypt.hash(password,4)
    const user =await User.create({
      name,
      email,
      mobile,
      password:hashedPassword
    })

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    console.log("token",token);
    
  res.status(200).json({
  success: true,
  message: "user register successfully",
  user,
  token,
});

  }catch(error){
    res.status(500).json({
      success:false,
      message:error.message
       })
  }

}
const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        userid: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "4d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports={register,login,};