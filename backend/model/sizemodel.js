const mongoose = require("mongoose");
const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});
// The same size label may be valid in separate categories.
sizeSchema.index({ name: 1, category: 1 }, { unique: true });
const Size = mongoose.model("Size", sizeSchema);
module.exports = Size;

