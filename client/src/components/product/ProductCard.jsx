import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

import { addToCart } from "../../features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setIsWishlisted(
      wishlist.some((item) => item._id === product._id)
    );
  }, [product._id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
    toast.success("Product added to cart");
  };

  const handleWishlist = () => {
    let wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isWishlisted) {
      wishlist = wishlist.filter(
        (item) => item._id !== product._id
      );
      toast.success("Removed from wishlist");
    } else {
      wishlist.push(product);
      toast.success("Added to wishlist");
    }

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-orange-100 bg-white shadow-[0_16px_35px_rgba(15,23,42,0.05)] transition duration-200 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
      <button onClick={handleWishlist} className="absolute right-3 top-3 z-10 rounded-xl border border-orange-100 bg-white/90 p-2.5 shadow-sm backdrop-blur transition duration-150 hover:scale-105 active:scale-90">
        <Heart size={18} fill={isWishlisted ? "#e11d48" : "none"} className={`${isWishlisted ? "text-rose-600" : "text-zinc-400 group-hover:text-zinc-600"} transition-colors duration-150`} />
      </button>

      <Link to={`/product/${product._id}`} className="relative block h-56 overflow-hidden border-b border-orange-100 bg-orange-50/70">
        <img loading="lazy" src={product.images?.[0] || "https://placehold.co/400x400?text=Toy"} alt={product.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
      </Link>

      <div className="flex flex-grow flex-col justify-between p-4">
        <div>
          <span className="rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f97316]">{product.category}</span>
          <h3 className="mt-2 text-sm font-bold tracking-tight text-zinc-900 transition duration-150 group-hover:text-[#f97316] md:text-base line-clamp-1">{product.name}</h3>

          <div className="mt-2 flex items-baseline gap-2">
            {product.offerPrice > 0 ? (
              <>
                <span className="text-lg font-black text-zinc-950">₹{product.offerPrice}</span>
                <span className="text-xs font-medium text-zinc-400 line-through">₹{product.price}</span>
              </>
            ) : (
              <span className="text-lg font-black text-zinc-950">₹{product.price}</span>
            )}
          </div>
        </div>

        <button onClick={handleAddToCart} className="mt-5 w-full rounded-2xl bg-[#f97316] py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(249,115,22,0.16)] transition duration-200 hover:bg-[#ea580c] active:scale-[0.98]">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);