import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../../config";

const AddSize = () => {
  const navigate = useNavigate();
  const { sizes_id } = useParams();
  const [form, setForm] = useState({ name: "", categories: [] });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const categoryResponse = await fetch(`${API_URI}/admin/category`, { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } });
        const categoryData = await categoryResponse.json();
        if (!categoryResponse.ok || !categoryData.success) throw new Error(categoryData.message || "Categories could not be loaded");
        setCategories(categoryData.data || []);

        if (!sizes_id) return;
        const sizeResponse = await fetch(`${API_URI}/admin/size/${sizes_id}`, { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } });
        const sizeData = await sizeResponse.json();
        if (!sizeResponse.ok || !sizeData.success) throw new Error(sizeData.message || "Size could not be loaded");
        setForm({
          name: sizeData.data.name || "",
          categories: (sizeData.data.categories || []).map((category) => category._id || category),
        });
      } catch (loadError) {
        setError(loadError.message || "Could not connect to the server.");
      }
    };
    loadFormData();
  }, [sizes_id]);

  const toggleCategory = (categoryId) => {
    setForm((current) => ({
      ...current,
      categories: current.categories.includes(categoryId)
        ? current.categories.filter((id) => id !== categoryId)
        : [...current.categories, categoryId],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.categories.length) {
      setError("Select at least one category.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch(
        sizes_id ? `${API_URI}/admin/size/${sizes_id}` : `${API_URI}/admin/size`,
        {
          method: sizes_id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${AUTH_TOKEN}` },
          body: JSON.stringify({ name: form.name.trim(), categories: form.categories }),
        },
      );
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Size could not be saved");
      navigate("/admin/sizes");
    } catch (saveError) {
      setError(saveError.message || "Could not connect to the server.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow">
      <h1 className="mb-2 text-3xl font-bold">{sizes_id ? "Edit Size" : "Add Size"}</h1>
      <p className="mb-6 text-sm text-gray-500">One size can be used in multiple categories.</p>
      {error && <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block font-medium">Size Name</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. M or 8" className="w-full rounded-lg border px-4 py-3" />
        </div>
        <fieldset>
          <legend className="mb-2 block font-medium">Categories</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {categories.map((category) => (
              <label key={category._id} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-slate-50">
                <input type="checkbox" checked={form.categories.includes(category._id)} onChange={() => toggleCategory(category._id)} />
                <span>{category.title}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate("/admin/sizes")} className="rounded-lg border px-6 py-3 font-semibold">Cancel</button>
          <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-60"><Save size={18} />{saving ? "Saving..." : sizes_id ? "Update Size" : "Save Size"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddSize;
