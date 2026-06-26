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

const protect = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
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