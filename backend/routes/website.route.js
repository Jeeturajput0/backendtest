const express = require("express");
const router = express.Router();
const categoryController  = require("../controller/categoryController");
const productController  =require("../controller/productController")
const homeController = require("../controller/homeController");

router.get("/home", homeController.list);
router.post("/newsletter/subscribe", homeController.subscribe);

// category
router.post("/category", categoryController .create);
router.get("/category", categoryController.list);
// router.get("/category/:category_id", categoryController.details);

//product routes
router.get("/product", productController.publicList);
router.get("/product/:product_id", productController .details);
//cart routes


module.exports = router;
