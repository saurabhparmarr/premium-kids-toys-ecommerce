import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../components/common/Button";
import { saveShippingAddress } from "../features/shipping/shippingSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.shipping);
  const { cartItems } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    fullName: shippingAddress?.fullName || "",
    phone: shippingAddress?.phone || "",
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    state: shippingAddress?.state || "",
    postalCode: shippingAddress?.postalCode || "",
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.offerPrice || item.price) * item.quantity, 0);

  useEffect(() => {
    // 1. Agar cart empty hai toh wapas bhejo
    if (cartItems.length === 0) {
      navigate("/cart", { replace: true });
      return;
    }

    // 2. Stock check karo
    const outOfStockItems = cartItems.filter(item => item.quantity > item.stock);
    if (outOfStockItems.length > 0) {
      outOfStockItems.forEach(item => {
        toast.error(`${item.name} has only ${item.stock} left.`, { id: "stock-error" });
      });
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation check
    if (!formData.fullName || !formData.address || !formData.phone) {
      toast.error("Please fill all fields");
      return;
    }

    // Redux mein address save karo
    dispatch(saveShippingAddress(formData));
    
    // Payment page par bhejo
    navigate("/payment");
  };

  return (
    <section className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="md:col-span-2 rounded-[2rem] border border-orange-100 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black mb-6">Shipping Details</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full border p-3 rounded-2xl" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
            <input type="tel" placeholder="Phone" className="w-full border p-3 rounded-2xl" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
            <input type="text" placeholder="Address" className="w-full border p-3 rounded-2xl" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required />
            <div className="grid grid-cols-3 gap-2">
              <input type="text" placeholder="City" className="border p-3 rounded-2xl" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required />
              <input type="text" placeholder="State" className="border p-3 rounded-2xl" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} required />
              <input type="text" placeholder="Zip" className="border p-3 rounded-2xl" value={formData.postalCode} onChange={(e) => setFormData({...formData, postalCode: e.target.value})} required />
            </div>
            <Button type="submit" className="w-full py-3">Continue To Payment</Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="rounded-[2rem] border border-orange-100 bg-orange-50 p-6 sticky top-20">
            <h2 className="font-bold mb-4">Order Review</h2>
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between text-sm py-1">
                <span>{item.name} x{item.quantity}</span>
                <span>₹{(item.offerPrice || item.price) * item.quantity}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4 font-black flex justify-between text-lg">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Checkout;