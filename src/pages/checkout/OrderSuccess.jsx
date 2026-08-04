

import { CheckCircle, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-xl p-10 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle size={60} className="text-green-600" />
        </div>

        <h1 className="mt-6 text-4xl font-extrabold text-slate-900">
          Order Placed Successfully 🎉
        </h1>

        <p className="mt-4 text-slate-600">
          Thank you for shopping with us.
        </p>

        <div className="mt-8 rounded-2xl border bg-slate-50 p-5 text-left">
          <p><b>Order No:</b> {state?.orderNumber || "ORD-000001"}</p>
          <p><b>Payment:</b> {state?.paymentMethod || "Cash on Delivery"}</p>
          <p><b>Total:</b> ₹{state?.total || 0}</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/my-orders"
            className="flex-1 rounded-xl bg-indigo-600 py-3 text-center font-bold text-white"
          >
            My Orders
          </Link>

          <Link
            to="/shop"
            className="flex-1 rounded-xl border py-3 text-center font-bold"
          >
            <ShoppingBag size={18} className="inline mr-2"/>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
