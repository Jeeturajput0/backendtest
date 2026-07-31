const Cart = require("../model/cartmodlel");

// =================== Add To Cart ===================
const create = async (req, res) => {
  try {
    const { product, quantity, color, size } = req.body;

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product is required",
      });
    }

    const existingCart = await Cart.findOne({
      user: req.user.userId,
      product,
      color,
      size,
    });

    if (existingCart) {
      existingCart.quantity += quantity || 1;
      await existingCart.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        data: existingCart,
      });
    }

    const cart = await Cart.create({
      user: req.user.userId,
      product,
      quantity: quantity || 1,
      color,
      size,
    });


    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =================== Get Cart ===================
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.userId,
    }).populate("product");

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =================== Update Cart ===================
const updateCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { quantity, color, size } = req.body;

    const cart = await Cart.findOneAndUpdate(
      {
        _id: cartId,
        user: req.user.userId,
      },
      {
        quantity,
        color,
        size,
      },
      {
        new: true,
      },
    );

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Cart Updated Successfully",
      data: cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =================== Delete Cart ===================
const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await Cart.findOneAndDelete({
      _id: cartId,
      user: req.user.userId,
    });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Cart Deleted Successfully",
      data: cart,
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
  getCart,
  updateCart,
  deleteCart,
};
