import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const emptyProductData = {};

const ProductForm = ({ initialData = emptyProductData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    offerPrice: "",
    category: "",
    ageGroup: "",
    stock: "",
    brand: "",
    image: "",
    isFeatured: false,
  });

  useEffect(() => {
    setFormData({
      name: initialData.name || "",
      description: initialData.description || "",
      price: initialData.price ?? "",
      offerPrice:
        initialData.offerPrice && initialData.offerPrice > 0
          ? initialData.offerPrice
          : "",
      category: initialData.category || "",
      ageGroup: initialData.ageGroup || "",
      stock: initialData.stock ?? "",
      brand: initialData.brand || "",
      image:
        initialData.images?.[0] ||
        initialData.image ||
        "",
      isFeatured: initialData.isFeatured || false,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const price = Number(formData.price);
    const offerPrice =
      formData.offerPrice === ""
        ? undefined
        : Number(formData.offerPrice);
    const stock = Number(formData.stock);

    if (!formData.name.trim())
      return toast.error("Product name is required");

    if (!formData.brand.trim())
      return toast.error("Brand is required");

    if (!formData.category.trim())
      return toast.error("Category is required");

    if (price <= 0)
      return toast.error("Price must be greater than 0");

    if (offerPrice !== undefined && offerPrice <= 0)
      return toast.error("Offer Price must be greater than 0");

    if (
      offerPrice !== undefined &&
      offerPrice > price
    )
      return toast.error(
        "Offer Price cannot be greater than Price"
      );

    if (stock < 0)
      return toast.error(
        "Stock cannot be negative"
      );

    if (
      formData.image &&
      !/^https?:\/\/.+/i.test(formData.image)
    ) {
      return toast.error(
        "Enter a valid Image URL"
      );
    }
    if (!formData.ageGroup.trim()) {
  return toast.error("Age Group is required");
}

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      brand: formData.brand.trim(),
      category: formData.category.trim(),
      ageGroup: formData.ageGroup.trim(),
      image: formData.image.trim(),
      isFeatured: formData.isFeatured,
      price,
      offerPrice,
      stock,
    });
  };

  return (
    <form onSubmit={submitHandler} className="grid gap-5 md:grid-cols-2">
      <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="rounded-2xl border border-orange-100 bg-orange-50/40 p-3 text-zinc-900 placeholder-zinc-400 transition focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-orange-100" required />

      <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} className="rounded-2xl border border-orange-100 bg-orange-50/40 p-3 text-zinc-900 placeholder-zinc-400 transition focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-orange-100" required />

      <input type="number" min="1" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="rounded-2xl border border-orange-100 bg-orange-50/40 p-3 text-zinc-900 placeholder-zinc-400 transition focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-orange-100" required />

      <input type="number" min="0" name="offerPrice" placeholder="Offer Price (Optional)" value={formData.offerPrice} onChange={handleChange} className="rounded-2xl border border-orange-100 bg-orange-50/40 p-3 text-zinc-900 placeholder-zinc-400 transition focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-orange-100" />

      <input type="number" min="0" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="rounded-2xl border border-orange-100 bg-orange-50/40 p-3 text-zinc-900 placeholder-zinc-400 transition focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-orange-100" required />

      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="rounded-2xl border border-orange-100 bg-orange-50/40 p-3 text-zinc-900 placeholder-zinc-400 transition focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-orange-100" required />

      <select name="ageGroup" value={formData.ageGroup} onChange={handleChange} className="rounded-2xl border border-orange-100 bg-orange-50/40 p-3 text-zinc-900 transition focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-orange-100" required>
        <option value="">Select Age Group</option>
        <option>0-2 Years</option>
        <option>3-5 Years</option>
        <option>6-8 Years</option>
        <option>9-12 Years</option>
      </select>

      <input type="url" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="rounded-2xl border border-orange-100 bg-orange-50/40 p-3 text-zinc-900 placeholder-zinc-400 transition focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-orange-100" required />

      <textarea rows={5} name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="rounded-[1.25rem] border border-orange-100 bg-orange-50/40 p-3 text-zinc-900 placeholder-zinc-400 transition focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-orange-100 md:col-span-2" required />

      <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 md:col-span-2">
        <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="h-4 w-4 rounded border-orange-200 text-[#f97316] focus:ring-[#f97316]" />
        Featured Product
      </label>

      <button type="submit" className="rounded-2xl bg-[#f97316] py-3 font-semibold text-white shadow-[0_10px_25px_rgba(249,115,22,0.16)] transition hover:bg-[#ea580c] md:col-span-2">
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;
