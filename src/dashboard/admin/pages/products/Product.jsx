import { Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { API_URI, setImageURL } from "../../../../config";
import services from "../../../../services/products.service";
import { fetchproducts } from "../../../../store/slices/products.slice";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basePath = `/admin/products`;
  const { products, loading, error } = useSelector((state) => state.product);
  const [formData, setFormData] = useState({
    isActive: "",
    search: "",
  });
  const [rejectingProduct, setRejectingProduct] = useState(null);
  const [reason, setReason] = useState("");
  const [actionError, setActionError] = useState("");

  const getProducts = (filters = formData) => {
    dispatch(
      fetchproducts({
        scope: "admin",
        ...filters,
      }),
    );
  };

  useEffect(() => {
    getProducts({
      isActive: "",
      search: "",
    });
  }, [dispatch]);

  const deleteProduct = async (product_id) => {
    try {
      await services.deleteProduct(product_id);
      getProducts();
    } catch (deleteError) {
      console.log(deleteError);
    }
  };

  const updateApproval = async (productId, action, rejectionReason = "") => {
    setActionError("");
    try {
      const response = await fetch(`${API_URI}/admin/products/${productId}/${action}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: action === "reject" ? JSON.stringify({ reason: rejectionReason }) : undefined,
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Product status could not be updated");
      setRejectingProduct(null);
      setReason("");
      getProducts();
    } catch (approvalError) {
      setActionError(approvalError.message);
    }
  };

  const statusClass = (status) => ({
    approved: "bg-emerald-100 text-emerald-700",
    rejected: "bg-rose-100 text-rose-700",
    pending: "bg-amber-100 text-amber-700",
  }[status] || "bg-slate-100 text-slate-700");

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.16em] text-indigo-600">
            Catalog
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
            Products
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your store catalog in one place.
          </p>
        </div>

        <button
          onClick={() => navigate(`${basePath}/add`)}
          className="ui-button"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="ui-card p-5">
          <h3 className="text-gray-500">Total Products</h3>
          <h2 className="mt-2 text-3xl font-bold">{products.length}</h2>
        </div>

        <div className="ui-card p-5">
          <h3 className="text-gray-500">Active</h3>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {products.filter((item) => item.isActive).length}
          </h2>
        </div>

        <div className="ui-card p-5">
          <h3 className="text-gray-500">Inactive</h3>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {products.filter((item) => item.isActive === false).length}
          </h2>
        </div>
      </div>

      <div className="ui-card flex flex-col gap-3 p-4 md:flex-row">
        <div className="relative w-full md:w-80 ">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={formData.search}
            onChange={(e) =>
              setFormData({ ...formData, search: e.target.value })
            }
            type="text"
            placeholder="Search Product..."
            className="ui-input py-2.5 pl-10"
          />
        </div>
        <div>
          <select
            value={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.value })
            }
            className="ui-input py-2.5 md:w-60"
          >
            <option value="">Select</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <button
          className="ui-button bg-emerald-600 hover:bg-emerald-700"
          onClick={() => getProducts()}
        >
          <Search size={18} />
          Search
        </button>
      </div>

      {actionError && <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{actionError}</p>}

      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>MRP</th>
              <th>Approval</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item._id || item.id}>
                <td className="font-semibold text-slate-800">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img
                        src={setImageURL(item.image)}
                        alt={item.name}
                        className="h-11 w-11 rounded-lg border object-cover"
                      />
                    ) : (
                      <div className="h-11 w-11 rounded-lg bg-slate-100" />
                    )}
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>{item?.category?.title}</td>
                <td>{item.vendor?.name || item.vendor?.email || "Admin"}</td>
                <td className="font-medium text-slate-800">₹ {item.saleprice}</td>
                <td>₹ {item.mrp}</td>

                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass(item.approvalStatus)}`}>
                    {item.approvalStatus || "approved"}
                  </span>
                  {item.approvalStatus === "rejected" && item.rejectionReason && <p className="mt-1 max-w-40 text-xs text-rose-600">{item.rejectionReason}</p>}
                </td>

                <td className="space-x-2 text-center">
                  <Link
                    to={`${basePath}/edit/${item._id}`}
                    className="inline-flex rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="inline-flex rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                  >
                    Delete
                  </button>
                  {item.approvalStatus === "pending" && <>
                    <button onClick={() => updateApproval(item._id, "approve")} className="inline-flex rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">Approve</button>
                    <button onClick={() => { setRejectingProduct(item); setReason(""); }} className="inline-flex rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700">Reject</button>
                  </>}
                </td>
              </tr>
            ))}
            {!products.length && (
              <tr>
                <td colSpan="7" className="p-10 text-center text-slate-500">
                  {loading ? "Loading products..." : error || "No products found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {rejectingProduct && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4"><form onSubmit={(event) => { event.preventDefault(); updateApproval(rejectingProduct._id, "reject", reason); }} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><h2 className="text-xl font-bold">Reject {rejectingProduct.name}</h2><p className="mt-2 text-sm text-slate-500">Why are you rejecting this product?</p><textarea required value={reason} onChange={(event) => setReason(event.target.value)} className="mt-4 w-full rounded-lg border p-3" rows="4" placeholder="Product image is not clear" /><div className="mt-5 flex justify-end gap-3"><button type="button" onClick={() => setRejectingProduct(null)} className="rounded-lg border px-4 py-2">Cancel</button><button className="rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white">Reject Product</button></div></form></div>}
    </div>
  );
};

export default Products;
