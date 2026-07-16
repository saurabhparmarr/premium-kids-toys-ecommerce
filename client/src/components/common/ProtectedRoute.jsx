import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = () => {
  const { user, isInitializing } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1. Jab tak application load ho rahi hai, tab tak Loader dikhao
  if (isInitializing) {
    return <Loader />;
  }

  // 2. Agar user hai toh route access karne do
  // 3. Agar user nahi hai, toh use login par bhejo aur uska current path save kar lo (optional)
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;