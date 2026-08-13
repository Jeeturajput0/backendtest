import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { setImageURL } from "../../../../config";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchCategories,
  deleteCategory,
} from "../../../../store/slices/category.slice";

import { useEffect } from "react";

const Category = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // ==========================================
  // REDUX STATE
  // ==========================================

  const { categories, loading, error } = useSelector((state) => state.category);

  // ==========================================
  // FETCH CATEGORIES
  // ==========================================

  useEffect(() => {
    dispatch(
      fetchCategories({
        page: 1,
        limit: 10,
        isFeatured: true,
      }),
    );
  }, [dispatch]);

  // ==========================================
  // DELETE CATEGORY
  // ==========================================

  const handleDelete = (category_id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    dispatch(deleteCategory(category_id));
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Catalog</p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950">
            Categories
          </h1>

          <p className="text-gray-500">Manage your product categories.</p>
        </div>

        <button
          onClick={() => navigate("/admin/categories/add")}
          className="ui-button"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-600">{error}</div>
      )}

      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr>
              <th>#</th>

              <th>Image</th>

              <th>Category</th>

              <th>Slug</th>

              <th>Status</th>

              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-10 text-center text-gray-500">
                  Loading Categories...
                </td>
              </tr>
            ) : categories.length > 0 ? (
              categories.map((item, index) => (
                <tr key={item._id}>
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4">
                    {item.image ? (
                      <img
                        src={setImageURL(item.image)}
                        alt={item.title || "Category"}
                        className="h-12 w-12 rounded-lg border object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-gray-100" />
                    )}
                  </td>

                  <td className="p-4 font-medium">
                    {item.title || item.name || "-"}
                  </td>

                  <td className="p-4">{item.slug || "-"}</td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/categories/edit/${item._id}`}
                        className="inline-flex rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="inline-flex rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-10 text-center text-gray-500">
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
