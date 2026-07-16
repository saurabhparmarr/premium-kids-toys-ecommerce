import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, User, LogOut, ChevronDown, ShoppingBag, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../features/auth/authThunk";

const Topbar = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="flex items-center justify-between border-b border-orange-100 bg-white/80 px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-xl bg-orange-50 text-[#f97316] hover:bg-orange-100 transition">
          <Menu size={22} />
        </button>
        <div>
          <h1 className="text-xl font-black tracking-tight text-zinc-950 sm:text-2xl">Admin Dashboard</h1>
        </div>
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 border border-orange-100 hover:bg-orange-50 transition"
        >
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[#f97316]">
            <User size={16} />
          </div>
          <span className="hidden sm:block font-semibold text-sm">{user?.name}</span>
          <ChevronDown size={16} className="text-zinc-400" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-zinc-100 py-2 z-50">
            <Link to="/" className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 text-sm font-medium"><Home size={16} /> Home</Link>
            <Link to="/orders" className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 text-sm font-medium"><ShoppingBag size={16} /> My Orders</Link>
            <button 
              onClick={() => dispatch(logoutUser())} 
              className="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 text-sm font-medium"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;