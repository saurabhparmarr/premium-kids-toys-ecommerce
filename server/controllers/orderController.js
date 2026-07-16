const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const Product = require("../models/Product");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { orderItems } = req.body;

    let itemsPrice = 0;

    for (const item of orderItems) {
     const product = await Product.findById(item.product);

if (!product) {
  return res.status(404).json({
    message: "Product not found",
  });
}

// ✅ NEW CHECK
if (item.quantity > product.stock) {
  return res.status(400).json({
    message: `${product.name} has only ${product.stock} item(s) left in stock.`,
  });
}

const price = product.offerPrice || product.price;

itemsPrice += price * item.quantity;
    }

    const shippingPrice = itemsPrice > 1000 ? 0 : 100;
    const taxPrice = Number((itemsPrice * 0.18).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const razorpayOrder = await razorpay.orders.create({
      amount: totalPrice * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json({
      razorpayOrder,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.verifyPaymentAndCreateOrder = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderItems,
      shippingAddress,
    } = req.body;

    // Verify Razorpay Signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    let itemsPrice = 0;
    const finalOrderItems = [];

    // ==========================
    // CHECK STOCK ONLY
    // ==========================
    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Only ${product.stock} ${product.name} left in stock`,
        });
      }

      const price = product.offerPrice || product.price;

      itemsPrice += price * item.quantity;

      finalOrderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price,
        image: product.images[0],
      });
    }

    // ==========================
    // PRICE
    // ==========================
    const shippingPrice = itemsPrice > 1000 ? 0 : 100;
    const taxPrice = Number((itemsPrice * 0.18).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    // ==========================
    // CREATE ORDER
    // ==========================
    const order = await Order.create({
      user: req.user._id,

      orderItems: finalOrderItems,

      shippingAddress,

      paymentInfo: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },

      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,

      isPaid: true,
      paidAt: new Date(),
    });

    // ==========================
    // REDUCE STOCK
    // ==========================
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: {
          stock: -item.quantity,
        },
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Logged In User Orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({
        createdAt: -1,
      });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = req.body.orderStatus;

    if (req.body.orderStatus === "Delivered") {
      order.deliveryDate = new Date();
    }

    await order.save();

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};