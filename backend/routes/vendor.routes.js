const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const productController = require("../controller/productController");
const categoryController = require("../controller/categoryController");
const sizeController = require("../controller/sizeController");

// Vendor routes are separate from admin routes. Product operations are scoped
// to the authenticated vendor by the product controller.
router.use(protect, role("vendor"));

router.get("/categories", categoryController.list);
router.get("/sizes", sizeController.list);
router.route("/products").get(productController.list).post(productController.create);
router.route("/products/:product_id")
  .get(productController.details)
  .put(productController.update)
  .delete(productController.destroy);

module.exports = router;
