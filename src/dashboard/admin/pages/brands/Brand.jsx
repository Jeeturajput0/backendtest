import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../../config";

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
    <div className="mx-auto max-w-7xl space-y-7">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Catalog</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950">Trusted Brands</h1>

          <p className="text-gray-500">
            Explore products from the world's most trusted brands.
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

      {/* Table */}

      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr>
              <th>
                Brand Name
              </th>

              <th>Status</th>

              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {brands.length > 0 ? (
              brands.map((item) => (
                <tr key={item._id}>
                  <td className="font-medium">
                    {item.name}
                  </td>

                  <td>
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

                  <td>
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/brand/edit/${item._id}`}
                        className="inline-flex rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteBrand(item._id)}
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
