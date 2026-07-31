import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { API_URI, setImageURL } from "../../../../config";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const getBanners = () =>
    fetch(`${API_URI}/admin/banner`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setBanners(data.data || []))
      .catch(console.error);
  useEffect(() => {
    getBanners();
  }, []);
  const remove = async (id) => {
    await fetch(`${API_URI}/admin/banner/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    getBanners();
  };
  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Storefront</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight">Banners</h1><p className="mt-2 text-slate-500">Shape the first impression of your storefront.</p></div>
        <Link
          to="/admin/banners/add"
          className="ui-button"
        >
          <Plus size={18} />
          Add Banner
        </Link>
      </div>
      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr>
              <th className="p-3">Image</th>
              <th>Title</th>
              {/* <th>Link</th> */}
              <th>Order</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((item) => (
              <tr key={item._id}>
                <td className="p-3">
                  <img
                    className="w-24 h-12 object-cover rounded"
                    src={setImageURL(item.image)}
                    alt={item.title}
                  />
                </td>
                <td>{item.title}</td>
                {/* <td>{item.link || "-"}</td> */}
                <td>{item.sortOrder}</td>
                <td>{item.isActive ? "Active" : "Inactive"}</td>
              <td>
  <div className="flex items-center gap-2">
    <Link
      to={`/admin/banners/edit/${item._id}`}
      className="inline-flex rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
    >
      <Pencil size={16} />
      Edit
    </Link>

    <button
      onClick={() => remove(item._id)}
      className="inline-flex rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
    >
      <Trash2 size={16} />
      Delete
    </button>
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!banners.length && (
          <div className="text-center p-8 text-gray-500">No Banners Found</div>
        )}
      </div>
    </div>
  );
};
export default Banners;
