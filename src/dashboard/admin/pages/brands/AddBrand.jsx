import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  clearBrandError,
  clearSelectedBrand,
  fetchBrandById,
  saveBrand,
} from "../../../../store/slices/brand.slice";
import { API_URI, AUTH_TOKEN } from "../../../../config";

const AddBrand = () => {
  const { brand_id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();


  const { saving, loading, selectedBrand, error } = useSelector(
    (state) => state.brand,
  );


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
    category: "",
  });

  const [categories, setCategories] = useState([]);


  useEffect(() => {
    dispatch(clearBrandError());

    dispatch(clearSelectedBrand());

    if (brand_id) {
      dispatch(fetchBrandById(brand_id));
    }
  }, [brand_id, dispatch]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(`${API_URI}/admin/category`, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        const data = await response.json();
        if (response.ok && data.success) setCategories(data.data || []);
      } catch (fetchError) {
        console.error("Category fetch error:", fetchError);
      }
    };
    getCategories();
  }, []);


  useEffect(() => {
    if (selectedBrand) {
      setFormData({
        name: selectedBrand.name || "",

        description: selectedBrand.description || "",

        isActive: selectedBrand.isActive ?? true,
        category: selectedBrand.category?._id || selectedBrand.category || "",
      });
    }
  }, [selectedBrand]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: name === "isActive" ? value === "true" : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = {
      name: formData.name.trim(),

      description: formData.description.trim(),

      isActive: formData.isActive,
      category: formData.category,
    };

    try {
      await dispatch(
        saveBrand({
          id: brand_id,
          values,
        }),
      ).unwrap();

      alert(
        brand_id ? "Brand updated successfully" : "Brand added successfully",
      );

      navigate("/admin/brand");
    } catch (error) {
      console.error("Save brand error:", error);
    }
  };


  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">
      {/* HEADER */}

      <div className="mb-6">
        <p className="eyebrow">Catalog</p>

        <h1 className="mt-1 text-2xl font-bold">
          {brand_id ? "Edit Brand" : "Add New Brand"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {brand_id
            ? "Update brand information."
            : "Create a new brand for your catalog."}
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* LOADING EDIT */}

      {loading && brand_id ? (
        <div className="py-10 text-center text-gray-500">Loading brand...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* BRAND NAME */}

          <div>
            <label className="mb-2 block font-medium">Brand Name</label>

            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter brand name"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="mb-2 block font-medium">Description</label>

            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brand description"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* CATEGORY */}

          <div>
            <label className="mb-2 block font-medium">Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
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
          </div>

          {/* BUTTONS */}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/brand")}
              className="rounded-lg border px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : brand_id ? "Update Brand" : "Save Brand"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddBrand;
