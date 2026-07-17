import { Link, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../config";

const defaultbrand = [
  {
    id: 1,
    name: "Nike",
    logo: "https://cdn.simpleicons.org/nike/000000",
  },
  {
    id: 2,
    name: "Adidas",
    logo: "https://cdn.simpleicons.org/adidas/000000",
  },
  {
    id: 3,
    name: "Puma",
    logo: "https://cdn.simpleicons.org/puma/000000",
  },
  {
    id: 4,
    name: "Apple",
    logo: "https://cdn.simpleicons.org/apple/000000",
  },
];

const Brand = () => {
  const navigate = useNavigate();
  const [brands, setBransds] = useState([defaultbrand]);

  const getbrand = async () => {
    try {
      const res = await fetch(`${API_URI}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      const resData = await res.json();
      setBransds(resData.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deletebrand = async (req, res) => {
    try {
      const res = await fetch(`${API_URI}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      getbrand();
      alert("brand deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getbrand();
  });
  return (
    // <section className="py-16 bg-gray-50">
    //   <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800"> Trusted Brands</h1>
          <p className="text-gray-500">Explore products from the world's most trusted brands.</p>
        </div>

        <button
          onClick={() => navigate("/admin/products/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>
        {/* <div className="text-center mb-12">
      

          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Shop By Brand
          </h2>

          <p className="text-gray-500 mt-3">
            Explore products from the world's most trusted brands.
          </p>
          <button
            onClick={() => navigate("/admin/brand/add")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div> */}

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Brand</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {brands.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{item.name}</td>
                  {/* <td className="p-4">{item.isActive}</td> */}

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive ? "Active" : "In-Active"}
                    </span>
                  </td>

                  <td className="p-4 text-center space-x-2">
                    <Link
                      to={`/admin/products/edit/${item._id}`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deletebrand(item._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
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

export default Brand;
