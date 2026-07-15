import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../config";

const AddOffer = () => {
  const navigate = useNavigate();
  const { offer_id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    discount: "",
    status: true,
  });

  const getOfferDetail = async () => {
    try {
      const res = await fetch(`${API_URI}/admin/offer/${offer_id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const resData = await res.json();

      if (resData.success) {
        const data = resData.data;

        setFormData({
          name: data.name,
          discount: data.discount,
          status: data.status,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (offer_id) {
      getOfferDetail();
    }
  }, [offer_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const api = offer_id
        ? `${API_URI}/admin/offer/${offer_id}`
        : `${API_URI}/admin/offer`;

      const method = offer_id ? "PUT" : "POST";

      const res = await fetch(api, {
        method,
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      navigate("/admin/offers");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          {offer_id ? "Update Offer" : "Add New Offer"}
        </h2>

        <p className="text-gray-500 mt-1">
          Fill in the details to create a new offer.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Offer Name
          </label>

          <input
            type="text"
            placeholder="Enter Offer Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Discount (%)
          </label>

          <input
            type="number"
            placeholder="Enter Discount"
            value={formData.discount}
            onChange={(e) =>
              setFormData({
                ...formData,
                discount: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Status</label>

          <select
            value={formData.status.toString()}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value === "true",
              })
            }
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/offers")}
            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            <Save size={18} />
            {offer_id ? "Update Offer" : "Save Offer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOffer;
