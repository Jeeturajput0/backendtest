const mongoose = require("mongoose");
const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});
const Size = mongoose.model("Size", sizeSchema);
module.exports = Size;

