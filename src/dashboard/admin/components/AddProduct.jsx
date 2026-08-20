import { Save } from "lucide-react";
import {
  API_URI,
  AUTH_TOKEN,
  setImageURL,
  uploadImage,
} from "../../../config";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = ({
  productApi = `${API_URI}/admin/product`,
  basePath = "/admin/products",
  catalogApi = `${API_URI}/admin`,
}) => {
  const navigate = useNavigate();

  const { product_id } = useParams();

  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const [size, setSize] = useState([]);

  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingSizes, setLoadingSizes] = useState(false);
  const [brandError, setBrandError] = useState("");
  const [sizeError, setSizeError] = useState("");
  const categoryRequestId = useRef(0);

  const [formData, setFormData] = useState({
    name: "",
    details: "",
    brand: "",
    size: "",
    color: "red",
    category: "",
    mrp: 0,
    saleprice: 0,
    quantity: 0,
    image: null,
    isActive: true,
  });

  const [variations, setVariations] = useState([]);

  // =========================
  // Get Product for Edit
  // =========================

  const getProductDetail = async () => {
    try {
      const res = await fetch(`${productApi}/${product_id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const resData = await res.json();

      if (!resData.success) {
        console.log(resData.message);
        return;
      }

      const data = resData.data;

      setFormData({
        name: data.name || "",
        details: data.details || "",
        brand: data.brand?._id || data.brand || "",
        size: data.size?._id || data.size || "",
        category: data.category?._id || data.category || "",
        color: data.color || "red",
        mrp: data.mrp || 0,
        saleprice: data.saleprice || 0,
        quantity: data.quantity || 0,
        isActive: data.isActive ?? true,
        image: data.image || null,
      });

      setVariations(data.variations || []);
    } catch (error) {
      console.log("PRODUCT DETAILS ERROR:", error);
    }
  };

  // =========================
  // Categories
  // =========================

  const getCategories = async () => {
    try {
      const res = await fetch(`${catalogApi}/category`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const resData = await res.json();

      if (resData.success) {
        setCategories(resData.data || []);
      }
    } catch (error) {
      console.log("CATEGORY ERROR:", error);
    }
  };

  // =========================
  // Brands According To Category
  // =========================

  const getBrand = async (categoryId, requestId) => {
    if (!categoryId) {
      if (requestId === categoryRequestId.current) setBrand([]);
      return;
    }

    try {
      setLoadingBrands(true);
      setBrandError("");

      const res = await fetch(
        `${catalogApi}/brand?category=${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );

      const resData = await res.json();

      if (!res.ok || !resData.success) {
        throw new Error(resData.message || "Brands could not be loaded");
      }
      if (requestId === categoryRequestId.current) {
        setBrand(resData.data || []);
      }
    } catch (error) {
      if (requestId === categoryRequestId.current) {
        setBrand([]);
        setBrandError(error.message || "Brands could not be loaded");
      }
    } finally {
      if (requestId === categoryRequestId.current) setLoadingBrands(false);
    }
  };

  // =========================
  // Sizes According To Category
  // =========================

  const getSize = async (categoryId, requestId) => {
    if (!categoryId) {
      if (requestId === categoryRequestId.current) setSize([]);
      return;
    }

    try {
      setLoadingSizes(true);
      setSizeError("");

      const res = await fetch(
        `${catalogApi}/size?category=${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );

      const resData = await res.json();

      if (!res.ok || !resData.success) {
        throw new Error(resData.message || "Sizes could not be loaded");
      }
      if (requestId === categoryRequestId.current) {
        setSize(resData.data || []);
      }
    } catch (error) {
      if (requestId === categoryRequestId.current) {
        setSize([]);
        setSizeError(error.message || "Sizes could not be loaded");
      }
    } finally {
      if (requestId === categoryRequestId.current) setLoadingSizes(false);
    }
  };

  // =========================
  // Initial Data
  // =========================

  useEffect(() => {
    getCategories();

    if (product_id) {
      getProductDetail();
    }
  }, []);

  // =========================
  // IMPORTANT:
  // After category is loaded,
  // fetch brands and sizes
  // =========================

  useEffect(() => {
    const requestId = ++categoryRequestId.current;
    if (formData.category) {
      setBrand([]);
      setSize([]);
      getBrand(formData.category, requestId);
      getSize(formData.category, requestId);
    } else {
      setBrand([]);
      setSize([]);
      setBrandError("");
      setSizeError("");
    }
  }, [formData.category]);

  // =========================
  // Category Change
  // =========================

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      category: categoryId,
      brand: "",
      size: "",
    }));

    // useEffect automatically fetches
    // filtered brand + size
  };

  // =========================
  // Submit
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      alert("Please select category");
      return;
    }

    if (!formData.brand) {
      alert("Please select brand");
      return;
    }

    if (!formData.size) {
      alert("Please select size");
      return;
    }

    const payload = {
      ...formData,
      variations,
    };

    try {
      const api = product_id
        ? `${productApi}/${product_id}`
        : productApi;

      const method = product_id ? "PUT" : "POST";

      const res = await fetch(api, {
        method,
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.message || "Product save failed");
        return;
      }

      alert(
        product_id
          ? "Product updated successfully"
          : "Product added successfully"
      );

      navigate(basePath);
    } catch (error) {
      console.log("PRODUCT SAVE ERROR:", error);
      alert("Something went wrong");
    }
  };

  // =========================
  // Variation
  // =========================

  const handleVariationChange = (index, e) => {
    const { name, value } = e.target;

    const updated = [...variations];

    updated[index][name] = value;

    setVariations(updated);
  };

  const addVariation = () => {
    setVariations([
      ...variations,
      {
        color: "",
        size: "",
        price: "",
        stock: "",
        sku: "",
      },
    ]);
  };

  const removeVariation = (index) => {
    const updated = variations.filter((_, i) => i !== index);

    setVariations(updated);
  };

  // =========================
  // Image
  // =========================

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const imagePath = await uploadImage(file);

      if (!imagePath) return;

      setFormData((prev) => ({
        ...prev,
        image: imagePath,
      }));
    } catch (error) {
      console.log("IMAGE ERROR:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 bg-white rounded-2xl shadow-md p-8">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          {product_id ? "Update" : "Add New"} Product
        </h2>

        <p className="text-gray-500 mt-1">
          Fill in the details to create a new product.
        </p>
      </div>

      <form
        className="space-y-6"
        onSubmit={handleSubmit}
      >

        {/* Product Name + Category */}

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
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* CATEGORY */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Category
            </label>

            <select
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.title}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* BRAND + SIZE */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* BRAND */}

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Brand
            </label>

            <select
              name="brand"
              value={formData.brand}
              disabled={!formData.category || loadingBrands}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  brand: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none disabled:bg-gray-100"
              required
            >
              <option value="">
                {!formData.category
                  ? "First Select Category"
                  : loadingBrands
                  ? "Loading Brands..."
                  : "Select Brand"}
              </option>

              {brand.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>
              ))}
            </select>

            {formData.category && !loadingBrands && brand.length === 0 && (
              <p className="mt-2 text-sm text-red-500">
                {brandError || "No brand found for this category."}
              </p>
            )}
          </div>

          {/* SIZE */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Size
            </label>

            <select
              value={formData.size}
              disabled={!formData.category || loadingSizes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  size: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
              required
            >
              <option value="">
                {!formData.category
                  ? "First Select Category"
                  : loadingSizes
                  ? "Loading Sizes..."
                  : "Select Size"}
              </option>

              {size.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>
              ))}
            </select>

            {formData.category && !loadingSizes && size.length === 0 && (
              <p className="mt-2 text-sm text-red-500">
                {sizeError || "No size found for this category."}
              </p>
            )}
          </div>

        </div>

        {/* PRICE + STOCK */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Sale Price
            </label>

            <input
              type="number"
              value={formData.saleprice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  saleprice: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
              required
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
                setFormData({
                  ...formData,
                  quantity: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

        </div>

        {/* DESCRIPTION */}

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Product Description
          </label>

          <textarea
            rows="5"
            value={formData.details}
            onChange={(e) =>
              setFormData({
                ...formData,
                details: e.target.value,
              })
            }
            placeholder="Write product description..."
            className="w-full border rounded-lg px-4 py-3 resize-none"
          />
        </div>

        {/* IMAGE */}

        <div>
          <label className="block mb-2 font-medium">
            Image
          </label>

          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            required={!product_id && !formData.image}
            className="w-full border rounded-lg px-4 py-3"
          />

          {formData.image && (
            <img
              src={setImageURL(formData.image)}
              alt="Product preview"
              className="mt-3 h-24 w-24 rounded-lg border object-cover"
            />
          )}
        </div>

        {/* STATUS */}

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            value={formData.isActive}
            onChange={(e) =>
              setFormData({
                ...formData,
                isActive: e.target.value === "true",
              })
            }
            className="w-full md:w-60 border rounded-lg px-4 py-3"
          >
            <option value="true">
              Active
            </option>

            <option value="false">
              Inactive
            </option>
          </select>
        </div>

        {/* VARIATIONS */}

        <div>
          <h4 className="font-bold text-lg mb-4">
            Product Variation
          </h4>

          {variations.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-3"
            >
              <input
                type="text"
                name="color"
                placeholder="Color"
                value={item.color}
                onChange={(e) =>
                  handleVariationChange(index, e)
                }
                className="border p-2 rounded"
              />

              <input
                type="text"
                name="size"
                placeholder="Size"
                value={item.size}
                onChange={(e) =>
                  handleVariationChange(index, e)
                }
                className="border p-2 rounded"
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={(e) =>
                  handleVariationChange(index, e)
                }
                className="border p-2 rounded"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={item.stock}
                onChange={(e) =>
                  handleVariationChange(index, e)
                }
                className="border p-2 rounded"
              />

              <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={item.sku}
                onChange={(e) =>
                  handleVariationChange(index, e)
                }
                className="border p-2 rounded"
              />

              <button
                type="button"
                onClick={() =>
                  removeVariation(index)
                }
                className="bg-red-500 text-white rounded px-3"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addVariation}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Variation
          </button>
        </div>

        {/* BUTTONS */}

        <div className="flex justify-end gap-4 pt-6">

          <button
            type="button"
            onClick={() =>
              navigate(basePath)
            }
            className="px-6 py-3 rounded-lg border"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            <Save size={18} />

            {product_id
              ? "Update Product"
              : "Save Product"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default AddProduct;
