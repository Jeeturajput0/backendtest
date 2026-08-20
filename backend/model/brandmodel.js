const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: { type: String, maxlength: 500 },
    isActive: { type: Boolean, default: true },
    logo: { type: String },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    slug: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
  },
  { timestamps: true },
);
const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
