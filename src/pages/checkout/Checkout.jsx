import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, MapPin, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_URI } from "../../config";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`${API_URI}/admin/cart`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCart(res.data.data || []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const subtotal = useMemo(
    () =>
      cart.reduce((t, i) => t + (i.product?.saleprice || 0) * i.quantity, 0),
    [cart],
  );
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const placeOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login", { state: { from: "/checkout" } });
    if (!cart.length) return alert("Your cart is empty");
    if (Object.values(address).some((value) => !String(value).trim())) {
      return alert("Please complete your shipping address");
    }

    const items = cart.map((item) => ({
      product: item.product?._id,
      name: item.product?.name,
      image: item.product?.image,
      quantity: item.quantity,
      price: item.product?.saleprice || 0,
    }));
    const basePayload = {
      customer: address.fullName,
      customerEmail: JSON.parse(localStorage.getItem("userdetails") || "{}").email || "",
      mobile: address.mobile,
      shippingAddress: `${address.address}, ${address.city}, ${address.state} - ${address.pincode}`,
      paymentMethod,
      items,
      totalAmount: total,
    };
    const headers = { Authorization: `Bearer ${token}` };
    const saveOrder = async () => {
      const response = await axios.post(`${API_URI}/order`, basePayload, { headers });
      navigate("/order-success", {
        
        state: {
          orderNumber: response.data.data.orderNumber,
          paymentMethod,
          total: response.data.data.totalAmount,
        },
      });
    };

    try {
      await saveOrder();
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Could not place order");
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-8 grid lg:grid-cols-[1fr_360px] gap-8">
      <div className="space-y-6">
        <Link to="/cart" className="inline-flex items-center gap-2">
          <ArrowLeft size={18} />
          Back
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow p-6"
        >
          <h2 className="text-2xl font-bold flex gap-2 items-center">
            <MapPin />
            Shipping Address
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {Object.keys(address).map((k) =>
              k === "address" ? (
                <textarea
                  key={k}
                  className="border rounded p-3 md:col-span-2"
                  placeholder={k}
                  value={address[k]}
                  onChange={(e) =>
                    setAddress({ ...address, [k]: e.target.value })
                  }
                />
              ) : (
                <input
                  key={k}
                  className="border rounded p-3"
                  placeholder={k}
                  value={address[k]}
                  onChange={(e) =>
                    setAddress({ ...address, [k]: e.target.value })
                  }
                />
              ),
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow p-6"
        >
          <h2 className="text-2xl font-bold flex gap-2 items-center">
            <CreditCard />
            Payment
          </h2>
          <div className="mt-4 space-y-2">
            <label>
              <input
                type="radio"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />{" "}
              Cash on Delivery
            </label>
          </div>
        </motion.div>
      </div>

      <aside className="bg-white rounded-2xl shadow p-6 h-fit">
        <h2 className="text-2xl font-bold">Order Summary</h2>
        <div className="mt-6 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping ? `₹${shipping}` : "Free"}</span>
          </div>
          <div className="flex justify-between">
            <span>GST</span>
            <span>₹{tax}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
        <button
          onClick={placeOrder}
          className="w-full mt-6 bg-indigo-600 text-white rounded-xl py-3"
        >
          Place Order
        </button>
      </aside>
    </div>
  );
}
