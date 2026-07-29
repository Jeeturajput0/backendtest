require("dotenv").config();
const mongoose = require("mongoose");

const Category = require("../model/categorymodel");
const Brand = require("../model/brandmodel");
const Color = require("../model/colormodel");
const Size = require("../model/sizemodel");
const Coupon = require("../model/couponsmodel");
const Offer = require("../model/offermodel");
const Review = require("../model/reviewmodel");
const Banner = require("../model/bannermodel");
const Payment = require("../model/paymentmodel");
const Order = require("../model/ordermodel");

const masterData = [
  [Category, [
    { title: "Electronics", slug: "electronics", image: "/uploads/products/electronics-category.png", isActive: true },
    { title: "Fashion", slug: "fashion", image: "/uploads/products/fashion-category.png", isActive: true },
    { title: "Shoes", slug: "shoes", image: "/uploads/products/shoes-category.png", isActive: false },
  ]],
  [Brand, [
    { name: "Apple", slug: "apple", description: "Premium electronics", isActive: true },
    { name: "Nike", slug: "nike", description: "Sportswear and footwear", isActive: true },
    { name: "Samsung", slug: "samsung", description: "Consumer electronics", isActive: true },
  ]],
  [Color, [
    { name: "Red", code: "#EF4444", isActive: true },
    { name: "Blue", code: "#3B82F6", isActive: true },
    { name: "Black", code: "#111827", isActive: true },
  ]],
  [Size, [{ name: "Small" }, { name: "Medium" }, { name: "Large" }]],
  [Coupon, [
    { code: "WELCOME10", discount: 10, expiry: "2027-12-31", isActive: true, usageLimit: 100 },
    { code: "SAVE20", discount: 20, expiry: "2027-10-31", isActive: true, usageLimit: 50 },
    { code: "FESTIVE15", discount: 15, expiry: "2027-11-15", isActive: false, usageLimit: 75 },
  ]],
  [Offer, [
    { name: "Summer Sale", discount: 25, status: true },
    { name: "New User Offer", discount: 10, status: true },
    { name: "Weekend Deal", discount: 15, status: false },
  ]],
  [Review, [
    { customer: "Aarav Sharma", product: "Wireless Headphones", rating: 5, review: "Excellent sound quality.", status: "Approved" },
    { customer: "Priya Verma", product: "Running Shoes", rating: 4, review: "Comfortable for daily use.", status: "Approved" },
    { customer: "Rohan Singh", product: "Smart Watch", rating: 4, review: "Good value for money.", status: "Pending" },
  ]],
  [Banner, [
    { title: "Summer Collection", image: "/uploads/products/fashion-category.png", link: "/shop", sortOrder: 1, isActive: true },
    { title: "Latest Electronics", image: "/uploads/products/electronics-category.png", link: "/shop", sortOrder: 2, isActive: true },
    { title: "Footwear Sale", image: "/uploads/products/shoes-category.png", link: "/shop", sortOrder: 3, isActive: false },
  ]],
  [Payment, [
    { customer: "Aarav Sharma", orderId: "ORD-1001", amount: 2499, method: "UPI", status: "Paid", transactionId: "TXN-1001", date: "2026-07-25" },
    { customer: "Priya Verma", orderId: "ORD-1002", amount: 1899, method: "Card", status: "Paid", transactionId: "TXN-1002", date: "2026-07-26" },
    { customer: "Rohan Singh", orderId: "ORD-1003", amount: 3499, method: "Net Banking", status: "Pending", transactionId: "TXN-1003", date: "2026-07-27" },
    { customer: "Neha Gupta", orderId: "ORD-1004", amount: 999, method: "UPI", status: "Failed", transactionId: "TXN-1004", date: "2026-07-28" },
    { customer: "Kabir Khan", orderId: "ORD-1005", amount: 4299, method: "Cash On Delivery", status: "Paid", transactionId: "TXN-1005", date: "2026-07-29" },
  ], 5],
  [Order, [
    { orderNumber: "ORD-1001", customer: "Aarav Sharma", customerEmail: "aarav@example.com", items: [{ name: "Wireless Headphones", quantity: 1, price: 2499 }], totalAmount: 2499, paymentStatus: "Paid", orderStatus: "Delivered" },
    { orderNumber: "ORD-1002", customer: "Priya Verma", customerEmail: "priya@example.com", items: [{ name: "Running Shoes", quantity: 1, price: 1899 }], totalAmount: 1899, paymentStatus: "Paid", orderStatus: "Shipped" },
    { orderNumber: "ORD-1003", customer: "Rohan Singh", customerEmail: "rohan@example.com", items: [{ name: "Smart Watch", quantity: 1, price: 3499 }], totalAmount: 3499, paymentStatus: "Pending", orderStatus: "Processing" },
    { orderNumber: "ORD-1004", customer: "Neha Gupta", customerEmail: "neha@example.com", items: [{ name: "Cotton T-Shirt", quantity: 1, price: 999 }], totalAmount: 999, paymentStatus: "Failed", orderStatus: "Cancelled" },
    { orderNumber: "ORD-1005", customer: "Kabir Khan", customerEmail: "kabir@example.com", items: [{ name: "Bluetooth Speaker", quantity: 1, price: 4299 }], totalAmount: 4299, paymentStatus: "Paid", orderStatus: "Delivered" },
  ], 5],
];

async function seedModel(Model, records, minimumCount = 3) {
  const existingCount = await Model.countDocuments();
  const neededRecords = records.slice(existingCount, minimumCount);

  if (neededRecords.length) await Model.insertMany(neededRecords);
  console.log(`${Model.modelName}: ${existingCount + neededRecords.length} records available`);
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  for (const [Model, records, minimumCount] of masterData) await seedModel(Model, records, minimumCount);
}

run()
  .catch((error) => { console.error("Master data seed failed:", error.message); process.exitCode = 1; })
  .finally(() => mongoose.disconnect());
