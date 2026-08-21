const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const dashboardvendorController = require("../controller/vendorController/dashboardvendorController");
const productvendorController = require("../controller/vendorController/productvendorController");
const orderController = require("../controller/vendorController/ordervendorController");
const categoryController = require("../controller/categoryController");
const brandController = require("../controller/brandControllers");
const sizeController = require("../controller/sizeController");

router.get("/dashboard", protect, role("vendor"), dashboardvendorController.dashboard);

router.get("/products", protect, role("vendor"), productvendorController.products);
router.post("/products", protect, role("vendor"), productvendorController.createProduct);
router.get("/products/:product_id", protect, role("vendor"), productvendorController.productDetails);
router.put("/products/:product_id", protect, role("vendor"), productvendorController.updateProduct);
router.delete("/products/:product_id", protect, role("vendor"), productvendorController.deleteProduct);

// Vendors can read the master catalogue in order to create valid products.
router.get("/catalog/category", protect, role("vendor"), categoryController.list);
router.get("/catalog/brand", protect, role("vendor"), brandController.list);
router.get("/catalog/size", protect, role("vendor"), sizeController.list);

router.get("/orders", protect, role("vendor"), orderController.list);
module.exports = router;
