import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = () => {
  const { user, isInitializing } = useSelector((state) => state.auth);

  if (isInitializing) {
    return <Loader />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;