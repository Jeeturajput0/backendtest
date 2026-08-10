require("dotenv").config();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../model/usermodel");

const [email = "admin@shopease.com", password = "Admin@123", name = "ShopEase Admin", mobile = "9999999999"] = process.argv.slice(2);

async function createAdmin() {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing in backend/.env");
  if (password.length < 8) throw new Error("Password must be at least 8 characters.");

  await mongoose.connect(process.env.MONGO_URI);
  const normalizedEmail = email.trim().toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 12);
  const admin = await User.findOneAndUpdate(
    { email: normalizedEmail },
    { name, mobile, password: hashedPassword },
    { returnDocument: "after", upsert: true, setDefaultsOnInsert: true },
  );

  console.log(`Admin account is ready: ${admin.email}`);
  await mongoose.disconnect();
}

createAdmin().catch(async (error) => {
  console.error("Could not create admin:", error.message);
  await mongoose.disconnect();
  process.exitCode = 1;
});
