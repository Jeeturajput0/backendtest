require("dotenv").config();
const mongoose = require("mongoose");
const Brand = require("../model/brandmodel");
const Size = require("../model/sizemodel");

const categoryIds = (document) => [
  ...(Array.isArray(document.categories) ? document.categories : []),
  ...(document.category ? [document.category] : []),
].filter(Boolean).map(String);

const migrateModel = async (Model) => {
  const documents = await Model.find({}).lean();
  const groups = new Map();

  for (const document of documents) {
    const key = String(document.name || "").trim().toUpperCase();
    const group = groups.get(key) || { keepId: document._id, categories: new Set(), duplicateIds: [] };
    categoryIds(document).forEach((id) => group.categories.add(id));
    if (String(group.keepId) !== String(document._id)) group.duplicateIds.push(document._id);
    groups.set(key, group);
  }

  for (const group of groups.values()) {
    await Model.updateOne(
      { _id: group.keepId },
      { $set: { categories: [...group.categories] }, $unset: { category: "" } },
    );
    if (group.duplicateIds.length) await Model.deleteMany({ _id: { $in: group.duplicateIds } });
  }

  for (const indexName of ["category_1", "name_1_category_1"]) {
    try {
      await Model.collection.dropIndex(indexName);
    } catch (error) {
      if (error.codeName !== "IndexNotFound") throw error;
    }
  }
  await Model.syncIndexes();
};

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI, { autoIndex: false });
  await migrateModel(Brand);
  await migrateModel(Size);
  console.log("Brand and Size categories migration completed.");
};

run()
  .catch((error) => {
    console.error("Migration failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
