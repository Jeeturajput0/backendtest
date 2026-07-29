const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    customer: { type: String, required: true, trim: true },
    orderId: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    method: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Failed", "Refunded"],
      default: "Pending",
    },
    transactionId: { type: String, trim: true, sparse: true, unique: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Payment", paymentSchema);
