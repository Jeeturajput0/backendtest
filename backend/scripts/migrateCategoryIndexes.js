require("dotenv").config();
const mongoose = require("mongoose");
const Brand = require("../model/brandmodel");
const Size = require("../model/sizemodel");

const removeLegacyNameIndex = async (Model) => {
  try {
    await Model.collection.dropIndex("name_1");
    console.log(`${Model.modelName}: removed legacy name_1 index`);
  } catch (error) {
    if (error.codeName !== "IndexNotFound") throw error;
  }
  await Model.syncIndexes();
};

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await removeLegacyNameIndex(Brand);
  await removeLegacyNameIndex(Size);
  console.log("Category-based brand and size indexes are ready.");
};

run()
  .catch((error) => {
    console.error("Index migration failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
