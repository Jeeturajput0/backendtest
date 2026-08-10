const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

const uploadDirectory = path.join(__dirname, "..", "uploads", "products");
fs.mkdirSync(uploadDirectory, { recursive: true });

// Keep uploaded product images inside backend/uploads/products. This is the
// same directory that Express exposes at /uploads.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },

    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();
        cb(null, `product-${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) return cb(null, true);
        cb(new Error("Only image files are allowed"));
    },
});

// Upload API
router.post("/image", protect, upload.single("image"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No File Uploaded"
        });
    }

    const baseUrl = process.env.BACKEND_URI || `${req.protocol}://${req.get("host")}`;
    const imagePath = `/uploads/products/${req.file.filename}`;

    res.status(201).json({
        success: true,
        filename: req.file.filename,
        imagePath,
        imageUrl: `${baseUrl}${imagePath}`,
    });
});

router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError || error.message === "Only image files are allowed") {
        return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
});
module.exports = router;
