import axios from "axios";
import {
  BarChart3,
  Box,
  Clock3,
  IndianRupee,
  Package,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { API_URI } from "../../../config";

const VendorDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URI}/vendor/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(res.data.data);
    } catch (error) {
      console.log(
        "Vendor Dashboard Error:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-52 rounded-lg bg-slate-200" />

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-32 rounded-2xl bg-slate-200" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
            Vendor Panel
          </p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your store, products and orders.
          </p>
        </div>

        <button
          onClick={fetchDashboard}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* Products */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <Package size={22} />
            </div>

            <TrendingUp size={18} className="text-emerald-500" />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Products
          </p>

          <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
            {dashboard?.totalProducts || 0}
          </h2>
        </div>

        {/* Orders */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <ShoppingBag size={22} />
            </div>

            <BarChart3 size={18} className="text-blue-500" />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Orders
          </p>

          <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
            {dashboard?.totalOrders || 0}
          </h2>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Clock3 size={22} />
            </div>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Pending Orders
          </p>

          <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
            {dashboard?.pendingOrders || 0}
          </h2>
        </div>

        {/* Sales */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <IndianRupee size={22} />
            </div>

            <TrendingUp size={18} className="text-emerald-500" />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">Total Sales</p>

          <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
            ₹{dashboard?.totalSales || 0}
          </h2>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Store Overview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <Box size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">Store Overview</h2>

              <p className="text-sm text-slate-500">Your store information</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-sm text-slate-500">Active Products</span>

              <span className="font-bold text-slate-900">
                {dashboard?.totalProducts || 0}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-sm text-slate-500">Orders</span>

              <span className="font-bold text-slate-900">
                {dashboard?.totalOrders || 0}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Pending Orders</span>

              <span className="font-bold text-amber-600">
                {dashboard?.pendingOrders || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">Quick Actions</h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your store quickly.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => (window.location.href = "/vendor/products")}
              className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-indigo-200 hover:bg-indigo-50"
            >
              <Package size={20} className="text-indigo-600" />

              <p className="mt-3 font-bold text-slate-900">Manage Products</p>

              <p className="mt-1 text-xs text-slate-500">
                Add and manage products
              </p>
            </button>

            <button
              onClick={() => (window.location.href = "/vendor/orders")}
              className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-indigo-200 hover:bg-indigo-50"
            >
              <ShoppingBag size={20} className="text-indigo-600" />

              <p className="mt-3 font-bold text-slate-900">Manage Orders</p>

              <p className="mt-1 text-xs text-slate-500">View your orders</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
