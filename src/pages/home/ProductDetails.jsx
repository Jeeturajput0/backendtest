import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  Minus,
  Plus,
  Star,
  Truck,
  ShieldCheck,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { API_URI, setImageURL } from "../../config";
import ProductGrid from "./ProductGrid";

const ProductDetails = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // ================= Product =================

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URI}/product/${product_id}`);
      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [product_id]);

  // ================= Related Products =================

  const fetchRelatedProducts = async () => {
    if (!product) return;

    try {
      const res = await axios.get(`${API_URI}/product`);

      const currentCategory =
        typeof product.category === "object"
          ? product.category._id
          : product.category;

      const related = res.data.data
        .filter((item) => {
          const itemCategory =
            typeof item.category === "object"
              ? item.category._id
              : item.category;

          return (
            item._id !== product._id &&
            itemCategory === currentCategory
          );
        })
        .slice(0, 4);

      setRelatedProducts(related);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  // ================= Add To Cart =================

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });
      return;
    }

    try {
      const res = await axios.post(
        `${API_URI}/admin/cart`,
        {
          product: product._id,
          quantity,
          color: product.color,
          size: product.size,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        navigate("/cart");
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message);
    }
  };

  // ================= Loading =================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">

      <div className="grid lg:grid-cols-2 gap-10">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img
            src={setImageURL(product.image)}
            alt={product.name}
            className="w-full rounded-2xl shadow-lg"
          />
        </motion.div>

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <div className="flex gap-1 mt-4">
            {[1,2,3,4,5].map((i)=>(
              <Star
                key={i}
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <h2 className="text-4xl font-bold text-orange-600 mt-6">
            ₹{product.saleprice}
          </h2>

          <p className="line-through text-gray-400">
            ₹{product.mrp}
          </p>

          <p className="mt-5 text-gray-600">
            {product.details}
          </p>

          <div className="mt-6">

            <p><b>Color :</b> {product.color}</p>
            <p><b>Size :</b> {product.size}</p>
            <p><b>Brand :</b> {product.brand}</p>

          </div>

          <div className="flex items-center gap-4 mt-8">

            <div className="flex border rounded-xl">

              <button
                onClick={() =>
                  setQuantity((q)=>Math.max(1,q-1))
                }
                className="p-3"
              >
                <Minus/>
              </button>

              <span className="px-6 flex items-center">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((q)=>q+1)
                }
                className="p-3"
              >
                <Plus/>
              </button>

            </div>

            <button
              onClick={addToCart}
              className="bg-black text-white px-8 py-3 rounded-xl flex gap-2"
            >
              <ShoppingBag/>
              Add To Cart
            </button>

            <button className="border p-3 rounded-xl">
              <Heart/>
            </button>

          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-10">

            <div className="flex gap-3">
              <Truck/>
              <div>
                <h3 className="font-bold">
                  Free Delivery
                </h3>
                <p className="text-sm text-gray-500">
                  Dispatch within 24 hours
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <ShieldCheck/>
              <div>
                <h3 className="font-bold">
                  Quality Assured
                </h3>
                <p className="text-sm text-gray-500">
                  7 Days Return
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      <div className="mt-20">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Related Products
          </h2>

          <div className="flex gap-2 text-green-600">
            <Check/>
            Curated For You
          </div>

        </div>

        <ProductGrid products={relatedProducts} />

      </div>

    </div>
  );
};

export default ProductDetails;