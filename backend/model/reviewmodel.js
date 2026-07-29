const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  customer: { type: String, required: true, trim: true },
  product: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true, trim: true },
  status: { type: String, enum: ["Approved", "Pending", "Rejected"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
