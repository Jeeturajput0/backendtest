const express = require("express");
const router = express.Router();
const {protect}= require("../middleware/auth.middleware")
const categoryController  = require("../controller/categoryController");
const productController  =require("../controller/productController")
const sizeController =require("../controller/sizeController");
const brandController= require("../controller/brandControllers")
const couponsController =require("../controller/couponsControlles")
const offesController =require("../controller/offerControlle")
const colorController =require("../controller/colorsControllers")

// category
router.post("/category", protect,categoryController .create);
router.get("/category", protect,categoryController.list);
router.put("/category/:category_id", protect,categoryController .update);
router.delete("/category/:category_id", protect,categoryController .destroy);
// router.get("/category/:category_id", categoryController.details);

//product routes
router.post("/product", protect,productController .create);
router.get("/product", protect,productController.list);
router.get("/product/:product_id", protect,productController .details);
router.put("/product/:product_id", protect,productController .update);
router.delete("/product/:product_id", protect,productController .destroy);

// size
router.post("/size",protect,sizeController.create);
router.get("/size",protect,sizeController.list);
router.put("/size/:size_id",protect,sizeController.update);
router.delete("/size/:size_id",protect,sizeController.destory);

// barnd
router.get("/brand",protect,brandController.list);
router.post("/brand",protect,brandController.create)
router.put("/brand/:brand_id",protect,brandController.update);
router.delete("/brand/:brand_id",protect,brandController.destory);
// Coupons
router.get("/coupon",protect,couponsController.list);
router.post("/coupon",protect,couponsController.create)
router.put("/coupon/:coupon_id",protect,couponsController.update);
router.delete("/coupon/:coupon_id",protect,couponsController.destory);
router.get("/product/:coupon", protect,couponsController .details);


// offers
router.get("/offer",protect,offesController.list);
router.post("/offer",protect,offesController.create)
router.put("/offer/:offer_id",protect,offesController.update);
router.delete("/offer/:offer_id",protect,offesController.destory);
router.get("/product/:offer", protect,offesController .details);

// colors
router.get("/color",protect,colorController.list);
router.post("/color",protect,colorController.create)
router.put("/color/:color_id",protect,colorController.update);
router.delete("/color/:color_id",protect,colorController.destory);
router.get("/product/:color", protect,colorController .details);


module.exports = router;