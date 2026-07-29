const Order = require("../model/ordermodel");

const create = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, message: "Order created successfully", data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: "Order creation failed", error: error.message });
  }
};

const list = async (req, res) => {
  try {
    const { search, status, paymentStatus } = req.query;
    const query = {};
    if (status) query.orderStatus = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (search) query.$or = [{ orderNumber: new RegExp(search, "i") }, { customer: new RegExp(search, "i") }];
    const orders = await Order.find(query).sort({ createdAt: -1 }).populate("items.product", "name image");
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: "Order list failed", error: error.message });
  }
};

const details = async (req, res) => {
  try {
    const order = await Order.findById(req.params.order_id).populate("items.product", "name image");
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: "Order details failed", error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.order_id, req.body, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, message: "Order updated successfully", data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: "Order update failed", error: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.order_id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Order delete failed", error: error.message });
  }
};

module.exports = { create, list, details, update, destroy };
