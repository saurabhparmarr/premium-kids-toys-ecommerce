import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/common/Loader";
import { getMyOrders } from "../features/order/orderThunk";

const Orders = () => {
  const dispatch = useDispatch();

  const { orders, loading, error, user } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch , user]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto inline-block max-w-md rounded-[1.5rem] border border-rose-200 bg-rose-50 px-6 py-4 font-semibold text-rose-700 shadow-sm">⚠️ {error}</div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="mx-auto mt-10 max-w-7xl rounded-[2rem] border border-orange-100 bg-white/90 px-6 py-20 text-center shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-2xl">📦</div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">No Orders Found</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">Your purchased toys and products will show up here once you make an order.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-orange-100/80 pb-5">
          <h1 className="text-3xl font-black tracking-tight text-zinc-950">My Orders</h1>
          <p className="mt-1 text-sm text-zinc-500">Check the tracking status, delivery information, and summary of your previous purchases.</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="overflow-hidden rounded-[1.75rem] border border-orange-100 bg-white shadow-[0_16px_35px_rgba(15,23,42,0.05)] transition duration-200 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
              <div className="grid gap-4 border-b border-orange-100 bg-orange-50/60 p-5 text-xs sm:grid-cols-2 md:grid-cols-6 sm:text-sm">
                <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Order ID</p><p className="mt-0.5 font-bold text-zinc-900">#{order._id.slice(-8).toUpperCase()}</p></div>
                <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Total Amount</p><p className="mt-0.5 font-extrabold text-[#f97316]">₹{order.totalPrice}</p></div>
                <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Payment</p><span className={`mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${order.isPaid ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>{order.isPaid ? "Paid" : "Pending"}</span></div>
                <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Status</p><span className={`mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${order.orderStatus === "Delivered" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : order.orderStatus === "Shipped" ? "border-sky-200 bg-sky-50 text-sky-700" : order.orderStatus === "Cancelled" ? "border-rose-200 bg-rose-50 text-rose-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>{order.orderStatus}</span></div>
                <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Ordered On</p><p className="mt-0.5 font-medium text-zinc-700">{new Date(order.createdAt).toLocaleDateString()}</p></div>
                <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Delivery Date</p><p className="mt-0.5 font-medium text-zinc-700">{new Date(order.deliveryDate).toLocaleDateString()}</p></div>
              </div>

              <div className="grid items-start gap-8 p-6 lg:grid-cols-3">
                <div className="rounded-[1.25rem] border border-orange-100 bg-orange-50/40 p-4 text-sm">
                  <h3 className="mb-2 flex items-center gap-1.5 font-bold text-zinc-900">📍 Shipping Address</h3>
                  <div className="space-y-0.5 text-xs font-medium leading-relaxed text-zinc-600">
                    <p className="font-semibold text-zinc-900">{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city} - {order.shippingAddress.postalCode}</p>
                    <p className="mt-1.5 text-zinc-500">📞 {order.shippingAddress.phone}</p>
                  </div>
                </div>

                <div className="space-y-4 lg:col-span-2">
                  {order.orderItems.map((item) => (
                    <div key={item.product} className="flex items-center gap-4 rounded-[1.1rem] border border-transparent p-2 transition hover:border-orange-100">
                      <img src={item.image} alt={item.name} className="h-16 w-16 flex-shrink-0 rounded-[1rem] border border-orange-100 bg-orange-50 object-cover md:h-20 md:w-20" />
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold text-zinc-900 md:text-base">{item.name}</h3>
                        <p className="mt-0.5 text-xs font-medium text-zinc-500">Quantity: <span className="font-semibold text-zinc-800">{item.quantity}</span></p>
                      </div>
                      <div className="text-right"><p className="text-sm font-extrabold text-zinc-950 md:text-base">₹{item.price}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Orders;