import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-orange-100/80 bg-white/80 py-8 text-zinc-600 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-black tracking-tight text-zinc-950">KidsToys</h2>
          <p className="mt-1 text-xs font-medium text-zinc-500">Premium Kids Toys Ecommerce Store</p>
        </div>

        <div className="flex items-center gap-5 text-xs font-semibold text-zinc-500">
          <Link to="/" className="transition hover:text-[#f97316]">Shop</Link>
          <Link to="/orders" className="transition hover:text-[#f97316]">Track Orders</Link>
          <Link to="/wishlist" className="transition hover:text-[#f97316]">Wishlist</Link>
        </div>

        <div className="text-center sm:text-right">
          <p className="text-xs font-medium tracking-wide text-zinc-400">&copy; {new Date().getFullYear()} KidsToys. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;