const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  mrp: {
    type: Number,
    required: true,
  },
  saleprice: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
