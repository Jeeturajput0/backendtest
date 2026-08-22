import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URI, setImageURL } from "../../config";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const getCart = async () => {
    try {
      const res = await axios.get(`${API_URI}/admin/cart`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCart(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  const updateQuantity = async (item, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(
        `${API_URI}/admin/cart/${item._id}`,
        { quantity, color: item.color, size: item.size },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
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
      await axios.delete(`${API_URI}/admin/cart/${cartId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCart((current) => current.filter((item) => item._id !== cartId));
    } catch (error) {
      alert(error.response?.data?.message || "Could not remove item");
    }
  };
  const subtotal = cart.reduce(
    (total, item) => total + (item.product?.saleprice || 0) * item.quantity,
    0,
  );
  const shipping = subtotal > 1000 || !subtotal ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50/70 via-white to-white py-10 sm:py-14">
      <div className="page-shell">
        <div className="mb-9 flex items-end justify-between">
          <div>
            <p className="eyebrow">Your selection</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Shopping bag
            </h1>
            <p className="mt-2 text-slate-500">
              {cart.length
                ? `${cart.length} carefully selected item${cart.length > 1 ? "s" : ""}`
                : "Your favourite things live here."}
            </p>
          </div>
          <div className="hidden rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 sm:flex">
            <Truck size={16} className="mr-2" />
            Free delivery over ₹999
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
            {cart.length === 0 ? (
              <div className="ui-card grid min-h-80 place-items-center p-8 text-center">
                <div>
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-orange-500">
                    <ShoppingBag size={25} />
                  </div>
                  <h2 className="mt-5 text-xl font-extrabold">
                    Your bag is waiting
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Explore the collection and save something exceptional.
                  </p>
                  <Link to="/shop" className="ui-button-accent mt-6">
                    Shop now <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ) : (
              cart.map((item, index) => (
                <motion.article
                  key={item._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col gap-5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,.05)] sm:flex-row"
                >
                  <img
                    src={setImageURL(item.product?.image)}
                    alt={item.product?.name}
                    className="h-36 w-full rounded-xl object-cover sm:w-36"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {item.product?.category?.title || "ShopEase"}
                      </p>
                      <h2 className="mt-1 text-xl font-extrabold">
                        {item.product?.name}
                      </h2>
                      <p className="mt-2 text-sm text-slate-500">
                        {item.color} · {item.size}
                      </p>
                      <h3 className="mt-3 text-xl font-extrabold">
                        ₹{(item.product?.saleprice || 0) * item.quantity}
                      </h3>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item, item.quantity - 1)
                          }
                          className="rounded-lg p-2 hover:bg-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-9 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item, item.quantity + 1)
                          }
                          className="rounded-lg p-2 hover:bg-white"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="rounded-xl p-2.5 text-rose-500 transition hover:bg-rose-50"
                        aria-label="Remove item"
                      >
                        <Trash2 size={19} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </section>
          <aside className="ui-card h-fit p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-extrabold">Order summary</h2>
            <p className="mt-1 text-sm text-slate-500">
              Taxes and delivery calculated here.
            </p>
            <div className="mt-6 space-y-3 border-y border-slate-100 py-5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className="font-bold text-emerald-600">
                  {shipping ? `₹${shipping}` : "Free"}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (18%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between pt-2 text-lg font-extrabold text-slate-950">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <input className="ui-input py-2.5" placeholder="Promo code" />
              <button className="ui-button-secondary px-3">Apply</button>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="ui-button-accent mt-5 w-full py-3.5"
            >
              Proceed to checkout <ArrowRight size={17} />
            </button>
            <p className="mt-4 text-center text-xs text-slate-500">
              Secure checkout · Easy returns
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
};
export default Cart;
