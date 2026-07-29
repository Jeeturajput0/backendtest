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
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Banners</h1>
        <Link
          to="/admin/banners/add"
          className="flex gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          <Plus size={18} />
          Add Banner
        </Link>
      </div>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
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
              <tr className="border-t" key={item._id}>
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
      className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
    >
      <Pencil size={16} />
      Edit
    </Link>

    <button
      onClick={() => remove(item._id)}
      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
