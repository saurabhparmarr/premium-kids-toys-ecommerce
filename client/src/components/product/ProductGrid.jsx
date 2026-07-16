import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  if (!products || !products.length) {
    return (
      <div className="py-20 text-center bg-white border border-zinc-200/60 rounded-2xl shadow-sm max-w-xl mx-auto px-4 mt-10">
        <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
          🔍
        </div>
        <h3 className="text-xl font-black text-zinc-900 tracking-tight">
          No Products Found
        </h3>
        <p className="text-zinc-500 mt-1 text-sm max-w-xs mx-auto">
          We couldn't find any results matching your choice. Try another category or search keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default React.memo(ProductGrid);