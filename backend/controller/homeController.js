const Banner = require("../model/bannermodel");
const Category = require("../model/categorymodel");
const Offer = require("../model/offermodel");
const Product = require("../model/productmodel");
const Review = require("../model/reviewmodel");
const NewsletterSubscription = require("../model/newslettersubscriptionmodel");

const list = async (req, res) => {
  try {
    const [heroBanners, categories, products, offers, reviews] = await Promise.all([
      Banner.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 }),
      Category.find({ isActive: true }),
      Product.find({ isActive: true }).populate("category"),
      Offer.find({ status: true }).sort({ createdAt: -1 }),
      Review.find({ status: "Approved" }).sort({ createdAt: -1 }),
    ]);

    const newestProducts = [...products].reverse();
    res.json({
      success: true,
      data: {
        heroBanners,
        topCategories: categories,
        featuredCategories: categories.slice(0, 4),
        featuredProducts: products.slice(0, 8),
        newArrivals: newestProducts.slice(0, 8),
        bestSellingProducts: products.slice(0, 4),
        flashSaleProducts: products.slice(0, 4),
        offer: offers[0] || null,
        reviews: reviews.slice(0, 3),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Home data could not be loaded", error: error.message });
  }
};

const subscribe = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ success: false, message: "Please enter a valid email address" });

    await NewsletterSubscription.updateOne({ email }, { $setOnInsert: { email } }, { upsert: true });
    res.status(201).json({ success: true, message: "You are subscribed to the newsletter" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Newsletter subscription failed", error: error.message });
  }
};

module.exports = { list, subscribe };
