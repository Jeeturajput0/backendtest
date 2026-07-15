import { Save, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URI, AUTH_TOKEN } from "../../../config";

const AddCategory = () => {
  const [category, Setcategory] = useState([]);
  const getcategory = async () => {
    try {
      const res = await fetch(`${API_URI}/admin/category`, {
        headers: {
          Authorazation: `Barer ${AUTH_TOKEN}`,
        },
      });
      const resData = await res.json();
      Setcategory(resData.data);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
getcategory()
  },[])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Add New Category</h1>
        <p className="text-gray-500 mt-1">
          Create a new product category for your store.
        </p>
      </div>

      <form className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Basic Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Category Name */}
            <div>
              <label className="block mb-2 font-medium">Category Name *</label>

              <input
                type="text"
                placeholder="Enter category name"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sub Title */}
            <div>
              <label className="block mb-2 font-medium">Sub Title</label>

              <input
                type="text"
                placeholder="Enter category subtitle"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block mb-2 font-medium">Slug</label>

              <input
                type="text"
                placeholder="category-name"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

       {/* Parent Category */}
            <div>
              <label className="block mb-2 font-medium">Parent Category</label>

              <select className="w-full border rounded-lg px-4 py-3">
                {category.length > 0 && 
                category.map((item,i)=>(
                <option key={i} value={item._id}>{item.Id}</option>

                ))}
                
              </select>
            </div>
          </div>

          {/* Images */}
          <div className="grid md:grid-cols-3 gap-5 mt-6">
            <div>
              <label className="block mb-2 font-medium">Category Icon</label>

              <label className="h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
                <Upload className="text-gray-400" />

                <span className="text-sm text-gray-500">Upload Icon</span>

                <input type="file" className="hidden" />
              </label>
            </div>

            <div>
              <label className="block mb-2 font-medium">Thumbnail Image</label>

              <label className="h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
                <Upload className="text-gray-400" />

                <span className="text-sm text-gray-500">Upload Thumbnail</span>

                <input type="file" className="hidden" />
              </label>
            </div>

            <div>
              <label className="block mb-2 font-medium">Banner Image</label>

              <label className="h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
                <Upload className="text-gray-400" />

                <span className="text-sm text-gray-500">Upload Banner</span>

                <input type="file" className="hidden" />
              </label>
            </div>
          </div>

          {/* Description */}

          <div className="mt-6">
            <label className="block mb-2 font-medium">Short Description</label>

            <textarea
              rows="3"
              placeholder="Write short description..."
              className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium">Full Description</label>

            <textarea
              rows="6"
              placeholder="Write detailed description..."
              className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* SEO Section */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">SEO Information</h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Meta Title"
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              placeholder="Meta Keywords"
              className="w-full border rounded-lg px-4 py-3"
            />

            <textarea
              rows="4"
              placeholder="Meta Description"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
        </div>

        {/* Settings */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Category Settings</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 font-medium">Status</label>

              <select className="w-full border rounded-lg px-4 py-3">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Sort Order</label>

              <input
                type="number"
                placeholder="1"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div className="flex items-center gap-3 mt-8">
              <input type="checkbox" />

              <span>Featured Category</span>
            </div>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-6 py-3 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            <Save size={18} />
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
