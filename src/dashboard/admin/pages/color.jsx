import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../config";

const defaultColors = [
  {
    _id: "1",
    title: "Red",
    code: "#EF4444",
    isActive: true,
  },
  {
    _id: "2",
    title: "Blue",
    code: "#3B82F6",
    isActive: true,
  },
];

const Color = () => {
  const navigate = useNavigate();

  const [colors, setColors] = useState(defaultColors);

  const getColors = async () => {
    try {
      const res = await fetch(`${API_URI}/admin/color`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setColors(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteColor = async (id) => {
    if (!window.confirm("Delete this color?")) return;

    try {
      const res = await fetch(`${API_URI}/admin/color/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const data = await res.json();

        getColors();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getColors();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Colors</h1>
          <p className="text-gray-500">
            Manage Product Colors
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/colors/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Color
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Color</th>
              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Preview</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {colors.map((item, index) => (
              <tr key={item._id} className="border-t">
                <td className="p-4">{index + 1}</td>

                <td className="p-4 font-medium">
                  {item.title}
                </td>

                <td className="p-4">
                  {item.code}
                </td>

                <td className="p-4">
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: item.code }}
                  ></div>
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
                  <Link to={`/admin/colors/edit/${item._id}`}>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteColor(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {colors.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No Colors Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Color;