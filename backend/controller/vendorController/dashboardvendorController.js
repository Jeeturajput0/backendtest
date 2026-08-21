const Product = require("../../model/productmodel");

const dashboard = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user.userId });
    res.json({
      success: true,
      data: {
        totalProducts: products.length,
        totalOrders: 0,
        totalSales: 0,
        pendingOrders: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Vendor dashboard failed",
      error: error.message,
    });
  }
};

module.exports = {
  dashboard,
};
