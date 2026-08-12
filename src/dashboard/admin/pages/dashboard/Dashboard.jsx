import { motion } from "framer-motion";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_URI } from "../../../../config";
import { fetchproducts } from "../../../../store/slices/products.slice";

const money = (value) => `Rs ${Number(value || 0).toLocaleString("en-IN")}`;

export default function Dashboard() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

    dispatch(fetchproducts({ scope: "admin" }));

    Promise.all([
      fetch(`${API_URI}/admin/order`, { headers }),
      fetch(`${API_URI}/admin/payment`, { headers }),
    ])
      .then(async ([orderRes, paymentRes]) => {
        if (![orderRes, paymentRes].every((res) => res.ok)) {
          throw new Error("Dashboard data could not be loaded");
        }

        const [orderData, paymentData] = await Promise.all([
          orderRes.json(),
          paymentRes.json(),
        ]);

        setOrders(Array.isArray(orderData.data) ? orderData.data : []);
        setPayments(Array.isArray(paymentData.data) ? paymentData.data : []);
      })
      .catch((loadError) => setError(loadError.message));
  }, [dispatch]);

  const revenue = payments
    .filter((item) => item.status === "Paid")
    .reduce((total, item) => total + Number(item.amount || 0), 0);

  const stats = [
    ["Revenue", money(revenue), "Paid payments", DollarSign, "bg-orange-50 text-orange-600"],
    ["Orders", orders.length, `${orders.filter((item) => item.orderStatus === "Pending").length} pending`, ShoppingCart, "bg-sky-50 text-sky-600"],
    ["Products", products.length, `${products.filter((item) => item.isActive === false).length} inactive`, Package, "bg-emerald-50 text-emerald-600"],
    ["Payments", payments.length, `${payments.filter((item) => item.status === "Pending").length} pending`, Users, "bg-violet-50 text-violet-600"],
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <section className="rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-2xl sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-orange-300">
          Live store overview
        </p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
          Your store dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Products, orders and payments shown directly from your backend.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, detail, Icon, tint], index) => (
          <motion.article
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="ui-card p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <h2 className="mt-2 text-3xl font-extrabold">{value}</h2>
              </div>
              <div className={`rounded-2xl p-3 ${tint}`}>
                <Icon size={21} />
              </div>
            </div>
            <p className="mt-4 text-xs font-bold text-slate-500">{detail}</p>
          </motion.article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="ui-card p-6">
          <h2 className="text-xl font-extrabold">Recent products</h2>
          <div className="mt-5 space-y-3">
            {products.slice(0, 5).map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between border-b border-slate-100 pb-3"
              >
                <div>
                  <p className="font-bold text-slate-800">{product.name}</p>
                  <p className="text-xs text-slate-500">
                    {product.category?.title || "Uncategorised"}
                  </p>
                </div>
                <span
                  className={product.isActive ? "status-active" : "status-inactive"}
                >
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
            {!products.length && (
              <p className="text-sm text-slate-500">
                {error || "No products found."}
              </p>
            )}
          </div>
        </article>

        <article className="ui-card p-6">
          <h2 className="text-xl font-extrabold">Recent orders</h2>
          <div className="mt-5 space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between border-b border-slate-100 pb-3"
              >
                <div>
                  <p className="font-bold text-slate-800">{order.orderNumber}</p>
                  <p className="text-xs text-slate-500">
                    {order.customer || "Customer"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{money(order.totalAmount)}</p>
                  <p className="text-xs text-slate-500">{order.orderStatus}</p>
                </div>
              </div>
            ))}
            {!orders.length && (
              <p className="text-sm text-slate-500">
                {error || "No orders found."}
              </p>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
