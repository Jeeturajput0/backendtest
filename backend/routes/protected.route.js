const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const categoryController = require("../controller/categoryController");
const productController = require("../controller/productController");
const sizeController = require("../controller/sizeController");
const brandController = require("../controller/brandControllers");
const couponsController = require("../controller/couponsControlles");
const offerController = require("../controller/offerControlle");
const colorController = require("../controller/colorsControllers");
const orderController = require("../controller/orderController");
const paymentController = require("../controller/paymentController");
const reviewController = require("../controller/reviewController");
const bannerController = require("../controller/bannerController");
const profileController = require("../controller/profileController");
const cartController = require("../controller/cartController");

router.use(protect);

router.get("/profile", profileController.getProfile);
router.put("/profile", profileController.updateProfile);

router.route("/cart").post(cartController.create).get(cartController.getCart);
router.route("/cart/:cartId").put(cartController.updateCart).delete(cartController.deleteCart);

// All remaining routes are dashboard-management endpoints.

router.route("/category").post(categoryController.create).get(categoryController.list);
router.route("/category/:category_id").put(categoryController.update).delete(categoryController.destroy);

router.route("/product").post(productController.create).get(productController.list);
router.route("/product/:product_id").get(productController.details).put(productController.update).delete(productController.destroy);

router.route("/size").post(sizeController.create).get(sizeController.list);
router.route("/size/:size_id").put(sizeController.update).delete(sizeController.destory);

router.route("/brand").get(brandController.list).post(brandController.create);
router.route("/brand/:brand_id").get(brandController.details).put(brandController.update).delete(brandController.destory);

router.route("/coupon").get(couponsController.list).post(couponsController.create);
router.route("/coupon/:coupon_id").get(couponsController.details).put(couponsController.update).delete(couponsController.destory);

router.route("/offer").get(offerController.list).post(offerController.create);
router.route("/offer/:offer_id").get(offerController.details).put(offerController.update).delete(offerController.destory);

router.route("/color").get(colorController.list).post(colorController.create);
router.route("/color/:color_id").put(colorController.update).delete(colorController.destory);
router.get("/product/:color", colorController.details);

router.route("/order").post(orderController.create).get(orderController.list);
router.get("/order/my-orders", orderController.myOrders);
router.route("/order/:order_id").get(orderController.details).put(orderController.update).delete(orderController.destroy);

router.route("/payment").post(paymentController.create).get(paymentController.list);
router.route("/payment/:payment_id").get(paymentController.details).put(paymentController.update).delete(paymentController.destroy);

router.route("/review").post(reviewController.create).get(reviewController.list);
router.route("/review/:review_id").get(reviewController.details).put(reviewController.update).delete(reviewController.destroy);

router.route("/banner").post(bannerController.create).get(bannerController.list);
router.route("/banner/:banner_id").get(bannerController.details).put(bannerController.update).delete(bannerController.destroy);

module.exports = router;
