import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

import Loader from "../components/common/Loader"; // Ensure your path is correct
import Price from "../components/common/Price";
import Rating from "../components/common/Rating";
import Button from "../components/common/Button";

import { getProductByIdentifier } from "../features/product/productThunk"; 
import { addToCart } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector((state) => state.product);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Product added to cart");
    navigate("/cart");
  };

  useEffect(() => {
    dispatch(getProductByIdentifier(id));
  }, [dispatch, id]);

  // Dynamic Loader implementation
  if (loading) {
    return <Loader message="Fetching product details..." />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-rose-50 border border-rose-200 text-rose-700 font-semibold px-6 py-4 rounded-xl shadow-sm">
          ⚠️ Error: {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-black text-zinc-900">Product Not Found</h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen px-4 py-12">
      <Helmet>
        <title>{product.name || "Product Details"}</title>
      </Helmet>
      
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-orange-100 bg-white p-6 shadow-lg sm:p-10">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="flex items-center justify-center rounded-[1.75rem] bg-orange-50/30 p-4">
            <img 
              src={product.images?.[0] || "https://placehold.co/400x400?text=Toy"} 
              alt={product.name} 
              className="max-h-[500px] object-contain" 
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-black text-zinc-950 sm:text-4xl">{product.name}</h1>
            <div className="mt-4"><Rating value={product.ratings} reviews={product.numReviews} /></div>
            <div className="mt-5"><Price price={product.price} offerPrice={product.offerPrice} /></div>
            <p className="mt-6 text-zinc-600">{product.description}</p>
            
            <Button className="mt-8 w-full bg-[#f97316] py-4" onClick={handleAddToCart}>
              Add To Shopping Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;