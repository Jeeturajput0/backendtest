const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
   defualt: "",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  country: { type: String, default: "India" },
  bio: { type: String, default: "" },
  avatar: { type: String, default: "" },
  role: {
    type: String,
    enum: ["admin", "vendor", "customer"],
    default: "customer",
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
