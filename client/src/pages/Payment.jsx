import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  createRazorpayOrder,
  verifyPaymentAndCreateOrder,
} from "../features/order/orderThunk";

import { clearCart } from "../features/cart/cartSlice";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { shippingAddress } = useSelector((state) => state.shipping);

  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loader message="Processing your payment, please wait..." />;
  }

  const totalAmount = cartItems.reduce(
    (acc, item) =>
      acc + (item.offerPrice || item.price) * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!shippingAddress || !shippingAddress.address) {
      toast.error("Please provide shipping details first!");
      navigate("/checkout");
      return;
    }

    setLoading(true);

    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const result = await dispatch(
        createRazorpayOrder({ orderItems })
      ).unwrap();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.razorpayOrder.amount,
        currency: "INR",
        name: "Kids Toys Store",
        description: "Order Payment",
        order_id: result.razorpayOrder.id,

        handler: async (response) => {
          try {
            await dispatch(
              verifyPaymentAndCreateOrder({
                ...response,
                orderItems,
                shippingAddress,
              })
            ).unwrap();

            dispatch(clearCart());

            toast.success("Order Placed Successfully 🎉");

            navigate("/orders", {
              replace: true,
            });
          } catch (error) {
            toast.error(error || "Payment verification failed");
          }
        },

        prefill: {
          name: shippingAddress.fullName,
          contact: shippingAddress.phone,
        },

        theme: {
          color: "#f97316",
        },

        // UPI hide kiya hai kyunki Razorpay test account pe UPI activation/KYC
        // pending hai — mobile pe UPI-intent auto-trigger hone se
        // "validate/account" 500 error aa raha tha. KYC complete hone ke
        // baad ye block hata sakte ho taaki UPI bhi available ho jaaye.
        config: {
          display: {
            hide: [{ method: "upi" }],
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function () {
        toast.error("Payment Failed");
      });

      razorpay.open();
    } catch (error) {
      toast.error(error || "Unable to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-[2rem] border border-orange-100 bg-white p-8 shadow-lg">
        <h1 className="mb-3 text-center text-3xl font-black">
          Secure Payment
        </h1>

        <p className="mb-8 text-center text-zinc-500">
          Complete your purchase securely with Razorpay.
        </p>

        <div className="mb-8 rounded-xl bg-orange-50 p-5 text-center">
          <p className="text-sm text-zinc-500">Total Amount</p>

          <h2 className="mt-2 text-3xl font-black text-[#f97316]">
            ₹{totalAmount}
          </h2>
        </div>

        <Button
          onClick={handlePayment}
          className="w-full py-4"
        >
          Pay Securely
        </Button>
      </div>
    </section>
  );
};

export default Payment;