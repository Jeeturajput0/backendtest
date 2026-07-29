const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expiry: {
    type: Date,
    // reuried: true,
  },
  StartDate: {
    type: Date,
    // reuried: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  usageLimit: {
    type: Number,
    default: 1,
  },
});
const Coupons = mongoose.model("Coupons", couponSchema);
module.exports = Coupons;
