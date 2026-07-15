import { useEffect, useState } from "react";
import { Plus, X, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../config";

const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    products: 25,
    status: "Active",
  },
  {
    id: 2,
    name: "Fashion",
    slug: "fashion",
    products: 18,
    status: "Active",
  },
  {
    id: 3,
    name: "Shoes",
    slug: "shoes",
    products: 12,
    status: "Inactive",
  },
];

const CategoryList = () => {
  const Navigate = useNavigate();

  const [category, setcategory] = useState();
  const getcategory = async () => {
    try {
      const res = await fetch(`${API_URI}/admin/category`, {
        headers: {
          Authorization: `barber ${AUTH_TOKEN}`,
        },
      });
      const resData = await res.json();
      setcategory(resData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcategory();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-500">Manage your product categories.</p>
        </div>

        <button
          onClick={() => Navigate("/admin/categories/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">#</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Slug</th>
              <th className="text-left p-4">Products</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{item.id}</td>
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">{item.slug}</td>
                <td className="p-4">{item.products}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-4 text-center space-x-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>

                  <button className="bg-red-600 text-white px-3 py-1 rounded">
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

export default CategoryList;
