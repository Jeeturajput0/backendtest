import axios from "axios";
import { motion } from "framer-motion";
import {
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_URI, setImageURL } from "../../config";
import ProductGrid from "./ProductGrid";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    axios
      .get(`${API_URI}/product/${product_id}`)
      .then((res) => setProduct(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [product_id]);
  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token)
      return navigate("/login", { state: { from: location.pathname } });
    try {
      const res = await axios.post(
        `${API_URI}/admin/cart`,
        {
          product: product._id,
          quantity,
          color: product.color,
          size: product.size,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.data.success) navigate("/cart");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add product");
    }
  };
  if (loading)
    return (
      <div className="page-shell py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="skeleton aspect-square" />
          <div className="space-y-5">
            <div className="skeleton h-5 w-24" />
            <div className="skeleton h-12 w-3/4" />
            <div className="skeleton h-8 w-1/3" />
            <div className="skeleton h-36" />
          </div>
        </div>
      </div>
    );
  if (!product)
    return (
      <div className="page-shell grid min-h-[65vh] place-items-center">
        <div className="ui-card max-w-md p-10 text-center">
          <h1 className="text-2xl font-extrabold">Product unavailable</h1>
          <p className="mt-2 text-slate-500">
            This item may have moved or is no longer available.
          </p>
          <button onClick={() => navigate("/shop")} className="mt-6 ui-button">
            Browse collection
          </button>
        </div>
      </div>
    );
  return (
    <main className="bg-gradient-to-b from-orange-50/60 via-white to-white py-8 sm:py-12">
      <div className="page-shell">
        <p className="mb-6 text-sm text-slate-500">
          Shop <span className="mx-2 text-slate-300">/</span>
          {product.category?.title || "Collection"}
          <span className="mx-2 text-slate-300">/</span>
          <span className="font-medium text-slate-800">{product.name}</span>
        </p>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,.9fr)] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-[2rem] bg-slate-100"
          >
            <img
              src={setImageURL(product.image)}
              alt={product.name}
              className="aspect-square w-full object-cover transition duration-700 hover:scale-105"
            />
            <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold text-slate-900 shadow-sm backdrop-blur">
              Premium pick
            </span>
          </motion.div>
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 lg:h-fit"
          >
            <p className="eyebrow">
              {product.brand || product.category?.title || "ShopEase selection"}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={17} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm text-slate-500">
                4.9 · Loved by shoppers
              </span>
            </div>
            <div className="mt-7 flex items-center gap-3">
              <span className="text-3xl font-extrabold">
                ₹{product.saleprice}
              </span>
              {product.mrp > product.saleprice && (
                <>
                  <span className="text-lg text-slate-400 line-through">
                    ₹{product.mrp}
                  </span>
                  <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                    Save ₹{product.mrp - product.saleprice}
                  </span>
                </>
              )}
            </div>
            <p className="mt-6 leading-7 text-slate-600">{product.details}</p>
            <div className="mt-7 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-2">
              <p>
                <span className="font-bold text-slate-900">Color</span>
                <br />
                {product.color}
              </p>
              <p>
                <span className="font-bold text-slate-900">Size</span>
                <br />
                {product.size}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="rounded-lg p-2 hover:bg-slate-100"
                >
                  <Minus size={16} />
                </button>
                <span className="w-9 text-center text-sm font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="rounded-lg p-2 hover:bg-slate-100"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={addToCart}
                className="ui-button-accent flex-1 py-3.5"
              >
                <ShoppingBag size={18} />
                Add to cart
              </button>
              <button
                className="rounded-xl border border-slate-200 p-3.5 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
                aria-label="Add to wishlist"
              >
                <Heart size={19} />
              </button>
            </div>
            <div className="mt-7 grid gap-3 border-t pt-6 text-sm sm:grid-cols-2">
              <div className="flex gap-3">
                <Truck className="shrink-0 text-orange-500" size={19} />
                <p>
                  <b>Free delivery</b>
                  <br />
                  <span className="text-slate-500">
                    Dispatches within 24 hours
                  </span>
                </p>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="shrink-0 text-emerald-500" size={19} />
                <p>
                  <b>Quality assured</b>
                  <br />
                  <span className="text-slate-500">Easy 7-day returns</span>
                </p>
              </div>
            </div>
          </motion.section>
        </div>
        <section className="mt-20 border-t border-slate-200 pt-14">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">More to discover</p>
              <h2 className="mt-2 text-3xl font-extrabold">
                You may also like
              </h2>
            </div>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-500 sm:flex">
              <Check size={16} className="text-emerald-500" />
              Curated for you
            </div>
          </div>
          <ProductGrid products={[]} />
        </section>
      </div>
    </main>
  );
};
export default ProductDetails;
