import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../config";

const Brand = () => {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);

  const getBrand = async () => {
    try {
      const res = await fetch(`${API_URI}/brand`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setBrands(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBrand = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this brand?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URI}/brand/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        alert("Brand deleted successfully");
        getBrand();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Trusted Brands</h1>

          <p className="text-gray-500">
            Explore products from the world's most trusted brands.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/brand/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Brand
        </button>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full border border-gray-300 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-3 text-left">
                Brand Name
              </th>

              <th className="border border-gray-300 p-3 text-left">Status</th>

              <th className="border border-gray-300 p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {brands.length > 0 ? (
              brands.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium">
                    {item.name}
                  </td>

                  <td className="border border-gray-300 p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="border border-gray-300 p-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/brand/edit/${item._id}`}
                        className="px-4 py-0 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteBrand(item._id)}
                        className="px-4 py-0 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="border border-gray-300 p-6 text-center text-gray-500"
                >
                  No Brands Found
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
