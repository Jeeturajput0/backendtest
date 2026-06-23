const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
router.get("/category", categoryController.list);
router.get("/category/:category_id", categoryController.details);
router.post("/category", categoryController.store);
router.put("/category/:category_id", categoryController.update);
router.delete("/category/:category_id", categoryController.destroy);

module.exports = router;