import api from "../../api/axios";

// 1. Existing Exports
export const getMyOrdersAPI = async () => {
  const { data } = await api.get("/orders/myorders");
  return data;
};

export const getAllOrdersAPI = async () => {
  const { data } = await api.get("/orders/all");
  return data;
};

export const updateOrderStatusAPI = async (id, status) => {
  const { data } = await api.put(`/orders/${id}`, {
    orderStatus: status,
  });
  return data;
};

// 2. New Razorpay APIs (Add these)

// orderAPI.js me check karo ki ye function 'orderData' object accept kar raha hai:
export const createRazorpayOrderAPI = async (orderData) => {
  const { data } = await api.post("/orders/create-razorpay-order", orderData);
  return data;
};

// Backend route `/orders/verify-payment` ko hit karega
export const verifyPaymentAndCreateOrderAPI = async (paymentData) => {
  const { data } = await api.post("/orders/verify-payment", paymentData);
  return data; // Isme transaction status aur created order ki details hongi
};