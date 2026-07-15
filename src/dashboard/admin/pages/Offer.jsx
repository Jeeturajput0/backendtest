import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { API_URI, AUTH_TOKEN } from "../../../config";

const Offer = () => {
  const [offers, setOffers] = useState([]);

  const getOffers = async () => {
    try {
      const res = await fetch(`${API_URI}/admin/offer`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setOffers(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOffer = async (offer_id) => {
  
    try {
      const res = await fetch(`${API_URI}/admin/offer/${offer_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        alert("Offer deleted successfully");
        getOffers();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Offers</h1>

        <Link
          to="/admin/offers/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Offer
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {offers.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">{item.name}</td>

                <td className="p-3">{item.discount}%</td>

                <td className="p-3">
                  {item.status ? "Active" : "Inactive"}
                </td>

                <td className="p-3">
                  <Link
                    to={`/admin/offers/edit/${item._id}`}
                    className="text-blue-600 mr-4"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteOffer(item._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {offers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-5">
                  No Offers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Offer;