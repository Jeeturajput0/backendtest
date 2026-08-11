import { Search, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { setImageURL } from "../../../../config";
import { useEffect, useState } from "react";
import services from "../../../../services/products.service";

const Products = () => {
  const navigate = useNavigate();
  const basePath = `/admin/products`;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    isActive: "",
    search: "",
  });


  const getProducts = async () => {
  try {
    const params = {
      search: formData.search,
      isActive: formData.isActive,
    };

    const resData = await services.getAllproducts(params);

    console.log("PRODUCT RESPONSE:", resData);

    if (resData.success) {
      setProducts(resData.data || []);
      setError("");
    } else {
      setProducts([]);
      setError(resData.message || "Products not found");
    }
  } catch (error) {
    console.log(error);
    setError(error.message);
    setProducts([]);
  }
};

  const deleteProduct = async (product_id) => {
    try {
      const res = await services.deleteProduct(product_id);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      {/* Header */}
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="ui-card p-5">
          <h3 className="text-gray-500">Total Products</h3>
          <h2 className="text-3xl font-bold mt-2">{products.length}</h2>
        </div>

        <div className="ui-card p-5">
          <h3 className="text-gray-500">Active</h3>
          <h2 className="text-3xl font-bold text-green-600 mt-2">{products.filter((item) => item.isActive === true).length}</h2>
        </div>

        <div className="ui-card p-5">
          <h3 className="text-gray-500">Inactive</h3>
          <h2 className="text-3xl font-bold text-red-600 mt-2">{products.filter((item) => item.isActive === false).length}</h2>
        </div>
      </div>

      {/* Search */}
      <div className="ui-card flex flex-col gap-3 p-4 md:flex-row">
        <div className="relative w-full md:w-80 ">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            onChange={(e) =>
              setFormData({ ...formData, ["search"]: e.target.value })
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
          onClick={getProducts}
        >
          <Search size={18} />
          Search
        </button>
      </div>

      {/* Table */}
      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>MRP</th>
              <th>Status</th>
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
                <td className="font-medium text-slate-800">
                  ₹{item.saleprice}
                </td>
                <td>₹{item.mrp}</td>

                <td className="p-4">
                  <span
                    className={
                      item.isActive ? "status-active" : "status-inactive"
                    }
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="text-center space-x-2">
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
                </td>
              </tr>
            ))}
            {!products.length && (
              <tr><td colSpan="6" className="p-10 text-center text-slate-500">{error || "No products found."}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
