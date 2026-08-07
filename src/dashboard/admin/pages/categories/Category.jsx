import { useEffect, useState } from "react";
import { Plus, X, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_URI, AUTH_TOKEN, setImageURL } from "../../../../config";
import services from "../../../../services/category.service";

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
      const params = {isFeatured:true};
      const resData = await services.getAllCategories(params);
      setCategories(resData.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const categoryDelete = async (category_id) => {
    try {
      const res = await services.categoryDelete(category_id);
      getcategory();
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getcategory();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Catalog</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950">Categories</h1>
          <p className="text-gray-500">Manage your product categories.</p>
        </div>

        <button
          onClick={() => Navigate("/admin/categories/add")}
          className="ui-button"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr>
              <th>#</th><th>Image</th><th>Category</th><th>Slug</th><th>Status</th><th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((item, index) => (
              <tr key={item._id}>
                <td className="p-4">{index + 1}</td>

                <td className="p-4 font-medium">{item.image && <img src={setImageURL(item.image)} alt={item.title} className="h-12 w-12 rounded-lg border object-cover" />}</td>
                <td className="p-4 font-medium">{item.title}</td>

                <td className="p-4">{item.slug}</td>

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
                    <button className="inline-flex rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => categoryDelete(item._id)}
                    className="inline-flex rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
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
