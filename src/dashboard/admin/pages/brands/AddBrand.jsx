import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API_URI, AUTH_TOKEN } from "../../../../config";
import {
  clearBrandError,
  clearSelectedBrand,
  fetchBrandById,
  saveBrand,
} from "../../../../store/slices/brand.slice";

const AddBrand = () => {
  const { brand_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { saving, loading, selectedBrand, error } = useSelector((state) => state.brand);
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const [formData, setFormData] = useState({ name: "", description: "", isActive: true, categories: [] });

  useEffect(() => {
    dispatch(clearBrandError());
    dispatch(clearSelectedBrand());
    if (brand_id) dispatch(fetchBrandById(brand_id));
  }, [brand_id, dispatch]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(`${API_URI}/admin/category`, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || "Categories could not be loaded");
        setCategories(data.data || []);
      } catch (loadError) {
        setCategoryError(loadError.message || "Categories could not be loaded");
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (!selectedBrand) return;
    setFormData({
      name: selectedBrand.name || "",
      description: selectedBrand.description || "",
      isActive: selectedBrand.isActive ?? true,
      categories: (selectedBrand.categories || []).map((category) => category._id || category),
    });
  }, [selectedBrand]);

  const toggleCategory = (categoryId) => {
    setFormData((current) => ({
      ...current,
      categories: current.categories.includes(categoryId)
        ? current.categories.filter((id) => id !== categoryId)
        : [...current.categories, categoryId],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.categories.length) {
      setCategoryError("Select at least one category.");
      return;
    }
    try {
      await dispatch(saveBrand({
        id: brand_id,
        values: { ...formData, name: formData.name.trim(), description: formData.description.trim() },
      })).unwrap();
      navigate("/admin/brand");
    } catch (saveError) {
      console.error("Save brand error:", saveError);
    }
  };

  if (loading && brand_id) return <div className="py-10 text-center text-gray-500">Loading brand...</div>;

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">
      <h1 className="text-2xl font-bold">{brand_id ? "Edit Brand" : "Add New Brand"}</h1>
      <p className="mt-1 text-sm text-gray-500">One brand can be available in multiple categories.</p>
      {(error || categoryError) && <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error || categoryError}</div>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block font-medium">Brand Name</label>
          <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Nike" className="w-full rounded-lg border px-4 py-3" />
        </div>
        <div>
          <label className="mb-2 block font-medium">Description</label>
          <textarea rows="4" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full rounded-lg border px-4 py-3" />
        </div>
        <fieldset>
          <legend className="mb-2 block font-medium">Categories</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {categories.map((category) => (
              <label key={category._id} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-slate-50">
                <input type="checkbox" checked={formData.categories.includes(category._id)} onChange={() => toggleCategory(category._id)} />
                <span>{category.title}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate("/admin/brand")} className="rounded-lg border px-5 py-3 font-semibold">Cancel</button>
          <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60">{saving ? "Saving..." : brand_id ? "Update Brand" : "Save Brand"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddBrand;
