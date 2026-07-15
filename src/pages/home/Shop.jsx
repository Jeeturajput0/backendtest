import React, { useEffect, useState } from "react";
import { Search, ShoppingCart, Heart } from "lucide-react";
import { API_URI } from "../../config";
import { useParams, useSearchParams } from "react-router-dom";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const [filter, setFilter] = useState({
    category: category,
    search: "",
  });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch(`${API_URI}/product?is_active=true`);
      const resData = await res.json();
      setProducts(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch(`${API_URI}/category?is_active=true`);
      const resData = await res.json();
      setCategories(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const filteredProducts = products.filter((item) => {
    const title = item.name?.toLowerCase() || "";
    const search = filter.search.toLowerCase();

    const matchesSearch = title.includes(search);

    const categoryId =
      typeof item.category === "object" ? item.category?._id : item.category;

    const matchesCategory = !filter.category || categoryId === filter.category;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="text-4xl font-bold">Shop</h1>
          <p className="mt-2 text-blue-100">
            Discover the latest products at the best prices.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div className="space-y-3">
            {categories.map((item) => (
              <label key={item._id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={filter.category === item._id}
                  onChange={() =>
                    setFilter((prev) => ({
                      ...prev,
                      category: item._id,
                    }))
                  }
                />
                {item.title}
              </label>
            ))}
          </div>

          <button
            onClick={() =>
              setFilter({
                category: "",
                search: "",
              })
            }
            className="mt-6 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
          >
            Clear Filters
          </button>
        </aside>

        {/* Products */}
        <div className="lg:col-span-3">
          {/* Search + Sort */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filter.search}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
              />
            </div>

            <select className="border rounded-xl px-4 py-3">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      product.image
                        ? `http://localhost:3000/uploads/${product.image}`
                        : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
                    }
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />

                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white">
                    <Heart size={18} />
                  </button>
                </div>

                <div className="p-5">
                  <span className="text-sm text-blue-600 font-medium">
                    {product?.category?.title}
                  </span>

                  <h3 className="text-lg font-semibold mt-2">{product.name}</h3>

                  <p className="text-2xl font-bold text-blue-600 mt-2">
                    ₹{product.saleprice}
                  </p>

                  <button className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
