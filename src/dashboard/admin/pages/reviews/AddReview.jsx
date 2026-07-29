import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URI } from "../../../../config";

const AddReview = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ customer: "", product: "", rating: 5, review: "", status: "Approved" });
  const submit = async (e) => { e.preventDefault(); const res = await fetch(`${API_URI}/admin/review`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` }, body: JSON.stringify(form) }); if (res.ok) navigate("/admin/reviews"); else alert("Review could not be saved"); };
  return <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6"><h1 className="text-2xl font-bold mb-6">Add Review</h1><form onSubmit={submit} className="space-y-4">{[["customer", "Customer Name"], ["product", "Product Name"]].map(([key, label]) => <div key={key}><label className="block mb-1">{label}</label><input required value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full border rounded p-3"/></div>)}<div><label>Rating</label><select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="w-full border rounded p-3">{[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}</select></div><div><label>Review</label><textarea required value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} className="w-full border rounded p-3"/></div><div><label>Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border rounded p-3">{["Approved", "Pending", "Rejected"].map((s) => <option key={s}>{s}</option>)}</select></div><button className="bg-blue-600 text-white px-5 py-3 rounded">Save Review</button></form></div>;
};
export default AddReview;
