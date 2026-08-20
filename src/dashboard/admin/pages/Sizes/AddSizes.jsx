import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { API_URI, AUTH_TOKEN } from "../../../../config";
import { useNavigate, useParams } from "react-router-dom";

const AddSize = () => {
  const navigate = useNavigate();
  const { sizes_id } = useParams();

  const [form, setForm] = useState({
    name: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(`${API_URI}/admin/category`, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        const data = await res.json();
        if (res.ok && data.success) setCategories(data.data || []);
      } catch {
        setError("Categories could not be loaded.");
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (!sizes_id) return;

    const getSizeDetails = async () => {
      try {
        const res = await fetch(`${API_URI}/admin/size/${sizes_id}`, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setForm({
            name: data.data.name || "",
            category: data.data.category?._id || data.data.category || "",
          });
        } else {
          setError(data.message || "Size could not be loaded.");
        }
      } catch {
        setError("Could not connect to the server.");
      }
    };

    getSizeDetails();
  }, [sizes_id]);

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const url = sizes_id
        ? `${API_URI}/admin/size/${sizes_id}`
        : `${API_URI}/admin/size`;

      const method = sizes_id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        navigate("/admin/sizes");
        return;
      }
      setError(data.message || "Size could not be saved.");
    } catch {
      setError("Could not connect to the server.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
      <h1 className="text-3xl font-bold mb-6">
        {sizes_id ? "Edit Size" : "Add Size"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
          required
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
        <input
          required
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. S, M, L or 6, 7, 8"
          className="w-full border rounded-lg px-4 py-3"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Save size={18} />
          {saving ? "Saving..." : sizes_id ? "Update Size" : "Save Size"}
        </button>
      </form>
    </div>
  );
};

export default AddSize;
