import axios from "axios";
import { Edit3, Eye, Package, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URI, setImageURL } from "../../../../config";

const statusStyle = {
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  rejected: "bg-rose-50 text-rose-700 ring-rose-100",
  pending: "bg-amber-50 text-amber-700 ring-amber-100",
};

const VendorProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URI}/vendor/products`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(response.data.data || []);
    } catch (error) {
      console.error(
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
  const visibleProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (status === "all" ||
            (product.approvalStatus || "pending") === status) &&
          product.name?.toLowerCase().includes(search.toLowerCase()),
      ),
    [products, search, status],
  );
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_URI}/vendor/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts((current) => current.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Product delete failed");
    }
  };

  return (
    <div className="mx-auto max-w-[1500px] p-5 sm:p-7 lg:p-8">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.16em] text-blue-600">
            Store
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950">
            My Products
          </h1>
          <p className="mt-2 text-slate-500">
            Manage products in your store and follow their approval status.
          </p>
        </div>
        <button
          onClick={() => navigate("/vendor/products/add")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700"
        >
          <Plus size={19} />
          Add Product
        </button>
      </div>
      <div className="mb-7 grid gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,.06)] md:grid-cols-[1fr_300px]">
        <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 text-slate-400">
          <Search size={19} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your products..."
            className="w-full bg-transparent py-3 outline-none"
          />
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 font-medium text-slate-700 outline-none"
        >
          <option value="all">All approval statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      {loading ? (
        <div className="h-72 animate-pulse rounded-3xl bg-white" />
      ) : !visibleProducts.length ? (
        <div className="grid min-h-80 place-items-center rounded-3xl border border-dashed border-slate-300 bg-white text-center">
          <div>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Package />
            </span>
            <h2 className="mt-4 text-xl font-bold">No products found</h2>
            <p className="mt-2 text-sm text-slate-500">
              Add a product or change your search filters.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-[0_10px_30px_rgba(15,23,42,.06)]">
          <table className="w-full min-w-[960px] text-left">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-5">Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Approval</th>
                <th>Created</th>
                <th className="px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleProducts.map((product) => {
                const productStatus = product.approvalStatus || "pending";
                return (
                  <tr
                    key={product._id}
                    className="transition hover:bg-blue-50/30"
                  >
                    <td className="px-6 py-4">
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
                          <p className="mt-1 text-xs text-slate-400">
                            {product.color} · {product.size}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium text-slate-600">
                      {product.category?.title || "—"}
                    </td>
                    <td>
                      <p className="font-bold text-slate-900">
                        ₹{product.saleprice}
                      </p>
                      {product.mrp > product.saleprice && (
                        <p className="text-xs text-slate-400 line-through">
                          ₹{product.mrp}
                        </p>
                      )}
                    </td>
                    <td className="font-semibold text-slate-700">
                      {product.quantity ?? "—"}
                    </td>
                    <td>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ${statusStyle[productStatus]}`}
                      >
                        {productStatus}
                      </span>
                      {productStatus === "rejected" ? (
                        <p className="mt-2 max-w-48 text-xs text-rose-600">
                          {product.rejectionReason || "Please contact admin"}
                        </p>
                      ) : (
                        <p className="mt-2 text-xs text-slate-400">
                          {productStatus === "approved"
                            ? "Visible on website"
                            : "Waiting for approval"}
                        </p>
                      )}
                    </td>
                    <td className="text-sm text-slate-500">
                      {product.createdAt
                        ? new Date(product.createdAt).toLocaleDateString(
                            "en-IN",
                            { day: "2-digit", month: "short", year: "numeric" },
                          )
                        : "—"}
                    </td>
                    <td className="px-6">
                      <div className="flex justify-end gap-2">
                        <button
                          title="View product"
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/vendor/products/edit/${product._id}`)
                          }
                          title="Edit product"
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          title="Delete product"
                          className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VendorProducts;
