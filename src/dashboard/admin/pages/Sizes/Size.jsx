import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../../config";

const Sizes = () => {
  const navigate = useNavigate();
  const [sizes, setSizes] = useState([]);

  const getSizes = async () => {
    try {
      const res = await fetch(`${API_URI}/admin/size`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setSizes(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSize = async (sizes_id) => {
    if (!window.confirm("Delete this size?")) return;

    try {
      const res = await fetch(`${API_URI}/admin/size/${sizes_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const data = await res.json();

      alert(data.message);

      
        getSizes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSizes();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-7">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Catalog</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight">Sizes</h1>
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
            {sizes.map((item, index) => (
              <tr key={item._id}>

                <td className="p-4">
                  {index + 1}
                </td>

                <td className="p-4 font-semibold">
                  {item.name}
                </td>

                <td className="p-4 text-center space-x-2">

                  <Link to={`/admin/sizes/edit/${item._id}`}>
                    <button className="inline-flex rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteSize(item._id)}
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

export default Sizes;
