import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "../../components/admin/AdminLayout";
import OrderTable from "../../components/admin/OrderTable";
import Loader from "../../components/common/Loader"; 

import { getAllOrders } from "../../features/order/orderThunk";

const Orders = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector(
    (state) => state.order
  );

useEffect(() => {
  dispatch(getAllOrders());
  
  
  return () => {
    dispatch({ type: 'order/clearOrders' }); 
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
          <Loader message="Fetching all orders..." />
        ) : (
          <div className="bg-white border border-zinc-200/60 shadow-xl rounded-2xl overflow-hidden">
            <OrderTable orders={orders} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Orders;