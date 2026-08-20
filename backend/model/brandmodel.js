const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  logo: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
});
// A brand can exist in more than one category (for example Nike in Shoes and T-Shirt).
brandSchema.index({ name: 1, category: 1 }, { unique: true });
const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
