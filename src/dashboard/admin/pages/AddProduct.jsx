import { Save, Upload } from "lucide-react";
import { API_URI, AUTH_TOKEN } from "../../../config";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const { product_id } = useParams();
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    details: "",
    brand: "",
    size: null,
    color: "red",
    category: null,
    mrp: 0,
    saleprice: 0,
    isActive: true,
  });

  const getProductDetail = async () => {
    try {
      const res = await fetch(`${API_URI}/product/${product_id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      const resData = await res.json();
      console.log(resData);
      const data = resData.data;
      
      setFormData({
        name: data.name,
        details: data.details,
        brand: data.brand,
        size: data.size,
        category: data.category,
        mrp: data.mrp,
        saleprice: data.saleprice,
        isActive: data.isActive,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      product_id ? getProductDetail() : '';
    }, 200);
  }, []);

  const getCategories = async () => {
    try {
      const res = await fetch(`${API_URI}/category`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      const resData = await res.json();
      setCategories(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSize = async () => {
    try {
      const res = await fetch(`${API_URI}/size`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const resData = await res.json();
      console.log(resData);

      setSize(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSize();
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = product_id ? `${API_URI}/product/${product_id}` : `${API_URI}/product`;
      const method = product_id ? "PUT" : "POST"
      const res = await fetch(api, {
        method,
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 bg-white rounded-2xl shadow-md p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          {product_id ? "Update" : "Add New "} Product
        </h2>
        <p className="text-gray-500 mt-1">
          Fill in the details to create a new product.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Product Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, ["name"]: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Category
            </label>
            <select
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, ["category"]: e.target.value })
              }
            >
              <option>Select Category</option>
              {categories.length > 0 &&
                categories.map((item, i) => (
                  <option key={i} value={item._id}>
                    {item.title}
                  </option>
                ))}
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
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, ["brand"]: e.target.value })
              }
              placeholder="Apple, Nike..."
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          {/* size */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Size</label>
            <select
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, ["size"]: e.target.value })
              }
            >
              <option>Select Size</option>
              {size.length > 0 &&
                size.map((item, i) => (
                  <option key={i} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Sale Price
            </label>
            <input
              type="number"
              value={formData.saleprice}
              onChange={(e) =>
                setFormData({ ...formData, ["saleprice"]: e.target.value })
              }
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
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, ["quantity"]: e.target.value })
              }
              placeholder="Available Quantity"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Product Image */}
        {/* <div>
          <label className="block mb-2 font-medium text-gray-700">
            Product Image
          </label>

          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-44 cursor-pointer hover:border-blue-500 transition">
            <Upload size={40} className="text-gray-400 mb-2" />
            <span className="text-gray-500">Click to Upload Image</span>

            <input type="file" className="hidden"  />
          </label>
        </div> */}

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Product Description
          </label>

          <textarea
            rows="5"
            name="details"
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, ["details"]: e.target.value })
            }
            placeholder="Write product description..."
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Status</label>

          <select
            value={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, ["isActive"]: e.target.value })
            }
            className="w-full md:w-60 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
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
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer"
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
