import { useEffect, useState } from "react";
import axios from "axios";
import { API_URI, setImageURL } from "../../config";
import { useParams } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";

const ProductDetails = () => {
  const { product_id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
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
    getProduct();
  }, [product_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Product Not Found
      </div>
    );
  }

  const discount =
    product.mrp && product.saleprice
      ? Math.round(((product.mrp - product.saleprice) / product.mrp) * 100)
      : 0;

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}

          <div>
            <img
              src={setImageURL(product.image)}
              alt={product.name}
              className="w-full rounded-xl border"
            />
          </div>

          {/* Details */}

          <div>
            <h1 className="text-4xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-1 my-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}

              <span className="text-gray-500 ml-2">(120 Reviews)</span>
            </div>

            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-bold text-red-600">
                ₹{product.saleprice}
              </h2>

              {product.mrp && (
                <span className="text-xl line-through text-gray-400">
                  ₹{product.mrp}
                </span>
              )}

              {discount > 0 && (
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
                  {discount}% OFF
                </span>
              )}
            </div>

            <div className="mt-8 space-y-3">
              <p>
                <strong>Brand :</strong> {product.brand || "N/A"}
              </p>

              <p>
                <strong>Category :</strong> {product.category?.title || "N/A"}
              </p>

              <p>
                <strong>Color :</strong> {product.color || "N/A"}
              </p>

              <p>
                <strong>Size :</strong> {product.size || "N/A"}
              </p>

              <p>
                <strong>Stock :</strong>{" "}
                <span className="text-green-600 font-semibold">
                  {product.stock || 0} Available
                </span>
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <button className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800">
                <ShoppingCart size={20} />
                Add To Cart
              </button>

              <button className="border p-3 rounded-lg hover:bg-gray-100">
                <Heart />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Product Description</h2>

          <p className="text-gray-600 leading-8">
            {product.details || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
