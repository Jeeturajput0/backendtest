const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const vendorController = require("../controller/vendorController");

router.get("/dashboard", protect, role("vendor"), vendorController.dashboard);

router.get("/products", protect, role("vendor"), vendorController.products);
router.post("/products", protect, role("vendor"), vendorController.createProduct);
router.put("/products/:product_id", protect, role("vendor"), vendorController.updateProduct);
router.delete("/products/:product_id", protect, role("vendor"), vendorController.deleteProduct);

module.exports = router;
