import { Plus } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { deleteBrand, fetchBrands } from "../../../../store/slices/brand.slice";

const Brand = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { brands, loading, error } = useSelector((state) => state.brand);

  // =================================================
  // FETCH BRANDS
  // =================================================

  useEffect(() => {
    dispatch(
      fetchBrands({
        page: 1,
        limit: 10,
      }),
    );
  }, [dispatch]);

  // =================================================
  // DELETE
  // =================================================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this brand?")) {
      return;
    }

    try {
      await dispatch(deleteBrand(id)).unwrap();
    } catch (error) {
      console.error("Delete brand error:", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Catalog</p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950">
            Trusted Brands
          </h1>

          <p className="text-gray-500">
            Manage the brands available in your catalog.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/brand/add")}
          className="ui-button"
        >
          <Plus size={18} />
          Add Brand
        </button>
      </div>

      {/* ERROR */}

      {error && (
        <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {/* TABLE */}

      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr>
              <th>Brand Name</th>

              <th>Description</th>

              <th>Status</th>

              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  Loading brands...
                </td>
              </tr>
            ) : brands.length > 0 ? (
              brands.map((item) => (
                <tr key={item._id}>
                  <td className="font-medium">{item.name}</td>

                  <td className="max-w-sm truncate text-gray-500">
                    {item.description || "—"}
                  </td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">
                      {/* EDIT */}

                      <Link
                        to={`/admin/brand/edit/${item._id}`}
                        className="inline-flex rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                      >
                        Edit
                      </Link>

                      {/* DELETE */}

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
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No brands found. Add your first brand.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Brand;
