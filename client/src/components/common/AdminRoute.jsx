import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

const AdminRoute = () => {
  const { user, isInitializing } = useSelector((state) => state.auth);

  if (isInitializing) {
    return <Loader />;
  }

  // Check user exists and has admin privileges
  return user && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminRoute;