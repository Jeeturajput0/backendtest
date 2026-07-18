import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { API_URI, AUTH_TOKEN } from "../../../../config";
import { useNavigate, useParams } from "react-router-dom";

const AddSize = () => {
  const navigate = useNavigate();
  const { sizes_id } = useParams();

  const [form, setForm] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      name: e.target.value,
    });
  };

  // Get Single Size
  const getSizeDetails = async () => {
    try {
      const res = await fetch(
        `${API_URI}/admin/size/${sizes_id}`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setForm({
          name: data.data.name,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sizes_id) {
      getSizeDetails();
    }
  }, [sizes_id]);

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

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

      alert(data.message);

      if (res.ok) {
        navigate("/admin/sizes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
      <h1 className="text-3xl font-bold mb-6">
        {sizes_id ? "Edit Size" : "Add Size"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            Size Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="S, M, L, XL, XXL"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Save size={18} />
          {sizes_id ? "Update Size" : "Save Size"}
        </button>

      </form>
    </div>
  );
};

export default AddSize;