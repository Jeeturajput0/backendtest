import { Package, X } from "lucide-react";
import { setImageURL } from "../../config";

const labelFor = (value, fallback = "—") => {
  if (!value) return fallback;
  return typeof value === "object" ? value.name || value.title || fallback : value;
};

const ProductDetailsModal = ({ product, onClose, showVendor = false }) => {
  if (!product) return null;
  const details = [["Category", labelFor(product.category)], ["Brand", labelFor(product.brand)], ["Size", labelFor(product.size)], ["Color", product.color || "—"], ["Stock", product.quantity ?? "—"], ["Status", product.isActive ? "Active" : "Inactive"]];
  if (showVendor) details.push(["Vendor", labelFor(product.vendor, "Admin")]);

  return <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${product.name} details`} onMouseDown={onClose}>
    <div className="mx-auto my-4 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl sm:my-10" onMouseDown={(event) => event.stopPropagation()}>
      <div className="flex items-start justify-between bg-slate-900 px-5 py-5 text-white sm:px-7"><div className="flex min-w-0 items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-blue-200"><Package size={21} /></span><div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[.16em] text-blue-200">Product details</p><h2 className="truncate text-xl font-extrabold sm:text-2xl">{product.name}</h2></div></div><button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white" aria-label="Close product details"><X size={21} /></button></div>
      <div className="grid gap-6 p-5 sm:grid-cols-[180px_1fr] sm:p-7"><img src={setImageURL(product.image)} alt={product.name} className="h-44 w-full rounded-2xl border border-slate-100 object-cover sm:h-48" /><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{details.map(([label, value]) => <div key={label} className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 break-words font-bold capitalize text-slate-800">{value}</p></div>)}<div className="rounded-xl bg-blue-50 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-blue-500">Sale price</p><p className="mt-1 font-extrabold text-slate-900">₹{product.saleprice ?? "—"}</p></div><div className="rounded-xl bg-orange-50 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-orange-500">MRP</p><p className="mt-1 font-extrabold text-slate-900">₹{product.mrp ?? "—"}</p></div></div></div>
      <div className="border-t border-slate-100 px-5 py-5 sm:px-7"><h3 className="font-extrabold text-slate-900">Description</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{product.details || "No description added."}</p></div>
      <div className="border-t border-slate-100 px-5 py-5 sm:px-7"><div className="flex items-center justify-between gap-3"><h3 className="font-extrabold text-slate-900">Variants</h3><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{product.variations?.length || 0} variants</span></div>{product.variations?.length ? <div className="mt-3 overflow-x-auto rounded-xl border border-slate-100"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Image</th><th>Color</th><th>Size</th><th>Price</th><th>Stock</th><th className="px-4">SKU</th></tr></thead><tbody className="divide-y divide-slate-100">{product.variations.map((variation, index) => <tr key={`${variation.sku || "variant"}-${index}`} className="text-slate-700"><td className="px-4 py-2"><img src={setImageURL(variation.image || product.image)} alt={`${variation.color || ""} variant`} className="h-11 w-11 rounded-lg border border-slate-100 object-cover" /></td><td className="font-medium">{variation.color || "—"}</td><td>{variation.size || "—"}</td><td>₹{variation.price ?? "—"}</td><td>{variation.stock ?? "—"}</td><td className="px-4">{variation.sku || "—"}</td></tr>)}</tbody></table></div> : <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No variants added for this product.</p>}</div>
    </div>
  </div>;
};

export default ProductDetailsModal;
