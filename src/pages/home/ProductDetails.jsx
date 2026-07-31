import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { API_URI, setImageURL } from "../../config";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product_id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [product_id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URI}/product/${product_id}`);
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return navigate("/login", { state: { from: location.pathname } });
      }

      const res = await axios.post(
        `${API_URI}/admin/cart`,
        {
          product: product._id,
          quantity: 1,
          color: product.color,
          size: product.size,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      if (res.data.success) {
        alert("Product Added Successfully");
        navigate("/cart");
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-bold">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-7xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <img
              src={setImageURL(product.image)}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-xl border"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <Star
                  key={item}
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}

              <span className="ml-2 text-gray-500">(120 Reviews)</span>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <span className="text-4xl font-bold text-red-600">
                ₹{product.saleprice}
              </span>

              <span className="text-xl line-through text-gray-400">
                ₹{product.mrp}
              </span>
            </div>

            <div className="space-y-3 mt-8">
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>

              <p>
                <strong>Category:</strong> {product.category?.title}
              </p>

              <p>
                <strong>Color:</strong> {product.color}
              </p>

              <p>
                <strong>Size:</strong> {product.size}
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={addToCart}
                className="bg-black text-white px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800"
              >
                <ShoppingCart size={20} />
                Add To Cart
              </button>

              <button className="border rounded-lg p-3 hover:bg-gray-100">
                <Heart />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-8">
          <h2 className="text-2xl font-bold mb-4">
            Product Description
          </h2>

          <p className="text-gray-600 leading-8">
            {product.details}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
