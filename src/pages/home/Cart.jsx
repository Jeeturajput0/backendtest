import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URI, setImageURL } from "../../config";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URI}/admin/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      setCart(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (item, quantity) => {
    if (quantity < 1) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URI}/admin/cart/${item._id}`,
        { quantity, color: item.color, size: item.size },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setCart((current) =>
        current.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity } : cartItem,
        ),
      );
    } catch (error) {
      alert(error.response?.data?.message || "Could not update cart");
    }
  };

  const removeItem = async (cartId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URI}/admin/cart/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart((current) => current.filter((item) => item._id !== cartId));
    } catch (error) {
      alert(error.response?.data?.message || "Could not remove item");
    }
  };

  useEffect(() => {
    getCart();
  }, []);
  console.log(cart);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-7xl px-5">
        <h1 className="mb-8 text-4xl font-bold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* Cart Items */}
          <div className="space-y-5">
            {cart.length === 0 ? (
              <div className="rounded-xl bg-white p-6 text-center shadow">
                Cart is empty.
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow md:flex-row"
                >
                  <img
                    src={setImageURL(item.product?.image)}
                    alt={item.product?.name}
                    className="h-40 w-40 rounded-xl object-cover"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {item.product?.name}
                      </h2>

                      <p className="mt-2 text-gray-500">Color: {item.color}</p>

                      <p className="text-gray-500">Size: {item.size}</p>

                      <h3 className="mt-4 text-2xl font-bold text-orange-600">
                        ₹{item.product?.saleprice}
                      </h3>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item, item.quantity - 1)
                          }
                          className="rounded-lg border p-2"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={18} />
                        </button>

                        <span className="text-lg font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item, item.quantity + 1)
                          }
                          className="rounded-lg border p-2"
                          aria-label="Increase quantity"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-white">
              Proceed To Checkout
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
