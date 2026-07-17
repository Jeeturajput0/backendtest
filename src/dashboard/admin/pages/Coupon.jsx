import { Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../config";
import { useEffect, useState } from "react";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);

  const getCoupons = async () => {
    try {
      const res = await fetch(`${API_URI}/admin/coupon`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const resData = await res.json();
      setCoupons(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCoupon = async (coupon_id) => {
    try {
      const res = await fetch(`${API_URI}\/admin/coupon/${coupon_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const data = await res.json();
      console.log('====================================');
      console.log(data);
      console.log('====================================');

      getCoupons();
      alert("Coupon deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoupons();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Coupons</h2>

        <Link
          to="/admin/coupons/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Coupon
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Code</th>

            <th className="p-3">Discount</th>

            <th className="p-3">Expiry</th>

            <th className="p-3">Status</th>

            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {coupons.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-3">{item.code}</td>

              <td className="p-3 text-center">{item.discount}</td>

              <td className="p-3 text-center">{item.expiry?.slice(0, 10)}</td>

              <td className="p-3 text-center">
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

              <td className="p-3 text-center flex justify-center gap-4">
                <Link
                  to={`/admin/coupons/edit/${item._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteCoupon(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {coupons.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-5">
                No Coupons Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Coupon;
