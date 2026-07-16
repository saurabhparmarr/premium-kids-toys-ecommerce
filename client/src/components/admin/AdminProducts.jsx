import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  deleteProduct,
} from "../../features/admin/adminSlice";
import ProductTable from "../../components/admin/ProductTable";

const AdminProducts = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-800">
          Products Management
        </h1>
      </div>

      {loading ? (
  <Loader message="Fetching products for admin..." />
) : (
  <ProductTable products={products} onDelete={handleDelete} />
)}
    </div>
  );
};

export default AdminProducts;
