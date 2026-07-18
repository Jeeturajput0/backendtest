const express = require("express");
const multer = require("multer");
const router = express.Router();
// Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Upload API
router.post("/image", upload.single("image"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No File Uploaded"
        });
    }

    res.json({
        success: true,
        filename: req.file.filename,
        imageUrl: `${process.env.BACKEND_URI}/${req.file.filename}`
    });
});

/* router.post("/mutiple/image", upload.single("image"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No File Uploaded"
        });
    }

    res.json({
        success: true,
        filename: req.file.filename,
        imageUrl: `${process.env.MONGO_URI}/${req.file.filename}`
    });
}); */
module.exports = router;