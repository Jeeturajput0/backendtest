require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../model/productmodel");

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const result = await Product.updateMany(
    { approvalStatus: { $exists: false } },
    { $set: { approvalStatus: "approved", rejectionReason: "", approvedAt: new Date() } },
  );
  console.log(`${result.modifiedCount} existing products marked approved.`);
};

run()
  .catch((error) => { console.error("Approval migration failed:", error.message); process.exitCode = 1; })
  .finally(() => mongoose.disconnect());
