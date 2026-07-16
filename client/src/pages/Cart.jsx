import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/common/Button";
import Loader from "../components/common/Loader"; // Loader component import

import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state add kiya

  const { cartItems } = useSelector((state) => state.cart);

  // Cart loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 500ms delay taaki transition smooth rahe
    
    if (cartItems.length === 0) {
      window.scrollTo(0, 0);
    }
    
    return () => clearTimeout(timer);
  }, [cartItems]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.offerPrice || item.price) * item.quantity, 0);
  const shipping = subtotal >= 1000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  // Show Loader
  if (loading) {
    return <Loader message="Loading your cart..." />;
  }

  // Show Empty State
  if (cartItems.length === 0) {
    return (
      <div className="mx-auto mt-10 max-w-7xl rounded-[2rem] border border-orange-100 bg-white/90 px-6 py-20 text-center shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-2xl">🛒</div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Your Cart is Empty</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">Looks like you haven't added any toys to your cart yet. Explore our awesome collection to start shopping.</p>
        <Link to="/">
          <Button className="mt-8 px-6 py-3">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-orange-100/80 pb-5">
          <h1 className="text-3xl font-black tracking-tight text-zinc-950">Shopping Cart</h1>
          <p className="mt-1 text-sm text-zinc-500">Review your selected toys and proceed to safe checkout.</p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col gap-5 rounded-[1.5rem] border border-orange-100 bg-white p-4 shadow-[0_16px_35px_rgba(15,23,42,0.05)] transition duration-200 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] sm:flex-row">
                <img src={item.images?.[0] || "https://placehold.co/300x300?text=Toy"} alt={item.name} className="h-24 w-24 flex-shrink-0 rounded-[1.1rem] border border-orange-100 bg-orange-50 object-cover sm:h-28 sm:w-28" />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900 line-clamp-1">{item.name}</h2>
                    <p className="mt-1 text-base font-extrabold text-[#f97316]">₹{item.offerPrice || item.price}</p>
                  </div>

                  <div className="mt-4 flex items-center gap-3 sm:mt-0">
                    <button disabled={item.quantity === 1} onClick={() => dispatch(decreaseQty(item._id))} className="flex h-8 w-8 items-center justify-center rounded-xl border border-orange-100 bg-white font-bold text-zinc-700 transition hover:bg-orange-50 disabled:opacity-40 active:scale-95">
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-zinc-800">{item.quantity}</span>
                    <button disabled={item.quantity >= item.stock} onClick={() => dispatch(increaseQty(item._id))} className="flex h-8 w-8 items-center justify-center rounded-xl border border-orange-100 bg-white font-bold text-zinc-700 transition hover:bg-orange-50 disabled:opacity-40 active:scale-95">
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-start justify-end sm:items-center">
                  <button onClick={() => dispatch(removeFromCart(item._id))} className="inline-flex items-center gap-1.5 rounded-xl border border-rose-100 bg-rose-50/70 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50">
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-[1.75rem] border border-orange-100 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] lg:sticky lg:top-24">
            <h2 className="mb-5 text-xl font-black tracking-tight text-zinc-950">Order Summary</h2>
            <div className="space-y-3 text-sm text-zinc-600">
              <div className="flex justify-between"><span>Total Items</span><span className="font-semibold text-zinc-800">{totalItems}</span></div>
              <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-zinc-800">₹{subtotal}</span></div>
              <div className="flex justify-between"><span>Shipping Fee</span><span className="font-semibold text-zinc-800">{shipping === 0 ? <span className="font-bold text-emerald-600">Free</span> : `₹${shipping}`}</span></div>
              <div className="flex justify-between"><span>Estimated Tax (5%)</span><span className="font-semibold text-zinc-800">₹{tax}</span></div>
            </div>
            <hr className="my-4 border-orange-100" />
            <div className="flex justify-between text-lg font-black text-zinc-950"><span>Total Amount</span><span className="text-[#f97316]">₹{total}</span></div>
            <Button className="mt-6 w-full py-3.5" disabled={cartItems.length === 0} onClick={() => { if (cartItems.length === 0) return; navigate("/checkout"); }}>
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;