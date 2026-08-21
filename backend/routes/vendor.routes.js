const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const dashboardvendorController = require("../controller/vendorController/dashboardvendorController");
const productvendorController = require("../controller/vendorController/productvendorController");
const orderController = require("../controller/vendorController/ordervendorController");
// const brandController = require("../controller/vendorController/brandControllers");
// const sizeController = require("../controller/vendorController/sizeController");

router.get("/dashboard", protect, role("vendor"), dashboardvendorController.dashboard);

router.get("/products", protect, role("vendor"), productvendorController.products);
router.post("/products", protect, role("vendor"), productvendorController.createProduct);
router.get("/products/:product_id", protect, role("vendor"), productvendorController.productDetails);
router.put("/products/:product_id", protect, role("vendor"), productvendorController.updateProduct);
router.delete("/products/:product_id", protect, role("vendor"), productvendorController.deleteProduct);

router.get("/orders", protect, role("vendor"), orderController.list);
// router.get("/catalog/brand", protect, role("vendor"), brandController.list);
// router.get("/catalog/size", protect, role("vendor"), sizeController.list);

router.get("/orders",protect,role("vendor"),)
module.exports = router;
