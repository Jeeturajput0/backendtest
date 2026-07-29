const Payment = require("../model/paymentmodel");

const create = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json({ success: true, message: "Payment created successfully", data: payment });
  } catch (error) {
    res.status(400).json({ success: false, message: "Payment creation failed", error: error.message });
  }
};

const list = async (req, res) => {
  try {
    const { search, status } = req.query;
    const query = status ? { status } : {};
    if (search) query.$or = [{ customer: new RegExp(search, "i") }, { orderId: new RegExp(search, "i") }, { transactionId: new RegExp(search, "i") }];
    const payments = await Payment.find(query).sort({ date: -1, createdAt: -1 });
    res.json({ success: true, data: payments });
  } catch (error) {
    res.status(400).json({ success: false, message: "Payment list failed", error: error.message });
  }
};

const details = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.payment_id);
    if (!payment) return res.status(404).json({ success: false, message: "Payment not found" });
    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(400).json({ success: false, message: "Payment details failed", error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.payment_id, req.body, { new: true, runValidators: true });
    if (!payment) return res.status(404).json({ success: false, message: "Payment not found" });
    res.json({ success: true, message: "Payment updated successfully", data: payment });
  } catch (error) {
    res.status(400).json({ success: false, message: "Payment update failed", error: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.payment_id);
    if (!payment) return res.status(404).json({ success: false, message: "Payment not found" });
    res.json({ success: true, message: "Payment deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Payment delete failed", error: error.message });
  }
};

module.exports = { create, list, details, update, destroy };
