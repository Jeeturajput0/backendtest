import { Search, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../config";
import { useEffect, useState } from "react";

const defaultProducts = [
  {
    id: 1,
    name: "Nike Shoes",
    category: "Footwear",
    price: "$120",
    stock: 15,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Apple Watch",
    category: "Electronics",
    price: "$350",
    stock: 8,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Leather Bag",
    category: "Accessories",
    price: "$90",
    stock: 0,
    status: "Out of Stock",
  },
];

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(defaultProducts);
  const [formData, setFormData] = useState({
    isActive: "",
    search: "",
  });

  const getProducts = async () => {
    try {
      const res = await fetch(
        `${API_URI}/admin/product?is_active=${formData.isActive}&search=${formData.search}`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        },
      );
      const resData = await res.json();
      setProducts(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (product_id) => {
    try {
      const res = await fetch(`${API_URI}/admin/product/${product_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      getProducts();
      alert("product deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500">Manage all your products here.</p>
        </div>

        <button
          onClick={() => navigate("/admin/products/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Total Products</h3>
          <h2 className="text-3xl font-bold mt-2">120</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">In Stock</h3>
          <h2 className="text-3xl font-bold text-green-600 mt-2">95</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Out of Stock</h3>
          <h2 className="text-3xl font-bold text-red-600 mt-2">25</h2>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-4 flex gap-3">
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
            className="w-full border rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <select
            value={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, ["isActive"]: e.target.value })
            }
            className="w-full md:w-60 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >

            <option value="">Select</option>
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>
        <button
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => getProducts()}
        >
          <Search size={18} />
          Search
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">MRP</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">{item?.category?.title}</td>
                <td className="p-4">{item.saleprice}</td>
                <td className="p-4">{item.mrp}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.isActive ? "Active" : "In-Active"}
                  </span>
                </td>

                <td className="p-4 text-center space-x-2">
                  <Link
                    to={`/admin/products/edit/${item._id}`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
