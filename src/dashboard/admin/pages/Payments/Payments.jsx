import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Payments = () => {
  const payments = [
    {
      id: 1,
      customer: "Jeetu Rajput",
      order: "#1001",
      amount: "₹2,499",
      method: "Razorpay",
      status: "Paid",
    },
    {
      id: 2,
      customer: "Rahul Sharma",
      order: "#1002",
      amount: "₹999",
      method: "UPI",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Priya Verma",
      order: "#1003",
      amount: "₹1,599",
      method: "Stripe",
      status: "Paid",
    },
    {
      id: 4,
      customer: "Aman Singh",
      order: "#1004",
      amount: "₹799",
      method: "COD",
      status: "Failed",
    },
  ];

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            💳 Payments
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all payment transactions
          </p>
        </div>

        <Link
          to="/admin/payments/add"
          className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
        >
          <Plus size={18} />
          Add Payment
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-2xl font-bold text-green-600">₹5,896</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Paid</h3>
          <p className="text-2xl font-bold text-blue-600">2</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-500">1</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Failed</h3>
          <p className="text-2xl font-bold text-red-600">1</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th>Order</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((item) => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="p-3 font-medium">{item.customer}</td>
                <td>{item.order}</td>
                <td>{item.amount}</td>
                <td>{item.method}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      item.status === "Paid"
                        ? "bg-green-500"
                        : item.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No Payments Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;