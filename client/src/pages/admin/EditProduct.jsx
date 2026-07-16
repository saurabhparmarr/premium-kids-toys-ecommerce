import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../components/admin/AdminLayout";
import ProductForm from "../../components/admin/forms/ProductForm";

import { getProductByIdentifier, updateProduct } from "../../features/product/productThunk";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductByIdentifier(id));
  }, [dispatch, id]);

  const submitHandler = async (data) => {
    try {
      await dispatch(
        updateProduct({
          id,
          productData: data,
        })
      ).unwrap();

      toast.success("Product Updated");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err);
    }
  };

  if (!product) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-zinc-500 font-medium">Loading Product Data...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-6">
        {/* Top Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-zinc-950 tracking-tight">
            Edit Product
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Modify the necessary fields to update the toy's information in the database.
          </p>
        </div>

        {/* Product Form Wrapper Card */}
        <div className="bg-white border border-zinc-200/60 shadow-xl rounded-2xl p-6 md:p-8 transition-all">
          <ProductForm
            initialData={product}
            onSubmit={submitHandler}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;