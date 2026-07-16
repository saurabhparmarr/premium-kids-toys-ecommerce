import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import toast from "react-hot-toast";

import { logoutUser } from "../../features/auth/authThunk";
import { forceLogout } from "../../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = JSON.parse(
    localStorage.getItem("wishlist") || "[]",
  ).length;

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleLogout = async () => {
    closeMenu();
    dispatch(forceLogout());
    toast.success("Logged out successfully 🎉");
    navigate("/login");

    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Backend cookie cleanup failed:", error);
    }
  };

  const activeClass = ({ isActive }) =>
    isActive
      ? "text-[#f97316] font-semibold relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-[#f97316] md:py-2"
      : "text-zinc-600 hover:text-[#f97316] font-medium transition duration-150 md:py-2";

  const mobileActiveClass = ({ isActive }) =>
    isActive
      ? "text-[#f97316] font-semibold bg-orange-50 px-4 py-2.5 rounded-xl border border-orange-100 block"
      : "text-zinc-600 hover:text-[#f97316] hover:bg-orange-50 px-4 py-2.5 rounded-xl transition block";

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-100/80 bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-black tracking-tight text-zinc-900 sm:text-2xl"
        >
          <span className="inline-flex h-3.5 w-3.5 rounded-full bg-[#f97316] shadow-[0_0_0_4px_rgba(249,115,22,0.16)]"></span>
          Kids<span className="text-[#f97316]">Toys</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink className={activeClass} to="/">
            Home
          </NavLink>

          <NavLink className={activeClass} to="/wishlist">
            <div className="relative rounded-full p-1 transition hover:bg-orange-50">
              <Heart size={20} className="text-zinc-700" />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#f97316] px-1 text-[10px] font-bold text-white shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </div>
          </NavLink>

          <NavLink className={activeClass} to="/cart">
            <div className="relative rounded-full p-1 transition hover:bg-orange-50">
              <ShoppingCart size={20} className="text-zinc-700" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#f97316] px-1 text-[10px] font-bold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
          </NavLink>

          <div className="h-4 w-px bg-zinc-200"></div>

          {user ? (
            <div className="flex items-center gap-5">
              <NavLink className={activeClass} to="/orders">
                My Orders
              </NavLink>

              <NavLink className={activeClass} to="/profile">
                <span className="inline-flex items-center justify-center rounded-xl border border-orange-100 bg-orange-50 px-3 py-1.5 text-sm font-semibold text-zinc-800 shadow-sm">
                  {user.name}
                </span>
              </NavLink>
              {user.role === "admin" && (
                <NavLink className={activeClass} to="/admin">
                  Admin Panel
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="text-sm font-semibold tracking-wide text-rose-600 transition hover:text-rose-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink className={activeClass} to="/login">
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-xl bg-[#f97316] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(249,115,22,0.2)] transition duration-150 hover:bg-[#ea580c] active:scale-[0.98]"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>

        <button
          className="rounded-xl p-2 text-zinc-700 transition hover:bg-orange-50 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-orange-100 bg-white/95 px-4 py-5 md:hidden">
          <div className="flex flex-col gap-2">
            <NavLink to="/" onClick={closeMenu} className={mobileActiveClass}>
              Home
            </NavLink>
            <NavLink
              to="/wishlist"
              onClick={closeMenu}
              className={mobileActiveClass}
            >
              Wishlist ({wishlistCount})
            </NavLink>
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={mobileActiveClass}
            >
              Cart ({cartCount})
            </NavLink>

            <div className="my-2 border-t border-zinc-100"></div>

            {user ? (
              <>
                <NavLink
                  to="/orders"
                  onClick={closeMenu}
                  className={mobileActiveClass}
                >
                  My Orders
                </NavLink>
                <NavLink
                  to="/profile"
                  onClick={closeMenu}
                  className={mobileActiveClass}
                >
                  Profile ({user.name})
                </NavLink>
                {user.role === "admin" && (
                  <NavLink
                    to="/admin"
                    onClick={closeMenu}
                    className={mobileActiveClass}
                  >
                    🛠 Admin Panel
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="mt-1 rounded-xl px-4 py-2.5 text-left font-semibold text-rose-600 transition hover:bg-rose-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-3">
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-xl border border-zinc-200 px-4 py-2.5 text-center font-medium text-zinc-700 transition hover:bg-zinc-50"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-xl bg-[#f97316] px-4 py-2.5 text-center font-medium text-white transition hover:bg-[#ea580c]"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
