const mongoose = require("mongoose");

const variationSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
    },
  },
  { _id: false },
);

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  image: {
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
    ref: "Category",
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
  variations: [variationSchema],
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
