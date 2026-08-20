import axios from "axios";
import {
  Edit,
  Package,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URI, setImageURL } from "../../../../config";

const VendorProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URI}/vendor/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProducts(res.data.data || []);
    } catch (error) {
      console.log(
        "Vendor Products Error:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (product_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URI}/vendor/products/${product_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProducts((current) =>
        current.filter((item) => item._id !== product_id),
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Product delete failed",
      );
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 rounded bg-slate-200" />

          <div className="mt-8 h-64 rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
            Vendor Panel
          </p>

          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
            My Products
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your store products.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/vendor/products/add")
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Empty */}
      {products.length === 0 ? (
        <div className="grid min-h-80 place-items-center rounded-2xl border border-dashed border-slate-300 bg-white text-center">
          <div>
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Package size={25} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No products yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add your first product to your store.
            </p>

            <button
              onClick={() =>
                navigate("/vendor/products/add")
              }
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
            >
              Add Product
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-sm font-bold text-slate-600">
                    Product
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-bold text-slate-600">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-bold text-slate-600">
                    Price
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-bold text-slate-600">
                    Approval status
                  </th>

                  <th className="px-5 py-4 text-right text-sm font-bold text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={setImageURL(product.image)}
                          alt={product.name}
                          className="h-14 w-14 rounded-xl object-cover"
                        />

                        <div>
                          <p className="font-bold text-slate-900">
                            {product.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {product.color} · {product.size?.name || []}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {product.category?.title || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-900">
                        ₹{product.saleprice}
                      </p>

                      {product.mrp > product.saleprice && (
                        <p className="text-xs text-slate-400 line-through">
                          ₹{product.mrp}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm">
                      <p className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${product.approvalStatus === "approved" ? "bg-emerald-100 text-emerald-700" : product.approvalStatus === "rejected" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>
                        {product.approvalStatus || "pending"}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        {product.approvalStatus === "approved" ? "Approved and visible on website" : product.approvalStatus === "rejected" ? `Reason: ${product.rejectionReason || "Not provided"}` : "Waiting for admin approval"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/vendor/products/edit/${product._id}`,
                            )
                          }
                          className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          onClick={() =>
                            deleteProduct(product._id)
                          }
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorProducts;
