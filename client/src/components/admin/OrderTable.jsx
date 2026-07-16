import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../features/order/orderThunk";
import toast from "react-hot-toast";

const OrderTable = ({ orders }) => {
  const dispatch = useDispatch();

  const handleStatusUpdate = (id, newStatus) => {
    dispatch(updateOrderStatus({ id, status: newStatus }))
      .unwrap()
      .then(() => toast.success("Status updated successfully!"))
      .catch((err) => toast.error(err || "Failed to update"));
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-zinc-100">
      <table className="w-full text-left border-collapse">
        <thead className="bg-orange-50/50">
          <tr>
            <th className="p-4 text-sm font-bold text-zinc-600">Order ID</th>
            <th className="p-4 text-sm font-bold text-zinc-600">Customer</th>
            <th className="p-4 text-sm font-bold text-zinc-600">Total</th>
            <th className="p-4 text-sm font-bold text-zinc-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {orders?.map((order) => (
            <tr key={order._id} className="hover:bg-zinc-50/50 transition-colors">
              <td className="p-4 text-sm font-semibold text-zinc-800">#{order._id.slice(-8)}</td>
              
              {/* Customer Column */}
              <td className="p-4">
                <p className="text-sm font-bold text-zinc-900">{order.user?.name || "Guest"}</p>
                <p className="text-xs text-zinc-500">{order.user?.email}</p>
              </td>

              <td className="p-4 text-sm font-bold text-zinc-900">₹{order.totalPrice?.toFixed(2)}</td>

              {/* Status Select */}
              <td className="p-4">
                <select
                  value={order.orderStatus}
                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  className={`cursor-pointer rounded-full px-3 py-1 text-xs font-bold border-none outline-none ring-0 ${
                    order.orderStatus === "Delivered" ? "bg-emerald-100 text-emerald-700" : 
                    order.orderStatus === "Shipped" ? "bg-sky-100 text-sky-700" : 
                    order.orderStatus === "Cancelled" ? "bg-rose-100 text-rose-700" : 
                    "bg-amber-100 text-amber-700"
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;