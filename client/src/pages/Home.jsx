import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SkeletonGrid from "../components/common/SkeletonGrid";
import ProductGrid from "../components/product/ProductGrid";
import SearchBar from "../components/home/SearchBar";
import CategoryFilter from "../components/home/CategoryFilter";
import Pagination from "../components/home/Pagination";

import useDebounce from "../hooks/useDebounce";
import { getProducts } from "../features/product/productThunk";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error, page, pages } = useSelector((state) => state.product);

  // States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce logic for better performance
  const debouncedSearch = useDebounce(search, 500);
  const debouncedMinPrice = useDebounce(minPrice, 800);
  const debouncedMaxPrice = useDebounce(maxPrice, 800);

  useEffect(() => {
    dispatch(
      getProducts({
        page: currentPage,
        limit: 8,
        keyword: debouncedSearch,
        category: category === "All" ? "" : category,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
        ageGroup,
      })
    );
  }, [dispatch, currentPage, debouncedSearch, category, debouncedMinPrice, debouncedMaxPrice, ageGroup]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, category, debouncedMinPrice, debouncedMaxPrice, ageGroup]);

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section ... (Keep as it is) */}

      <section className="mx-auto max-w-7xl px-4 py-14">
        {/* Filter UI */}
        <div className="mb-8 flex flex-col gap-4 border-b pb-6">
          <div className="flex flex-wrap gap-4 items-end">
            <SearchBar value={search} onChange={setSearch} />
            
            <input 
              type="number" placeholder="Min Price" className="border px-3 py-2 rounded-lg"
              value={minPrice} onChange={(e) => setMinPrice(e.target.value)} 
            />
            <input 
              type="number" placeholder="Max Price" className="border px-3 py-2 rounded-lg"
              value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} 
            />
            <select className="border px-3 py-2 rounded-lg" onChange={(e) => setAgeGroup(e.target.value)}>
              <option value="">All Ages</option>
              <option value="0-2">0-2 Years</option>
              <option value="3-5">3-5 Years</option>
              <option value="6-8">6-8 Years</option>
            </select>
          </div>

          <CategoryFilter selected={category} onSelect={setCategory} />
        </div>

       
        {loading ? <SkeletonGrid /> : <ProductGrid products={products} />}
        
        <div className="flex justify-center pt-8">
          <Pagination page={page} pages={pages} onPageChange={setCurrentPage} />
        </div>
      </section>
    </div>
  );
};

export default Home;