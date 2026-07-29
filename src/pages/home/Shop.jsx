import React, { useEffect, useState } from "react";
import { Heart, Search, ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import { API_URI, setImageURL } from "../../config";
import { useSearchParams } from "react-router-dom";
const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const [filter, setFilter] = useState({ category, search: "" });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const getProducts = async () => {
    try {
      const res = await fetch(`${API_URI}/product?is_active=true`);
      const data = await res.json();
      setProducts(data.data || []);
    } catch (e) {
      console.log(e);
    }
  };
  const getCategories = async () => {
    try {
      const res = await fetch(`${API_URI}/category?is_active=true`);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);
  const filteredProducts = products.filter((item) => {
    const matchesSearch = (item.name?.toLowerCase() || "").includes(
      filter.search.toLowerCase(),
    );
    const id =
      typeof item.category === "object" ? item.category?._id : item.category;
    return matchesSearch && (!filter.category || id === filter.category);
  });
  const clear = () => setFilter({ category: "", search: "" });
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">
            The complete collection
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950">
            Find your next favourite.
          </h1>
          <p className="mt-3 text-slate-500">
            Browse thoughtfully selected essentials for every day.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              placeholder="Search products"
              className="ui-input pl-11"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="ui-button-secondary lg:hidden"
            >
              <SlidersHorizontal size={17} /> Filters
            </button>
            <p className="hidden self-center text-sm text-slate-500 sm:block">
              {filteredProducts.length} products
            </p>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside
            className={`${filtersOpen ? "block" : "hidden"} ui-card h-fit p-5 lg:block`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Filters</h2>
              <button
                onClick={clear}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Clear all
              </button>
            </div>
            <div className="mt-6 border-t pt-5">
              <p className="text-sm font-semibold text-slate-700">Category</p>
              <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                <input
                  type="radio"
                  name="category"
                  checked={!filter.category}
                  onChange={() => setFilter({ ...filter, category: "" })}
                  className="accent-indigo-600"
                />
                All categories
              </label>
              {categories.map((item) => (
                <label
                  key={item._id}
                  className="mt-3 flex cursor-pointer items-center gap-3 text-sm text-slate-600"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={filter.category === item._id}
                    onChange={() =>
                      setFilter({ ...filter, category: item._id })
                    }
                    className="accent-indigo-600"
                  />
                  {item.title}
                </label>
              ))}
            </div>
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-6 w-full ui-button lg:hidden"
            >
              <X size={16} /> Close filters
            </button>
          </aside>
          <main>
            <div className="mb-5 flex items-center justify-between lg:hidden">
              <p className="text-sm text-slate-500">
                {filteredProducts.length} products
              </p>
            </div>
            {products.length === 0 ? (
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-80 animate-pulse rounded-2xl bg-slate-200"
                  />
                ))}
              </div>
            ) : filteredProducts.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <article
                    key={product._id || product.id}
                    className="group ui-card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      <img
                        src={
                          product.image
                            ? setImageURL(product.image)
                            : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
                        }
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <button className="absolute right-3 top-3 rounded-xl bg-white/90 p-2.5 text-slate-600 shadow-sm hover:text-rose-500">
                        <Heart size={18} />
                      </button>
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                        {product?.category?.title || "Collection"}
                      </p>
                      <h3 className="mt-2 truncate font-semibold text-slate-900">
                        {product.name}
                      </h3>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-lg font-bold">
                          ₹{product.saleprice}
                        </p>
                        <button className="rounded-xl bg-slate-900 p-2.5 text-white transition hover:bg-indigo-600">
                          <ShoppingBag size={17} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="ui-card flex min-h-80 flex-col items-center justify-center px-6 text-center">
                <div className="rounded-2xl bg-indigo-50 p-4 text-indigo-600">
                  <Search size={27} />
                </div>
                <h2 className="mt-5 text-xl font-bold">No products found</h2>
                <p className="mt-2 max-w-sm text-sm text-slate-500">
                  Try changing your search or clearing the active filters.
                </p>
                <button onClick={clear} className="mt-6 ui-button">
                  Clear filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
export default Shop;
