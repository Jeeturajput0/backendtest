const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  country: { type: String, default: "India" },
  bio: { type: String, default: "" },
  avatar: { type: String, default: "" },

}, { timestamps: true });
const User = mongoose.model("User", userSchema);
module.exports = User;
