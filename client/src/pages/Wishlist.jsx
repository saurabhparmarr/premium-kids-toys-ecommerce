import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader"; 

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    
    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(data);
      setLoading(false);
    }, 500); 
  }, []);

  const removeWishlist = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // 1. Loading UI
  if (loading) {
    return <Loader message="Loading your favorites..." />;
  }

  // 2. Empty UI
  if (wishlist.length === 0) {
    return (
      <div className="mx-auto mt-10 max-w-7xl rounded-[2rem] border border-orange-100 bg-white/90 px-6 py-20 text-center shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-rose-500 shadow-inner">
          <Heart size={28} fill="currentColor" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Your Wishlist is Empty</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
          Save items you love here! Explore our product list and hit the heart icon to start curating.
        </p>
        <Link to="/">
          <Button className="mt-8 px-6 py-3">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  // 3. Wishlist Content UI
  return (
    <section className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-orange-100/80 pb-5">
          <h1 className="text-3xl font-black tracking-tight text-zinc-950">My Wishlist</h1>
          <p className="mt-1 text-sm text-zinc-500">Keep an eye on items you like and move them to cart anytime.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-orange-100 bg-white shadow-[0_16px_35px_rgba(15,23,42,0.05)] transition duration-200 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]"
            >
              <div className="relative h-56 w-full overflow-hidden border-b border-orange-100 bg-orange-50/60">
                <img
                  src={product.images?.[0] || "https://placehold.co/400x400?text=Toy"}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-grow flex-col justify-between p-4">
                <div>
                  <h2 className="text-base font-bold tracking-tight text-zinc-900 line-clamp-1">{product.name}</h2>
                  <p className="mt-1 text-base font-extrabold text-[#f97316]">₹{product.offerPrice || product.price}</p>
                </div>

                <div className="mt-5 flex gap-2.5">
                  <Link to={`/product/${product._id}`} className="flex-1">
                    <Button className="w-full py-2.5">View Details</Button>
                  </Link>
                  <button
                    onClick={() => removeWishlist(product._id)}
                    className="flex items-center justify-center rounded-xl border border-orange-100 bg-orange-50 px-3.5 text-zinc-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 active:scale-95"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;