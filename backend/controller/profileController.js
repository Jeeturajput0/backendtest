const User = require("../model/usermodel");

const userIdFrom = (req) => req.user?.userId || req.user?.userid;
const safeUser = (user) => {
  const data = user.toObject();
  delete data.password;
  return data;
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(userIdFrom(req));
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: safeUser(user) });
  } catch (error) {
    res.status(400).json({ success: false, message: "Profile could not be loaded", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const allowedFields = ["name", "mobile", "address", "city", "state", "country", "bio", "avatar"];
    const update = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowedFields.includes(key)));
    const user = await User.findByIdAndUpdate(userIdFrom(req), update, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "Profile updated successfully", data: safeUser(user) });
  } catch (error) {
    res.status(400).json({ success: false, message: "Profile update failed", error: error.message });
  }
};

module.exports = { getProfile, updateProfile };
