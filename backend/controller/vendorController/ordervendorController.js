const Order = require("../../model/ordermodel");

const list = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const orders = await Order.find({
      "items.product": {
        $exists: true,
      },
    })
      .populate({
        path: "items.product",
        select: "name image price vendor",
      })
      .sort({ createdAt: -1 });

    const vendorOrders = orders
      .map((order) => {
        const vendorItems = order.items.filter(
          (item) =>
            item.product &&
            item.product.vendor &&
            item.product.vendor.toString() === vendorId.toString(),
        );

        if (vendorItems.length === 0) {
          return null;
        }

        const vendorTotal = vendorItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0,
        );

        return {
          _id: order._id,
          orderNumber: order.orderNumber,
          customer: order.customer,
          customerEmail: order.customerEmail,
          paymentStatus: order.paymentStatus,
          orderStatus: order.orderStatus,
          createdAt: order.createdAt,

          items: vendorItems,

          vendorTotal,
        };
      })
      .filter(Boolean);

    res.status(200).json({
      success: true,
      data: vendorOrders,
    });
  } catch (error) {
    console.log("Vendor Order List Error:", error);

    res.status(500).json({
      success: false,
      message: "Vendor order list failed",
      error: error.message,
    });
  }
};

module.exports = {
  list,
};
