import { Package, ShoppingCart, IndianRupee, Users } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardCards = ({ products, orders, revenue, users }) => {
  const stats = [
    {
      title: "Products",
      value: products,
      icon: <Package size={28} />,
      color: "bg-blue-500",
      path: "/admin/products",
    },
    {
      title: "Orders",
      value: orders,
      icon: <ShoppingCart size={28} />,
      color: "bg-green-500",
      path: "/admin/orders",
    },
    {
      title: "Revenue",
      value: `₹${Number(revenue || 0).toLocaleString("en-IN")}`,
      icon: <IndianRupee size={28} />,
      color: "bg-yellow-500",
      path: "#",
    },
    {
      title: "Users",
      value: users,
      icon: <Users size={28} />,
      color: "bg-pink-500",
      path: "#",
    },
  ];

  return (
    <>
      <h2 className="mb-8 text-3xl font-black tracking-tight text-zinc-950">
        Dashboard Overview
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) =>
          item.path !== "#" ? (
            <Link
              to={item.path}
              key={item.title}
              className="flex items-center justify-between rounded-[1.5rem] border border-orange-100 bg-white p-6 shadow-[0_16px_35px_rgba(15,23,42,0.05)] transition hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]"
            >
              {/* Card Content... */}
              <div>
                <p className="text-sm font-semibold text-zinc-500">
                  {item.title}
                </p>
                <h2 className="mt-2 text-3xl font-black text-zinc-950">
                  {item.value}
                </h2>
              </div>
              <div
                className={`${item.color} flex h-14 w-14 items-center justify-center rounded-full text-white`}
              >
                {item.icon}
              </div>
            </Link>
          ) : (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-[1.5rem] border border-orange-100 bg-white p-6 shadow-[0_16px_35px_rgba(15,23,42,0.05)]"
            >
              {/* Static Card Content... */}
              <div>
                <p className="text-sm font-semibold text-zinc-500">
                  {item.title}
                </p>
                <h2 className="mt-2 text-3xl font-black text-zinc-950">
                  {item.value}
                </h2>
              </div>
              <div
                className={`${item.color} flex h-14 w-14 items-center justify-center rounded-full text-white`}
              >
                {item.icon}
              </div>
            </div>
          ),
        )}
      </div>
    </>
  );
};

export default DashboardCards;
