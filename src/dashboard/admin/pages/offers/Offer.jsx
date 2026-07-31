import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { API_URI, AUTH_TOKEN } from "../../../../config";

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
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Marketing</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight">Offers</h1><p className="mt-2 text-slate-500">Create timely incentives for your customers.</p></div>

        <Link
          to="/admin/offers/add"
          className="ui-button"
        >
          <Plus size={18} />
          Add Offer
        </Link>
      </div>

      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {offers.map((item) => (
              <tr key={item._id}>
                <td className="p-3">{item.name}</td>

                <td className="p-3">{item.discount}%</td>

                <td className="p-3">
                  {item.status ? "Active" : "Inactive"}
                </td>

                <td className="p-3">
                  <Link
                    to={`/admin/offers/edit/${item._id}`}
                    className="mr-2 inline-flex rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteOffer(item._id)}
                    className="inline-flex rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
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
