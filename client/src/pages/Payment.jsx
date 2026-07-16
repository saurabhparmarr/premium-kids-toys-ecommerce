import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createRazorpayOrder, verifyPaymentAndCreateOrder } from "../features/order/orderThunk";
import { clearCart } from "../features/cart/cartSlice";
import Button from "../components/common/Button";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { shippingAddress } = useSelector((state) => state.shipping);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    // 1. Validation check
    if (!shippingAddress || !shippingAddress.address) {
      toast.error("Please provide shipping details first!");
      return navigate("/checkout");
    }

    setLoading(true);
    try {
      const orderItems = cartItems.map(item => ({ product: item._id, quantity: item.quantity }));
      const result = await dispatch(createRazorpayOrder({ orderItems })).unwrap();
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.razorpayOrder.amount,
        currency: "INR",
        name: "Kids Toys Store",
        order_id: result.razorpayOrder.id,
        handler: async (response) => {
          try {
            // Yahan shippingAddress pura object bhej rahe hain
            await dispatch(verifyPaymentAndCreateOrder({ 
              ...response, 
              orderItems, 
              shippingAddress 
            })).unwrap();
            
            dispatch(clearCart());
            toast.success("Order Placed Successfully!");
            navigate("/orders", { replace: true });
          } catch (err) {
            toast.error("Verification failed. Please contact support.");
          }
        },
        prefill: {
          name: shippingAddress.fullName,
          contact: shippingAddress.phone
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-[2rem] border shadow-sm text-center">
        <h1 className="text-2xl font-black mb-6">Secure Payment</h1>
        <p className="mb-6 text-zinc-500">Total Amount: ₹{cartItems.reduce((a, b) => a + (b.offerPrice || b.price) * b.quantity, 0)}</p>
        <Button className="w-full py-4" onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Pay Securely"}
        </Button>
      </div>
    </section>
  );
};
export default Payment;