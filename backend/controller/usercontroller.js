const bcrypt = require("bcrypt");
const User = require("../model/usermodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const sanitizeUser = (user) => {
  const userData = user.toObject ? user.toObject() : { ...user };
  delete userData.password;
  return userData;
};

const normalizeRole = (role) =>
  String(role || "customer").trim().toLowerCase() === "vendor"
    ? "vendor"
    : "customer";

const normalizedEmail = (email) => String(email || "").trim().toLowerCase();

const createToken = (user) =>
  jwt.sign(
    { userId: user._id.toString(), email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "14d" },
  );

const register = async (req, res) => {
  try {
    const { password, name, mobile ,role = "customer"} = req.body;
    const email = normalizedEmail(req.body.email);
    const safeRole = normalizeRole(role);
    if (!email || !password || !name || !mobile) {
      return res.status(400).json({ success: false, message: "Name, mobile, email and password are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "user are already exists",
      });
    }
    if (String(role).toLowerCase() === "admin") {
  return res.status(403).json({
    success: false,
    message: "Admin registration is not allowed",
  });
}

    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS || 12));
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: safeRole,
    });

    const token = createToken(user);
    const userData = sanitizeUser(user);

    res.status(200).json({
      success: true,
      message: "user register successfully",
      data: userData,
      user: userData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
   const { password } = req.body;
   const email = normalizedEmail(req.body.email);
   if (!email || !password) {
     return res.status(400).json({ success: false, message: "Email and password are required" });
   }

const user = await User.findOne({ email }).select("+password");

if (!user || !user.password) {
 return res.status(401).json({
    success:false,
    message:"Invalid email or password"
});
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(400).json({
    success: false,
    message: "Invalid email or password",
  });
}

const token = createToken(user);

    const userData = sanitizeUser(user);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: userData,
      user: userData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// This endpoint deliberately accepts only accounts whose database role is admin.
// Regular customers and vendors must continue to use /api/user/login.
const adminLogin = async (req, res) => {
  try {
    const { password } = req.body;
    const email = normalizedEmail(req.body.email);
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const admin = await User.findOne({ email, role: "admin" }).select("+password");
    if (!admin || !admin.password || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ success: false, message: "Invalid admin email or password" });
    }

    const user = sanitizeUser(admin);
    return res.json({ success: true, message: "Admin login successful", data: user, user, token: createToken(admin) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateAdminCredentials = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const email = normalizedEmail(req.body.email);
    if (!currentPassword) {
      return res.status(400).json({ success: false, message: "Current password is required" });
    }
    if (!email && !newPassword) {
      return res.status(400).json({ success: false, message: "Provide a new email or password" });
    }
    if (newPassword && newPassword.length < 8) {
      return res.status(400).json({ success: false, message: "New password must be at least 8 characters" });
    }

    const admin = await User.findById(req.user.userId).select("+password");
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }
    if (!(await bcrypt.compare(currentPassword, admin.password))) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }
    if (email && email !== admin.email) {
      const emailInUse = await User.exists({ email, _id: { $ne: admin._id } });
      if (emailInUse) return res.status(409).json({ success: false, message: "Email is already in use" });
      admin.email = email;
    }
    if (newPassword) admin.password = await bcrypt.hash(newPassword, Number(process.env.BCRYPT_ROUNDS || 12));
    await admin.save();

    const user = sanitizeUser(admin);
    return res.json({
      success: true,
      message: "Admin credentials updated successfully",
      data: user,
      user,
      token: createToken(admin),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, adminLogin, updateAdminCredentials };

// const User = require("../model/user.model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// async function register(req, res) {
//   try {
//     const body = req.body;

//     const existingUser = await User.findOne({ email: body.email });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(body.password, 10);
//     body.password = hashedPassword;
//     const user = await User.create(body);
//     const token = jwt.sign(
//       {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1m",
//       },
//     );

//     body._id = user._id;
//     body.token = token;
//     delete body.password;

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       data: body,
//     });
//   } catch (error) {
//     console.log("Register Error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }
// async function login(req, res) {
//   console.log("Login Request:", req.body);
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Password",
//       });
//     }

//     const userData = user.toObject();

//     console.log("Logged In User:", user);
//     const token = jwt.sign(
//       {
//         id: user._id,
//         email: user.email,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d",
//       },
//     );

//     userData.token = token;
//     delete userData.password;

//     res.status(200).json({
//       success: true,
//       message: "Login Successful",
//       data: userData,
//     });
//   } catch (error) {
//     console.log("Login Error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }
// module.exports = {
//   register,
//   login,
// };
