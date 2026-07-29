import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Star } from "lucide-react";
import { API_URI } from "../../../../config";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const getReviews = () => fetch(`${API_URI}/admin/review`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then((res) => res.json()).then((data) => setReviews(data.data || [])).catch(console.error);
  useEffect(() => { getReviews(); }, []);
  const remove = async (id) => { await fetch(`${API_URI}/admin/review/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }); getReviews(); };
  return <div className="p-6 bg-slate-100 min-h-screen"><div className="flex justify-between items-center mb-6"><div><h1 className="text-3xl font-bold">Reviews</h1><p className="text-gray-500">Manage customer product reviews</p></div><Link to="/admin/reviews/add" className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl"><Plus size={18}/>Add Review</Link></div><div className="bg-white rounded-xl shadow overflow-x-auto"><table className="w-full"><thead className="bg-slate-200"><tr><th className="p-3 text-left">Customer</th><th>Product</th><th>Rating</th><th>Review</th><th>Status</th><th>Action</th></tr></thead><tbody>{reviews.map((item) => <tr key={item._id} className="border-b"><td className="p-3 font-medium">{item.customer}</td><td>{item.product}</td><td><div className="flex justify-center">{Array.from({ length: item.rating }).map((_, i) => <Star key={i} size={16} className="text-yellow-500 fill-yellow-500"/>)}</div></td><td>{item.review}</td><td><span className={`px-3 py-1 rounded-full text-white text-sm ${item.status === "Approved" ? "bg-green-500" : item.status === "Pending" ? "bg-yellow-500" : "bg-red-500"}`}>{item.status}</span></td><td><button onClick={() => remove(item._id)} className="text-red-600">Delete</button></td></tr>)}</tbody></table>{!reviews.length && <div className="text-center py-10 text-gray-500">No Reviews Found</div>}</div></div>;
};
export default Reviews;
