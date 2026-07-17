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

 const handleSubmit = (e) => {
  e.preventDefault();

  const {
    fullName,
    phone,
    address,
    city,
    state,
    postalCode,
  } = formData;

  // Trim values
  const trimmedName = fullName.trim();
  const trimmedPhone = phone.trim();
  const trimmedAddress = address.trim();
  const trimmedCity = city.trim();
  const trimmedState = state.trim();
  const trimmedPostalCode = postalCode.trim();

  // Empty fields
  if (
    !trimmedName ||
    !trimmedPhone ||
    !trimmedAddress ||
    !trimmedCity ||
    !trimmedState ||
    !trimmedPostalCode
  ) {
    return toast.error("Please fill all fields");
  }

  // Name validation
  if (trimmedName.length < 4) {
    return toast.error("Full name must be at least 4 characters");
  }

  if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
    return toast.error("Full name can contain only letters and spaces");
  }

  // Phone validation
  if (!/^[6-9]\d{9}$/.test(trimmedPhone)) {
    return toast.error("Please enter a valid 10-digit mobile number");
  }

  // Address validation
  if (trimmedAddress.length < 10) {
    return toast.error("Address must be at least 10 characters");
  }

  // City validation
  if (!/^[A-Za-z\s]+$/.test(trimmedCity)) {
    return toast.error("City can contain only letters");
  }

  // State validation
  if (!/^[A-Za-z\s]+$/.test(trimmedState)) {
    return toast.error("State can contain only letters");
  }

  // Postal Code validation
  if (!/^\d{6}$/.test(trimmedPostalCode)) {
    return toast.error("Postal code must be exactly 6 digits");
  }

  dispatch(
    saveShippingAddress({
      fullName: trimmedName,
      phone: trimmedPhone,
      address: trimmedAddress,
      city: trimmedCity,
      state: trimmedState,
      postalCode: trimmedPostalCode,
    })
  );

  navigate("/payment");
};
  const subtotal = cartItems.reduce((acc, item) => acc + (item.offerPrice || item.price) * item.quantity, 0);

  useEffect(() => {
    
    if (cartItems.length === 0) {
      navigate("/cart", { replace: true });
      return;
    }

    
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
    
   
    if (!formData.fullName || !formData.address || !formData.phone) {
      toast.error("Please fill all fields");
      return;
    }

    
    dispatch(saveShippingAddress(formData));
    
    
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