// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     if (!token) {
//       res.status(500).json({
//         success: false,
//         message: "Authontication field",
//       });
//     }
//     const data = jwt.verify(token, process.env.JWT_SECRET);
//     req.data;
//     next();
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Authontication field",
//     });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");

const protect = async (req, res, next) => {
  try {
const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("_id email role");
    if (!user) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }
    // Use the role currently stored in the database, not a stale JWT claim.
    req.user = { userId: user._id.toString(), email: user.email, role: user.role };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token is not valid",
      error: error.message,
    });
  }
};

module.exports = { protect };
