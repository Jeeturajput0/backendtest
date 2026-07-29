require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../model/productmodel");

// Product names are matched exactly so this script cannot change unrelated items.
const imagePaths = {
  "LG OLED 55 Smart TV": "/uploads/products/lg-oled-55-smart-tv.png",
  "OnePlus 12": "/uploads/products/oneplus-12.png",
  "Google Pixel 9 Pro": "/uploads/products/google-pixel-9-pro.png",
  "MacBook Air M3": "/uploads/products/macbook-air-m3.png",
  "Dell XPS 15": "/uploads/products/dell-xps-15.png",
  "HP Pavilion 15": "/uploads/products/hp-pavilion-15.png",
  "Lenovo Legion 5": "/uploads/products/lenovo-legion-5.png",
  "Nike Air Max 270": "/uploads/products/nike-air-max-270.png",
  "Adidas Ultraboost 23": "/uploads/products/adidas-ultraboost-23.png",
  "Puma RS-X": "/uploads/products/puma-rs-x.png",
  "Sony WH-1000XM5": "/uploads/products/sony-wh-1000xm5.png",
  "Apple AirPods Pro 2": "/uploads/products/apple-airpods-pro-2.png",
  "Canon EOS R50": "/uploads/products/canon-eos-r50.png",
};

async function setProductImages() {
  await mongoose.connect(process.env.MONGO_URI);

  const results = await Promise.all(
    Object.entries(imagePaths).map(async ([name, image]) => {
      const result = await Product.updateOne({ name }, { $set: { image } });
      return { name, matched: result.matchedCount, updated: result.modifiedCount };
    }),
  );

  console.table(results);
  const missing = results.filter((item) => item.matched === 0).map((item) => item.name);
  if (missing.length) console.warn("No matching product found:", missing.join(", "));
}

setProductImages()
  .catch((error) => {
    console.error("Could not set product images:", error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
