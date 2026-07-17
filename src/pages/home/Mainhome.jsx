import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Heart,
  Search,
  User,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";
import { API_URI } from "../../config";
import { Link } from "react-router-dom";

const Mainhome = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch(`${API_URI}/product?is_active=true`);
      const resData = await res.json();
      setProducts(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch(`${API_URI}/category?is_active=true`);
      const resData = await res.json();
      setCategories(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
   

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-widest mb-2">Big Summer Sale</p>

            <h1 className="text-5xl font-bold leading-tight">
              Discover Amazing Products
            </h1>

            <p className="mt-6 text-lg opacity-90">
              Upgrade your lifestyle with premium electronics, fashion, shoes,
              and much more.
            </p>

            <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
              Shop Now
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
            alt="Hero"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10">Shop by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((item) => (
            <Link to={`/shop?category=${item._id}`}>
              <div
                key={item}
                className="bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition p-8 text-center font-semibold"
              >
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-10">Featured Products</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <div className="overflow-hidden">
                <img
                  src={
                    item.image
                      ? `http://localhost:3000/uploads/${item.image}`
                      : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
                  }
                  alt={item.name}
                  className="h-64 w-full object-cover hover:scale-110 duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg">{item.name}</h3>

                <p className="text-blue-600 font-bold mt-2">{item.saleprice}</p>

                <button className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-3xl bg-gradient-to-r from-pink-500 to-orange-500 text-white text-center py-16">
          <h2 className="text-5xl font-bold">Summer Sale</h2>

          <p className="mt-5 text-xl">Up to 70% OFF on selected products.</p>

          <button className="mt-8 bg-white text-pink-600 px-8 py-3 rounded-full font-semibold">
            Explore Deals
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {[
            {
              icon: <Truck size={40} />,
              title: "Free Shipping",
            },
            {
              icon: <RotateCcw size={40} />,
              title: "Easy Returns",
            },
            {
              icon: <ShieldCheck size={40} />,
              title: "Secure Payment",
            },
            {
              icon: <Headphones size={40} />,
              title: "24/7 Support",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-slate-50 rounded-3xl p-8 text-center shadow"
            >
              <div className="text-blue-600 flex justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="font-bold text-xl">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold">Subscribe to Our Newsletter</h2>

          <p className="mt-4">
            Get exclusive offers, new arrivals, and discounts directly in your
            inbox.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-xl text-black outline-none"
            />

            <button className="bg-white text-blue-600 px-8 rounded-xl font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white">ShopEase</h2>
            <p className="mt-2 text-sm">
              Premium shopping experience for everyone.
            </p>
          </div>

          <div className="space-y-2">
            <p>About</p>
            <p>Shop</p>
            <p>Contact</p>
            <p>Privacy Policy</p>
          </div>

          <div>
            <p>support@shopease.com</p>
            <p>+91 98765 43210</p>
          </div>
        </div>

        <div className="text-center text-sm mt-10 border-t border-slate-700 pt-5">
          © 2026 ShopEase. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Mainhome;
