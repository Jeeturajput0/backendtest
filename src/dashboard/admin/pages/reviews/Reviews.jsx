import { Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URI } from "../../../../config";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const getReviews = async () => {
    try {
      const res = await fetch(`${API_URI}/admin/review`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setReviews(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };
  const remove = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    await fetch(`${API_URI}/admin/review/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    getReviews();
  };
  useEffect(() => {
    getReviews();
  }, []);
  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Customer voice</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
            Reviews
          </h1>
          <p className="mt-2 text-slate-500">
            Moderate feedback and build customer trust.
          </p>
        </div>
        <Link to="/admin/reviews/add" className="ui-button">
          <Plus size={18} />
          Add Review
        </Link>
      </div>
      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((item) => (
              <tr key={item._id}>
                <td className="font-semibold text-slate-800">
                  {item.customer}
                </td>
                <td>{item.product}</td>
                <td>
                  <div className="flex text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                </td>
                <td className="max-w-xs truncate">{item.review}</td>
                <td>
                  <span
                    className={
                      item.status === "Approved"
                        ? "status-active"
                        : item.status === "Rejected"
                          ? "status-inactive"
                          : "inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700"
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td className="text-right">
                  <button
                    onClick={() => remove(item._id)}
                    className="inline-flex rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!reviews.length && (
          <div className="p-12 text-center text-sm text-slate-500">
            No reviews found yet.
          </div>
        )}
      </div>
    </div>
  );
};
export default Reviews;
