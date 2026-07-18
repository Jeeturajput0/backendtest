import { useState } from "react";
import { Save } from "lucide-react";
import { API_URI, AUTH_TOKEN, uploadImage } from "../../../config";
import axios from "axios";

const AddCategory = () => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "isActive") {
      setForm({
        ...form,
        isActive: value === "true",
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imgname = await uploadImage(file);
    setForm((prev) => ({
      ...prev,
      image: imgname,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URI}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Category Added Successfully");

        setForm({
          title: "",
          slug: "",
          isActive: true,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8">
      <h1 className="text-3xl font-bold mb-6">Add Category</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category Title */}
        <div>
          <label className="block mb-2 font-medium">Category Title</label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter Category Title"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block mb-2 font-medium">Slug</label>

          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="electronics"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Image</label>

          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            placeholder="choose category image"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-medium">Status</label>

          <select
            name="isActive"
            value={form.isActive.toString()}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          <Save size={18} />
          Save Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
