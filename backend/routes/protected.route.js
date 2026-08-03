const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const categoryController = require("../controller/categoryController");
const productController = require("../controller/productController");
const sizeController = require("../controller/sizeController");
const brandController = require("../controller/brandControllers");
const couponsController = require("../controller/couponsControlles");
const offesController = require("../controller/offerControlle");
const colorController = require("../controller/colorsControllers");
const orderController = require("../controller/orderController");
const paymentController = require("../controller/paymentController");
const reviewController = require("../controller/reviewController");
const bannerController = require("../controller/bannerController");
const profileController = require("../controller/profileController");
const cartController = require("../controller/cartController");

router.get("/profile", protect, profileController.getProfile);
router.put("/profile", protect, profileController.updateProfile);

// category
router.post("/category", protect, role("admin"), categoryController.create);
router.get("/category", protect, role("admin", "vendor"), categoryController.list);
router.put("/category/:category_id", protect, role("admin"), categoryController.update);
router.delete("/category/:category_id", protect, role("admin"), categoryController.destroy);
// router.get("/category/:category_id", categoryController.details);

//product routes
router.post("/product", protect, role("admin", "vendor"), productController.create);
router.get("/product", protect, role("admin", "vendor"), productController.list);
router.get("/product/:product_id", protect, role("admin", "vendor"), productController.details);
router.put("/product/:product_id", protect, role("admin", "vendor"), productController.update);
router.delete("/product/:product_id", protect, role("admin", "vendor"), productController.destroy);

// size
router.post("/size", protect, role("admin"), sizeController.create);
router.get("/size", protect, role("admin", "vendor"), sizeController.list);
router.put("/size/:size_id", protect, role("admin"), sizeController.update);
router.delete("/size/:size_id", protect, role("admin"), sizeController.destory);

// barnd
router.get("/brand", protect, role("admin", "vendor"), brandController.list);
router.post("/brand", protect, role("admin"), brandController.create);
router.put("/brand/:brand_id", protect, role("admin"), brandController.update);
router.delete("/brand/:brand_id", protect, role("admin"), brandController.destory);
// Coupons
router.get("/coupon", protect, role("admin"), couponsController.list);
router.post("/coupon", protect, role("admin"), couponsController.create);
router.put("/coupon/:coupon_id", protect, role("admin"), couponsController.update);
router.delete("/coupon/:coupon_id", protect, role("admin"), couponsController.destory);
router.get("/coupon/:coupon_id", protect, role("admin"), couponsController.details);

// offers
router.get("/offer", protect, role("admin"), offesController.list);
router.post("/offer", protect, role("admin"), offesController.create);
router.put("/offer/:offer_id", protect, role("admin"), offesController.update);
router.delete("/offer/:offer_id", protect, role("admin"), offesController.destory);
router.get("/offer/:offer_id", protect, role("admin"), offesController.details);

// colors
router.get("/color", protect, role("admin"), colorController.list);
router.post("/color", protect, role("admin"), colorController.create);
router.put("/color/:color_id", protect, role("admin"), colorController.update);
router.delete("/color/:color_id", protect, role("admin"), colorController.destory);
router.get("/product/:color", protect, role("admin"), colorController.details);

// orders
router.post("/order", protect, role("admin", "customer"), orderController.create);
router.get("/order", protect, role("admin"), orderController.list);
router.get("/order/:order_id", protect, role("admin"), orderController.details);
router.put("/order/:order_id", protect, role("admin"), orderController.update);
router.delete("/order/:order_id", protect, role("admin"), orderController.destroy);


// payments
router.post("/payment", protect, role("admin"), paymentController.create);
router.get("/payment", protect, role("admin"), paymentController.list);
router.get("/payment/:payment_id", protect, role("admin"), paymentController.details);
router.put("/payment/:payment_id", protect, role("admin"), paymentController.update);
router.delete("/payment/:payment_id", protect, role("admin"), paymentController.destroy);

// reviews
router.post("/review", protect, role("customer", "admin"), reviewController.create);
router.get("/review", protect, role("admin"), reviewController.list);
router.get("/review/:review_id", protect, role("admin"), reviewController.details);
router.put("/review/:review_id", protect, role("admin"), reviewController.update);
router.delete("/review/:review_id", protect, role("admin"), reviewController.destroy);

// banners
router.post("/banner", protect, role("admin"), bannerController.create);
router.get("/banner", protect, role("admin"), bannerController.list);
router.get("/banner/:banner_id", protect, role("admin"), bannerController.details);
router.put("/banner/:banner_id", protect, role("admin"), bannerController.update);
router.delete("/banner/:banner_id", protect, role("admin"), bannerController.destroy);
//cart
router.post("/cart", protect, role("customer"), cartController.create);
router.get("/cart", protect, role("customer"), cartController.getCart);
router.put("/cart/:cartId", protect, role("customer"), cartController.updateCart);
router.delete("/cart/:cartId", protect, role("customer"), cartController.deleteCart);

module.exports = router;

// router.post("/product",protect,role("vendor"),productController.create);  vendor and admin ADD
