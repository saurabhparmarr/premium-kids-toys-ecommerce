const express = require("express");
const router = express.Router();
const {
  createRazorpayOrder,
  verifyPaymentAndCreateOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/create-razorpay-order", protect, createRazorpayOrder);
router.post("/verify-payment", protect, verifyPaymentAndCreateOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/all", protect, admin, getAllOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;