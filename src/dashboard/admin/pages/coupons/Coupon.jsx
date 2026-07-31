import { Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../../config";
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
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Marketing</p><h2 className="mt-1 text-3xl font-extrabold tracking-tight">Coupons</h2><p className="mt-2 text-slate-500">Manage promotional codes and redemptions.</p></div>

        <Link
          to="/admin/coupons/add"
          className="ui-button"
        >
          <Plus size={18} />
          Add Coupon
        </Link>
      </div>

      <div className="ui-table-wrap"><table className="ui-table">
        <thead>
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
            <tr key={item._id}>
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
                  className="inline-flex rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteCoupon(item._id)}
                  className="inline-flex rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
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
      </table></div>
    </div>
  );
};

export default Coupon;
