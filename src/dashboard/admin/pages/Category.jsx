import { useEffect, useState } from "react";
import { Plus, X, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../config";

const defualtcategory = [
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

const Category = () => {
  const Navigate = useNavigate();

  const [categories, setCategories] = useState(defualtcategory);

  const getcategory = async () => {
    try {
      const res = await fetch(`${API_URI}/admin/category`, {
        headers: {
         Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      const resData = await res.json();
      setCategories(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const categoryDelete = async (category_id) => {
    try {
      const res = await fetch(`${API_URI}/admin/category/${category_id}`, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const resData = await res.json();

      alert(resData.message);
      getcategory();
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
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Action</th>
            </tr>
          </thead>

         <tbody>
  {categories.map((item, index) => (
    <tr key={item._id} className="border-t hover:bg-gray-50">

      <td className="p-4">{index + 1}</td>

      <td className="p-4 font-medium">
        {item.title}
      </td>

      <td className="p-4">
        {item.slug}
      </td>

      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            item.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.isActive ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="p-4 text-center space-x-2">
        <Link to={`/admin/categories/edit/${item._id}`}>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded">
            Edit
          </button>
        </Link>

        <button
          onClick={() => categoryDelete(item._id)}
          className="bg-red-600 text-white px-3 py-1 rounded"
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

export default Category;
