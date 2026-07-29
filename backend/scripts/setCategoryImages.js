require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../model/categorymodel");

const imagePaths = {
  Cameras: "/uploads/products/cameras-category.png",
  Accessories: "/uploads/products/accessories-category.png",
  Shoes: "/uploads/products/shoes-category.png",
  Fashion: "/uploads/products/fashion-category.png",
  Laptops: "/uploads/products/laptops-category.png",
  Mobiles: "/uploads/products/mobiles-category.png",
  Electronics: "/uploads/products/electronics-category.png",
};

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const results = await Promise.all(Object.entries(imagePaths).map(([title, image]) => Category.updateOne({ title }, { $set: { image } })));
  console.log(`Category images updated: ${results.filter((item) => item.matchedCount).length}/${results.length}`);
}

run().catch((error) => { console.error(error.message); process.exitCode = 1; }).finally(() => mongoose.disconnect());
