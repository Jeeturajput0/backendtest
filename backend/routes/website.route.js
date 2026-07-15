const express = require("express");
const router = express.Router();
const categoryController  = require("../controller/categoryController");
const productController  =require("../controller/productController")

// category
router.post("/category", categoryController .create);
router.get("/category", categoryController.list);
// router.get("/category/:category_id", categoryController.details);

//product routes
router.get("/product", productController.list);
router.get("/product/:product_id", productController .details);

module.exports = router;