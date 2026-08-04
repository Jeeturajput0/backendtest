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
const role = require("../middleware/role.middleware");

// =============================
// Customer
// =============================

// Place Order
router.post("/", protect, create);

// Logged in user orders
router.get("/my-orders", protect, myOrders);

// Order Details
router.get("/:order_id", protect, details);

// =============================
// Admin
// =============================

// All Orders
router.get("/", protect, role("admin"), list);

// Update Order
router.put("/:order_id", protect, role("admin"), update);

// Delete Order
router.delete("/:order_id", protect, role("admin"), destroy);

module.exports = router;