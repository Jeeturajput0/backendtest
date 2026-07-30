import { useNavigate } from "react-router-dom";
import { API_URI, setImageURL } from "../../config";
import { Heart, ShoppingBag } from "lucide-react";
const productImage = (product) =>
  product?.image
    ? setImageURL(product.image)
    : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800";

function ProductGrid({ products, sale = false }) {
  const navigate = useNavigate();
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((item) => (
        <article
          key={item._id}
          onClick={() => navigate(`/product/${item._id}`)}
          className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative aspect-square overflow-hidden bg-slate-100">
            <img
              src={productImage(item)}
              alt={item.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            {sale && (
              <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white">
                Flash deal
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Wishlist Logic
              }}
              className="absolute right-3 top-3 rounded-xl bg-white/90 p-2 text-slate-600"
            >
              <Heart size={17} />
            </button>
          </div>
          <div className="p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {item.category?.title || "Collection"}
            </p>
            <h3 className="mt-1 truncate font-semibold text-slate-900">
              {item.name}
            </h3>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <span className="text-lg font-bold">₹{item.saleprice}</span>
                {item.mrp > item.saleprice && (
                  <span className="ml-2 text-sm text-slate-400 line-through">
                    ₹{item.mrp}
                  </span>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/cart");
                }}
                className="rounded-xl bg-slate-900 p-2.5 text-white"
              >
                <ShoppingBag size={16} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
export default ProductGrid;
