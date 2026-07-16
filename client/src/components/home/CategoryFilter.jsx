import { useEffect, useState } from "react";
import api from "../../api/axios";

const CategoryFilter = ({ selected, onSelect }) => {
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/products/categories");
        setCategories(["All", ...data]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories(["All"]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="mt-6 flex flex-wrap gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-9 w-20 animate-pulse rounded-full bg-orange-50" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            selected === category
              ? "border-[#f97316] bg-[#f97316] text-white shadow-[0_10px_25px_rgba(249,115,22,0.16)]"
              : "border-orange-100 bg-white text-zinc-700 hover:border-[#f97316] hover:text-[#f97316]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;