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
    image: {
      type: String,
      default: "",
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  size: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Size",
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
  quantity: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
    // required: true,
  },vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  approvalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  rejectionReason: { type: String, default: "" },
  approvedAt: { type: Date, default: null },
  variations: [variationSchema],
}, { timestamps: true });
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
