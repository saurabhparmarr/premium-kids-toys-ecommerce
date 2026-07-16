import { Link } from "react-router-dom";

const ProductTable = ({
  products,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto bg-white">
      <table className="w-full">
        <thead className="bg-orange-50/80">
          <tr>
            <th className="p-4 text-left text-sm font-semibold text-zinc-600">Image</th>
            <th className="p-4 text-left text-sm font-semibold text-zinc-600">Name</th>
            <th className="p-4 text-left text-sm font-semibold text-zinc-600">Category</th>
            <th className="p-4 text-left text-sm font-semibold text-zinc-600">Price</th>
            <th className="p-4 text-left text-sm font-semibold text-zinc-600">Stock</th>
            <th className="p-4 text-center text-sm font-semibold text-zinc-600">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t border-orange-100">
              <td className="p-4">
                <img src={product.images?.[0]} alt={product.name} className="h-14 w-14 rounded-2xl object-cover" />
              </td>

              <td className="p-4 font-semibold text-zinc-800">{product.name}</td>
              <td className="p-4 text-zinc-600">{product.category}</td>
              <td className="p-4 font-semibold text-zinc-800">₹{product.offerPrice}</td>
              <td className="p-4 text-zinc-600">{product.stock}</td>

              <td className="p-4">
                <div className="flex justify-center gap-3">
                  <Link to={`/admin/products/edit/${product._id}`} className="rounded-xl bg-sky-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-sky-700">Edit</Link>
                  <button onClick={() => onDelete(product._id)} className="rounded-xl bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-rose-700">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;