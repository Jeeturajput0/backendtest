import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../config";

const AddCoupon = () => {
  const navigate = useNavigate();
  const { coupon_id } = useParams();

  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    // expiry: "",
    // StartDate: "",
    isActive: true,
    usageLimit: "",
  });

  // Get Coupon Detail For Edit
  const getCouponDetail = async () => {
    try {
      const res = await fetch(`${API_URI}/admin/coupon/${coupon_id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const resData = await res.json();

        const data = resData.data;

        setFormData({
          code: data.code,
          discount: data.discount,
          // expiry: data.expiry?.slice(0,10),
          // StartDate: data.StartDate?.slice(0,10),
          isActive: data.isActive,
          usageLimit: data.usageLimit,
        });
    } catch (error) {
      console.log(error);
    }
  };
 useEffect(() => {
    setTimeout(() => {
    coupon_id ? getProductDetail() : '';
    }, 200);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const api = coupon_id
        ? `${API_URI}/admin/coupon/${coupon_id}`
        : `${API_URI}/admin/coupon`;

      const method = coupon_id ? "PUT" : "POST";

      const res = await fetch(api, {
        method,
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      navigate("/admin/coupons");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        {coupon_id ? "Update Coupon" : "Add New Coupon"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">Coupon Code</label>

          <input
            type="text"
            placeholder="SAVE20"
            value={formData.code}
            onChange={(e) =>
              setFormData({
                ...formData,
                ["code"]: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Discount</label>

          <input
            type="number"
            placeholder="20"
            value={formData.discount}
            onChange={(e) =>
              setFormData({
                ...formData,
                ["discount"]: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Usage Limit</label>

          <input
            type="number"
            placeholder="100"
            value={formData.usageLimit}
            onChange={(e) =>
              setFormData({
                ...formData,
                ["usageLimit"]: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* <div>
          <label className="block mb-2 font-medium">Start Date</label>

          <input
            type="date"
            value={formData.StartDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                StartDate: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />
        </div> */}

        {/* <div>
          <label className="block mb-2 font-medium">Expiry Date</label>

          <input
            type="date"
            value={formData.expiry}
            onChange={(e) =>
              setFormData({
                ...formData,
                expiry: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />
        </div> */}

        <div>
          <label className="block mb-2 font-medium">Status</label>

          <select
            value={formData.isActive}
            onChange={(e) =>
              setFormData({
                ...formData,
                ["isActive"]: e.target.value === "true",
              })
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="true">Active</option>

            <option value="false">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          <Save size={18} />

          {coupon_id ? "Update Coupon" : "Save Coupon"}
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;
