const Order = require("../model/ordermodel");
const Cart = require("../model/cartmodlel");
const crypto = require("crypto");

// =======================
// Create Order
// =======================
const create = async (req, res) => {
  try {
    const {
      customer,
      customerEmail,
      mobile,
      shippingAddress,
      paymentMethod,
      items,
      totalAmount,
      payment,
    } = req.body;

    if (!customer || !mobile || !shippingAddress || !Array.isArray(items) || items.length === 0 || !Number.isFinite(Number(totalAmount)) || Number(totalAmount) <= 0) {
      return res.status(400).json({ success: false, message: "Customer, mobile, address, items and a valid total are required" });
    }

    if (paymentMethod === "Razorpay") {
      if (!payment?.orderId || !payment?.paymentId || !payment?.signature || !process.env.RAZORPAY_KEY_SECRET) {
        return res.status(400).json({ success: false, message: "Verified Razorpay payment details are required" });
      }
      const signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${payment.orderId}|${payment.paymentId}`)
        .digest("hex");
      if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(payment.signature))) {
        return res.status(400).json({ success: false, message: "Payment verification failed" });
      }
    }

    const orderNumber = `ORD${Date.now()}`;

    const order = await Order.create({
      orderNumber,
      user: req.user.userId,
      customer,
      customerEmail,
      mobile,
      shippingAddress,
      paymentMethod,
      items,
      totalAmount,
      paymentStatus: paymentMethod === "Razorpay" ? "Paid" : "Pending",
    });

    // Cart Empty
    await Cart.deleteMany({
      user: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Admin All Orders
// =======================
const list = async (req, res) => {
  try {
    const { search, status, paymentStatus } = req.query;

    const query = {};

    if (status) {
      query.orderStatus = status;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    if (search) {
      query.$or = [
        {
          orderNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          customer: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const orders = await Order.find(query)
      .populate("user", "name email")
      .populate("items.product")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// My Orders
// =======================
const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.userId,
    })
      .populate("items.product")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Order Details
// =======================
const details = async (req, res) => {
  try {
    const order = await Order.findById(req.params.order_id)
      .populate("user", "name email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Update Order
// =======================
const update = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.order_id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Delete Order
// =======================
const destroy = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(
      req.params.order_id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  create,
  list,
  myOrders,
  details,
  update,
  destroy,
};
