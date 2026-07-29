import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URI, uploadImage } from "../../../../config";

const AddBanner = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", image: "", link: "", sortOrder: 0, isActive: true });
  const upload = async (e) => { const path = await uploadImage(e.target.files[0]); if (path) setForm({ ...form, image: path }); };
  const submit = async (e) => { e.preventDefault(); const res = await fetch(`${API_URI}/admin/banner`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` }, body: JSON.stringify(form) }); if (res.ok) navigate("/admin/banners"); else alert("Banner could not be saved"); };
  return <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6"><h1 className="text-2xl font-bold mb-6">Add Banner</h1><form onSubmit={submit} className="space-y-4"><input required placeholder="Banner title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border rounded p-3"/><input required type="file" accept="image/*" onChange={upload} className="w-full border rounded p-3"/><input placeholder="Link (optional)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="w-full border rounded p-3"/><input type="number" placeholder="Sort order" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} className="w-full border rounded p-3"/><select value={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })} className="w-full border rounded p-3"><option value="true">Active</option><option value="false">Inactive</option></select><button className="bg-blue-600 text-white px-5 py-3 rounded">Save Banner</button></form></div>;
};
export default AddBanner;
