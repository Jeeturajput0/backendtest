import axios from "axios";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_URI, setImageURL } from "../../config";

const productImage = (product) =>
  product?.image
    ? setImageURL(product.image)
    : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800";
function ProductGrid({ products = [], sale = false }) {
  const navigate = useNavigate();
  const addToCart = async (item) => {
    const token = localStorage.getItem("token");
    if (!token)
      return navigate("/login", { state: { from: `/product/${item._id}` } });
    try {
      await axios.post(
        `${API_URI}/admin/cart`,
        { product: item._id, quantity: 1, color: item.color, size: item.size },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      navigate("/cart");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add product to cart");
    }
  };
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((item, index) => (
        <motion.article
          key={item._id}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: Math.min(index * 0.05, 0.25) }}
          whileHover={{ y: -6 }}
          className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,.06)]"
        >
          <div
            onClick={() => navigate(`/product/${item._id}`)}
            className="relative aspect-[4/4.3] cursor-pointer overflow-hidden bg-slate-100"
          >
            <img
              src={productImage(item)}
              alt={item.name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
            {(sale || item.mrp > item.saleprice) && (
              <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-extrabold text-white shadow-lg">
                {sale
                  ? "Limited drop"
                  : `${Math.round((1 - item.saleprice / item.mrp) * 100)}% OFF`}
              </span>
            )}
            <button
              onClick={(e) => e.stopPropagation()}
              aria-label="Add to wishlist"
              className="absolute right-3 top-3 rounded-xl bg-white/90 p-2.5 text-slate-600 shadow-sm backdrop-blur transition hover:text-rose-500"
            >
              <Heart size={17} />
            </button>
            <div className="absolute inset-x-3 bottom-3 flex translate-y-14 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${item._id}`);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-xs font-bold text-slate-900 shadow-lg"
              >
                <Eye size={15} />
                Quick view
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
                className="grid w-10 place-items-center rounded-xl bg-slate-900 text-white shadow-lg"
              >
                <ShoppingBag size={16} />
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-[11px] font-bold uppercase tracking-[.12em] text-slate-400">
                {item.category?.title || item.brand || "Collection"}
              </p>
              <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-500">
                <Star size={13} fill="currentColor" />
                4.8
              </span>
            </div>
            <h3
              onClick={() => navigate(`/product/${item._id}`)}
              className="mt-1.5 cursor-pointer truncate font-bold text-slate-900"
            >
              {item.name}
            </h3>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <span className="text-lg font-extrabold tracking-tight text-slate-950">
                  ₹{item.saleprice}
                </span>
                {item.mrp > item.saleprice && (
                  <span className="ml-2 text-xs text-slate-400 line-through">
                    ₹{item.mrp}
                  </span>
                )}
              </div>
              <button
                onClick={() => addToCart(item)}
                className="rounded-xl bg-orange-50 p-2 text-orange-600 transition hover:bg-orange-500 hover:text-white"
                aria-label={`Add ${item.name} to cart`}
              >
                <ShoppingBag size={17} />
              </button>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
export default ProductGrid;
