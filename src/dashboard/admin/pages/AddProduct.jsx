import { Save, Upload } from "lucide-react";

const AddProduct = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Add New Product</h2>
        <p className="text-gray-500 mt-1">
          Fill in the details to create a new product.
        </p>
      </div>

      <form className="space-y-6">
        {/* Product Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Category
            </label>
            <select className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Select Category</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Footwear</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>

        {/* Brand & SKU */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              placeholder="Apple, Nike..."
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Size
            </label>
            <input
              type="text"
              placeholder="Sizes"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              placeholder="$0.00"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              placeholder="Available Quantity"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Product Image */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Product Image
          </label>

          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-44 cursor-pointer hover:border-blue-500 transition">
            <Upload size={40} className="text-gray-400 mb-2" />
            <span className="text-gray-500">
              Click to Upload Image
            </span>

            <input type="file" className="hidden" />
          </label>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Product Description
          </label>

          <textarea
            rows="5"
            placeholder="Write product description..."
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Status
          </label>

          <select className="w-full md:w-60 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            <Save size={18} />
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;