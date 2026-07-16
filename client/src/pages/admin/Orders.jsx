import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "../../components/admin/AdminLayout";
import OrderTable from "../../components/admin/OrderTable";

import { getAllOrders } from "../../features/order/orderThunk";

const Orders = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector(
    (state) => state.order
  );

// Orders.jsx me
useEffect(() => {
  dispatch(getAllOrders());
  
  // Cleanup: Jab user is page se jaye, toh purana data saaf ho jaye
  return () => {
    dispatch({ type: 'order/clearOrders' }); // Ya tumhara jo bhi clear action ho
  };
}, [dispatch]);
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-6">
        {/* Top Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-zinc-950 tracking-tight">
            Manage Orders
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Track, view details, and manage fulfillment status for all incoming orders.
          </p>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[40vh] bg-white border border-zinc-200/60 rounded-2xl shadow-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-zinc-500 font-medium">Fetching orders...</span>
          </div>
        ) : (
          <div className="bg-white border border-zinc-200/60 shadow-xl rounded-2xl overflow-hidden transition-all">
            <OrderTable orders={orders} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Orders;