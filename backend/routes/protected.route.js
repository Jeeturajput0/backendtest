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
const orderController = require("../controller/orderController");
const paymentController = require("../controller/paymentController");
const reviewController = require("../controller/reviewController");
const bannerController = require("../controller/bannerController");
const profileController = require("../controller/profileController");
const cartController = require("../controller/cartController");

router.get("/profile", protect, profileController.getProfile);
router.put("/profile", protect, profileController.updateProfile);

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
router.get("/coupon/:coupon_id", protect,couponsController.details);


// offers
router.get("/offer",protect,offesController.list);
router.post("/offer",protect,offesController.create)
router.put("/offer/:offer_id",protect,offesController.update);
router.delete("/offer/:offer_id",protect,offesController.destory);
router.get("/offer/:offer_id", protect,offesController.details);

// colors
router.get("/color",protect,colorController.list);
router.post("/color",protect,colorController.create)
router.put("/color/:color_id",protect,colorController.update);
router.delete("/color/:color_id",protect,colorController.destory);
router.get("/product/:color", protect,colorController .details);

// orders
router.post("/order", protect, orderController.create);
router.get("/order", protect, orderController.list);
router.get("/order/:order_id", protect, orderController.details);
router.put("/order/:order_id", protect, orderController.update);
router.delete("/order/:order_id", protect, orderController.destroy);

// payments
router.post("/payment", protect, paymentController.create);
router.get("/payment", protect, paymentController.list);
router.get("/payment/:payment_id", protect, paymentController.details);
router.put("/payment/:payment_id", protect, paymentController.update);
router.delete("/payment/:payment_id", protect, paymentController.destroy);

// reviews
router.post("/review", protect, reviewController.create);
router.get("/review", protect, reviewController.list);
router.get("/review/:review_id", protect, reviewController.details);
router.put("/review/:review_id", protect, reviewController.update);
router.delete("/review/:review_id", protect, reviewController.destroy);

// banners
router.post("/banner", protect, bannerController.create);
router.get("/banner", protect, bannerController.list);
router.get("/banner/:banner_id", protect, bannerController.details);
router.put("/banner/:banner_id", protect, bannerController.update);
router.delete("/banner/:banner_id", protect, bannerController.destroy);
//cart
router.post("/cart", protect, cartController.create);
router.get("/cart", protect, cartController.getCart);
router.put("/cart/:cartId", protect, cartController.updateCart);
router.delete("/cart/:cartId", protect, cartController.deleteCart);

module.exports = router;
