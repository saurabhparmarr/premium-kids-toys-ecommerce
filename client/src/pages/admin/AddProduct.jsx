import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../components/admin/AdminLayout";
import ProductForm from "../../components/admin/forms/ProductForm";

import { createProduct } from "../../features/product/productThunk";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createProduct(data)).unwrap();

      toast.success("Product Added Successfully");

      navigate("/admin/products");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-6">
        {/* Top Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-zinc-950 tracking-tight">
            Add New Product
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Fill in the details below to add a new toy to the store inventory.
          </p>
        </div>

        {/* Product Form Wrapper Card */}
        <div className="bg-white border border-zinc-200/60 shadow-xl rounded-2xl p-6 md:p-8 transition-all">
          <ProductForm onSubmit={handleSubmit} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;