import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PlusCircle,
  X,
  ArrowLeft,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menus = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Products", path: "/admin/products", icon: <Package size={20} /> },
    { name: "Add Product", path: "/admin/products/add", icon: <PlusCircle size={20} /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={20} /> },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
        onClick={toggleSidebar}
      />

      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white/95 px-4 py-6 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button className="absolute right-4 top-4 lg:hidden" onClick={toggleSidebar}>
          <X size={24} className="text-zinc-500" />
        </button>

        <div className="rounded-[1.25rem] border border-orange-100 bg-orange-50/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f97316]">Studio Panel</p>
          <h2 className="mt-2 text-2xl font-black text-zinc-950">Admin</h2>
        </div>

        <nav className="mt-5 flex-1 space-y-2">
          {menus.map((menu) => (
            <NavLink 
              key={menu.path} 
              to={menu.path} 
              end 
              onClick={toggleSidebar} 
              className={({ isActive }) => 
                `flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition ${
                  isActive 
                    ? "bg-[#f97316] text-white shadow-[0_10px_25px_rgba(249,115,22,0.16)]" 
                    : "text-zinc-600 hover:bg-orange-50 hover:text-[#f97316]"
                }`
              }
            >
              {menu.icon}
              {menu.name}
            </NavLink>
          ))}
        </nav>

        {/* Back to Store Link */}
        <div className="mt-auto pt-6 border-t border-zinc-100">
          <NavLink 
            to="/" 
            className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold text-zinc-500 hover:bg-orange-50 hover:text-[#f97316] transition"
          >
            <ArrowLeft size={20} />
            Back to Store
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;