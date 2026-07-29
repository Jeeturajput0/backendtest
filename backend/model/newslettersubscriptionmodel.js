const mongoose = require("mongoose");

const newsletterSubscriptionSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("NewsletterSubscription", newsletterSubscriptionSchema);
