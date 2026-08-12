import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearBrandError, clearSelectedBrand, fetchBrandById, saveBrand } from "../../../../store/slices/brand.slice";

const AddBrand = () => {
  const { brand_id: brandId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { saving, loading, selectedBrand, error: storeError } = useSelector((state) => state.brand);
  const [formData, setFormData] = useState({ name: "", description: "", isActive: true });

  useEffect(() => {
    dispatch(clearBrandError());
    dispatch(clearSelectedBrand());
    if (brandId) dispatch(fetchBrandById(brandId));
  }, [brandId, dispatch]);

  useEffect(() => {
    if (selectedBrand) setFormData({ name: selectedBrand.name || "", description: selectedBrand.description || "", isActive: selectedBrand.isActive ?? true });
  }, [selectedBrand]);

  const handleChange = ({ target: { name, value } }) => setFormData((current) => ({ ...current, [name]: name === "isActive" ? value === "true" : value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(saveBrand({ id: brandId, values: { ...formData, name: formData.name.trim(), description: formData.description.trim() } })).unwrap();
      navigate("/admin/brand");
    } catch {
      // Redux exposes the request error below the heading.
    }
  };
  const error = storeError;

  return <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">
    <div className="mb-6"><p className="eyebrow">Catalog</p><h1 className="mt-1 text-2xl font-bold">{brandId ? "Edit Brand" : "Add New Brand"}</h1><p className="mt-1 text-sm text-gray-500">{brandId ? "Update brand information." : "Create a new brand for your catalog."}</p></div>
    {error && <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
    {loading && brandId ? <div className="py-10 text-center text-gray-500">Loading brand...</div> : <form onSubmit={handleSubmit} className="space-y-5">
      <div><label className="mb-2 block font-medium">Brand Name</label><input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter brand name" className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" /></div>
      <div><label className="mb-2 block font-medium">Description</label><textarea name="description" rows="4" value={formData.description} onChange={handleChange} placeholder="Brand description" className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" /></div>
      <div><label className="mb-2 block font-medium">Status</label><select name="isActive" value={String(formData.isActive)} onChange={handleChange} className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"><option value="true">Active</option><option value="false">Inactive</option></select></div>
      <div className="flex gap-3"><button type="button" onClick={() => navigate("/admin/brand")} className="rounded-lg border px-5 py-3 font-semibold text-gray-700">Cancel</button><button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Saving..." : brandId ? "Update Brand" : "Save Brand"}</button></div>
    </form>}
  </div>;
};

export default AddBrand;
