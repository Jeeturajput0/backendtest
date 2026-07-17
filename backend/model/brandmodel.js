const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  },  slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
});
const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
