import { useState } from "react";
import { Save } from "lucide-react";
import { API_URI, AUTH_TOKEN } from "../../../config";

const AddColor = () => {
  const [form, setForm] = useState({
    name: "",
    code: "#000000",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URI}/admin/color`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      
        setForm({
          name: "",
          code: "#000000",
          isActive: true,
        });
  
      
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8">
      <h1 className="text-3xl font-bold mb-6">Add Color</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Color Name */}
        <div>
          <label className="block mb-2 font-medium">
            Color Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Red"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Color Picker */}
        <div>
          <label className="block mb-2 font-medium">
            Color Code
          </label>

          <div className="flex items-center gap-4">
            <input
              type="color"
              name="code"
              value={form.code}
              onChange={handleChange}
              className="w-20 h-12 cursor-pointer border rounded-lg"
            />

            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              className="flex-1 border rounded-lg px-4 py-3"
            />

            <div
              className="w-12 h-12 rounded-lg border"
              style={{ backgroundColor: form.code }}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

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
          Save Color
        </button>

      </form>
    </div>
  );
};

export default AddColor;