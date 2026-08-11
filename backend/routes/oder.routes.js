const express = require("express");
const router = express.Router();

const {
  create,
  list,
  myOrders,
  details,
  update,
  destroy,
} = require("../controller/orderController");

const { protect } = require("../middleware/auth.middleware");

// =============================
// Customer
// =============================

// Place Order
router.post("/", protect, create);

// Logged in user orders
router.get("/my-orders", protect, myOrders);

// Order Details
router.get("/:order_id", protect, details);
router.get("/order/:order_id", protect,details);
// =============================
// Admin
// =============================

// All Orders
router.get("/", protect, list);

// Update Order
router.put("/:order_id", protect, update);

// Delete Order
router.delete("/:order_id", protect, destroy);

module.exports = router;
