import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // useNavigate import kiya
import { ArrowLeft, Plus } from "lucide-react"; // ArrowLeft import kiya
import toast from "react-hot-toast";

import ProductTable from "../../components/admin/ProductTable";
import { getProducts, deleteProduct } from "../../features/product/productThunk";
import AdminLayout from "../../components/admin/AdminLayout"; // Layout import kiya

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Navigation hook

  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts({ page: 1, limit: 100 }));
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you absolutely sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error || "Failed to delete product");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto pb-8">
        
        {/* Back Button & Header */}
        <div className="mb-6">
          <button 
            onClick={() => navigate("/admin")} 
            className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-orange-600 transition mb-4"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200/80 pb-6 gap-4">
            <div>
              <h1 className="text-3xl font-black text-zinc-950 tracking-tight">Products Inventory</h1>
              <p className="text-zinc-500 text-sm mt-1">View, manage stock, and delete existing products.</p>
            </div>
            
            <Link to="/admin/products/add">
              <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow-md transition active:scale-[0.98]">
                <Plus size={16} strokeWidth={2.5} />
                <span>Add Product</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[45vh] bg-white border border-zinc-200/60 rounded-2xl shadow-sm">
            <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-zinc-500 font-medium mt-3 text-sm">Synchronizing live inventory...</span>
          </div>
        ) : (
          <div className="bg-white border border-zinc-200/60 shadow-xl rounded-2xl overflow-hidden">
            <ProductTable products={products} onDelete={handleDelete} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;