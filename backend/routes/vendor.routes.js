const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const vendorController = require("../controller/vendorController");
const categoryController = require("../controller/categoryController");
const brandController = require("../controller/brandControllers");
const sizeController = require("../controller/sizeController");

router.get("/dashboard", protect, role("vendor"), vendorController.dashboard);

router.get("/products", protect, role("vendor"), vendorController.products);
router.post("/products", protect, role("vendor"), vendorController.createProduct);
router.get("/products/:product_id", protect, role("vendor"), vendorController.productDetails);
router.put("/products/:product_id", protect, role("vendor"), vendorController.updateProduct);
router.delete("/products/:product_id", protect, role("vendor"), vendorController.deleteProduct);

router.get("/catalog/category", protect, role("vendor"), categoryController.list);
router.get("/catalog/brand", protect, role("vendor"), brandController.list);
router.get("/catalog/size", protect, role("vendor"), sizeController.list);

module.exports = router;
