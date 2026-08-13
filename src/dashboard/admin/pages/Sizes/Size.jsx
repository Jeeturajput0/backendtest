import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { API_URI, AUTH_TOKEN } from "../../../../config";

import { useDispatch, useSelector } from "react-redux";

import { fetchsize } from "../../../../store/slices/size.slice";

const Sizes = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // ==========================================
  // REDUX STATE
  // ==========================================

  const { size, loading, error } = useSelector((state) => state.size);

  // ==========================================
  // FETCH SIZES
  // ==========================================

  useEffect(() => {
    dispatch(
      fetchsize({
        page: 1,
        limit: 10,
      }),
    );
  }, [dispatch]);

  // ==========================================
  // DELETE SIZE
  // ==========================================

  const deleteSize = async (size_id) => {
    if (!window.confirm("Delete this size?")) {
      return;
    }

    try {
      const res = await fetch(`${API_URI}/admin/size/${size_id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const data = await res.json();

      alert(data.message || "Size deleted");

      if (res.ok && data.success) {
        // Redux se fresh data fetch
        dispatch(
          fetchsize({
            page: 1,
            limit: 10,
          }),
        );
      }
    } catch (error) {
      console.error("Delete size error:", error);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Catalog</p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">Sizes</h1>

          <p className="text-gray-500">Manage Product Sizes</p>
        </div>

        <button
          onClick={() => navigate("/admin/sizes/add")}
          className="ui-button"
        >
          <Plus size={18} />
          Add Size
        </button>
      </div>

      {/* ERROR */}

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-600">{error}</div>
      )}

      {/* TABLE */}

      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr>
              <th className="p-4 text-left">#</th>

              <th className="p-4 text-left">Size</th>

              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* LOADING */}

            {loading ? (
              <tr>
                <td colSpan={3} className="p-10 text-center text-gray-500">
                  Loading Sizes...
                </td>
              </tr>
            ) : size.length > 0 ? (
              size.map((item, index) => (
                <tr key={item._id}>
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4 font-semibold">{item.name}</td>

                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      {/* EDIT */}

                      <Link
                        to={`/admin/sizes/edit/${item._id}`}
                        className="inline-flex rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                      >
                        Edit
                      </Link>

                      {/* DELETE */}

                      <button
                        onClick={() => deleteSize(item._id)}
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
                <td colSpan={3} className="p-10 text-center text-gray-500">
                  No Sizes Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sizes;
