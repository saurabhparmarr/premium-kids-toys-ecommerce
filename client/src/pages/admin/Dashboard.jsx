import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersCount } from "../../features/auth/authThunk";
import AdminLayout from "../../components/admin/AdminLayout";
import DashboardCards from "../../components/admin/DashboardCards";
import { getProducts } from "../../features/product/productThunk";
import { getAllOrders } from "../../features/order/orderThunk";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products = [] } = useSelector((state) => state.product);
  const { orders = [] } = useSelector((state) => state.order);
  const { usersCount = 0 } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProducts({ page: 1, limit: 1000 }));
    dispatch(getAllOrders());
    dispatch(getUsersCount());
  }, [dispatch]);

  // Yahan maine check kiya ki agar orders array hai, tabhi reduce chalega
  const revenue = Array.isArray(orders) 
    ? orders.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0)
    : 0;

  return (
    <AdminLayout>
      <DashboardCards
        products={products?.length || 0}
        orders={orders?.length || 0}
        revenue={revenue} // Ab ye sahi number bhejega
        users={usersCount || 0}
      />
    </AdminLayout>
  );
};

export default Dashboard;