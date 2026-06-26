const express = require("express");
const router = express.Router();
const {protect}= require("../middleware/auth.middleware")
const categoryController  = require("../controller/categoryController");
const productController  =require("../controller/productController")

// category

router.get("/category", protect,categoryController.list);
router.post("/category", protect,categoryController .create);
router.put("/category/:category_id", protect,categoryController .update);
router.delete("/category/:category_id", protect,categoryController .destroy);
// router.get("/category/:category_id", categoryController.details);



//product routes

router.get("/product", protect,productController.list);
router.post("/product", protect,productController .create);
router.put("/product/:product_id", protect,productController .update);
router.delete("/product/:product_id", protect,productController .destroy);

module.exports = router;