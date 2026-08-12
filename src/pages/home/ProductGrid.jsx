import axios from "axios";
import { motion } from "framer-motion";
import {
  Eye,
  Heart,
  ShoppingBag,
} from "lucide-react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  API_URI,
  setImageURL,
} from "../../config";

import {
  fetchproducts,
} from "../../store/slices/products.slice";

// ==========================================
// Product Image
// ==========================================

const productImage = (product) => {
  if (product?.image) {
    return setImageURL(product.image);
  }

  return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500";
};

// ==========================================
// Product Grid
// ==========================================

function ProductGrid({ sale = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ========================================
  // Redux State
  // ========================================

  const {
    products = [],
    loading,
    error,
  } = useSelector(
    (state) => state.product
  );

  // ========================================
  // Fetch Products
  // ========================================

  useEffect(() => {
    dispatch(
      fetchproducts({
        scope: "public",
        isActive: true,
        page: 1,
        limit: 20,
      })
    );
  }, [dispatch]);

  // ========================================
  // Sale Products
  // ========================================

  const visibleProducts = sale
    ? products.filter(
        (item) =>
          Number(item?.saleprice) <
          Number(item?.mrp)
      )
    : products;

  // ========================================
  // Add To Cart
  // ========================================

  const addToCart = async (item) => {
    const token =
      localStorage.getItem("token");

    // User login check
    if (!token) {
      navigate("/login", {
        state: {
          from: `/product/${item._id}`,
        },
      });

      return;
    }

    try {
      await axios.post(
        `${API_URI}/admin/cart`,

        {
          product: item._id,
          quantity: 1,
          color: item.color,
          size: item.size,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      navigate("/cart");

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add product to cart"
      );
    }
  };

  // ========================================
  // Loading
  // ========================================

  if (loading && products.length === 0) {
    return (
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {Array.from({ length: 4 }).map(
          (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <div className="aspect-[4/4.3] animate-pulse bg-slate-200" />

              <div className="space-y-3 p-4">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />

                <div className="h-5 w-36 animate-pulse rounded bg-slate-200" />

                <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          )
        )}

      </div>
    );
  }

  // ========================================
  // Error
  // ========================================

  if (error && products.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center text-red-600">
        {error}
      </div>
    );
  }

  // ========================================
  // UI
  // ========================================

  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

      {visibleProducts.map(
        (item, index) => (
          <motion.article
            key={item._id}

            initial={{
              opacity: 0,
              y: 18,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
              amount: 0.15,
            }}

            transition={{
              delay: Math.min(
                index * 0.05,
                0.25
              ),
            }}

            whileHover={{
              y: -6,
            }}

            className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,.06)]"
          >

            {/* ================================= */}
            {/* IMAGE */}
            {/* ================================= */}

            <div
              onClick={() =>
                navigate(
                  `/product/${item._id}`
                )
              }

              className="relative aspect-[4/4.3] cursor-pointer overflow-hidden bg-slate-100"
            >

              <img
                src={productImage(item)}
                alt={item.name || "Product"}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* SALE BADGE */}

              {(sale ||
                Number(item.mrp) >
                  Number(item.saleprice)) && (

                <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-extrabold text-white shadow-lg">

                  {sale
                    ? "Limited drop"
                    : `${Math.round(
                        (1 -
                          Number(
                            item.saleprice
                          ) /
                            Number(
                              item.mrp
                            )) *
                          100
                      )}% OFF`}

                </span>
              )}

              {/* WISHLIST */}

              <button
                onClick={(e) =>
                  e.stopPropagation()
                }

                aria-label="Add to wishlist"

                className="absolute right-3 top-3 rounded-xl bg-white/90 p-2.5 text-slate-600 shadow-sm backdrop-blur transition hover:text-rose-500"
              >
                <Heart size={17} />
              </button>

              {/* HOVER ACTIONS */}

              <div className="absolute inset-x-3 bottom-3 flex translate-y-14 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">

                {/* QUICK VIEW */}

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate(
                      `/product/${item._id}`
                    );
                  }}

                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-xs font-bold text-slate-900 shadow-lg"
                >
                  <Eye size={15} />

                  Quick view
                </button>

                {/* CART */}

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

            {/* ================================= */}
            {/* PRODUCT INFO */}
            {/* ================================= */}

            <div className="p-4">

              <div className="flex items-center justify-between gap-2">

                <p className="truncate text-[11px] font-bold uppercase tracking-[.12em] text-slate-400">
                  {item.category?.title ||
                    item.brand ||
                    "Collection"}
                </p>

                <span className="text-xs font-semibold text-amber-500">
                  ★ 4.8
                </span>

              </div>

              {/* NAME */}

              <h3
                onClick={() =>
                  navigate(
                    `/product/${item._id}`
                  )
                }

                className="mt-1.5 cursor-pointer truncate font-bold text-slate-900"
              >
                {item.name}
              </h3>

              {/* PRICE */}

              <div className="mt-3 flex items-end justify-between">

                <div>

                  <span className="text-lg font-extrabold tracking-tight text-slate-950">
                    ₹{item.saleprice}
                  </span>

                  {Number(item.mrp) >
                    Number(
                      item.saleprice
                    ) && (

                    <span className="ml-2 text-xs text-slate-400 line-through">
                      ₹{item.mrp}
                    </span>

                  )}

                </div>

                {/* CART BUTTON */}

                <button
                  onClick={() =>
                    addToCart(item)
                  }

                  className="rounded-xl bg-orange-50 p-2 text-orange-600 transition hover:bg-orange-500 hover:text-white"

                  aria-label={`Add ${
                    item.name
                  } to cart`}
                >
                  <ShoppingBag
                    size={17}
                  />
                </button>

              </div>

            </div>

          </motion.article>
        )
      )}

      {/* ===================================== */}
      {/* NO PRODUCTS */}
      {/* ===================================== */}

      {!loading &&
        !visibleProducts.length && (

          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500">

            {error ||
              "Products abhi available nahi hain."}

          </div>
        )}

    </div>
  );
}

export default ProductGrid;