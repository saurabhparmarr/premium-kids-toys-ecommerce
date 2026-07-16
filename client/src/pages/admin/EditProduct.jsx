import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../components/admin/AdminLayout";
import ProductForm from "../../components/admin/forms/ProductForm";
import Loader from "../../components/common/Loader";

import {
  getProductByIdentifier,
  updateProduct,
} from "../../features/product/productThunk";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { product, loading } = useSelector((state) => state.product);

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

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      // Interceptor handle karega, yahan toast hat gaya hai.
    }
  };

  if (loading || !product) {
    return (
      <AdminLayout>
        <Loader message="Loading product data for editing..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-950">
            Edit Product
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Modify the necessary fields to update the product information.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-xl md:p-8">
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