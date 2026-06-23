const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      res.status(500).json({
        success: false,
        message: "Authontication field",
      });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.data;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Authontication field",
    });
  }
};

module.exports = authMiddleware;