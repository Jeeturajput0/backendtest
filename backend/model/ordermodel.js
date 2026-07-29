const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true, trim: true },
    customer: { type: String, required: true, trim: true },
    customerEmail: { type: String, trim: true, lowercase: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Failed", "Refunded"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
