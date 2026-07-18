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
    <div className="max-w-5xl mx-auto">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Sizes</h1>
          <p className="text-gray-500">Manage Product Sizes</p>
        </div>

        <button
          onClick={() => navigate("/admin/sizes/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center"
        >
          <Plus size={18} />
          Add Size
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Size</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {sizes.map((item, index) => (
              <tr key={item._id} className="border-t">

                <td className="p-4">
                  {index + 1}
                </td>

                <td className="p-4 font-semibold">
                  {item.name}
                </td>

                <td className="p-4 text-center space-x-2">

                  <Link to={`/admin/sizes/edit/${item._id}`}>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteSize(item._id)}
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

export default Sizes;