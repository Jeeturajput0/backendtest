import React, { useState } from "react";
import { Save, CreditCard } from "lucide-react";

const AddPayment = () => {
  const [form, setForm] = useState({
    customer: "",
    orderId: "",
    amount: "",
    method: "Razorpay",
    status: "Paid",
    transactionId: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Payment Added Successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-3 border-b p-6">
          <CreditCard className="text-blue-600" size={28} />
          <h1 className="text-2xl font-bold">Add Payment</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">
                Customer Name
              </label>
              <input
                type="text"
                name="customer"
                value={form.customer}
                onChange={handleChange}
                placeholder="Enter customer name"
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Order ID
              </label>
              <input
                type="text"
                name="orderId"
                value={form.orderId}
                onChange={handleChange}
                placeholder="ORD1001"
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Transaction ID
              </label>
              <input
                type="text"
                name="transactionId"
                value={form.transactionId}
                onChange={handleChange}
                placeholder="TXN123456"
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="2500"
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Payment Method
              </label>
              <select
                name="method"
                value={form.method}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option>Razorpay</option>
                <option>Stripe</option>
                <option>PayPal</option>
                <option>UPI</option>
                <option>Cash On Delivery</option>
                <option>Net Banking</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Payment Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option>Paid</option>
                <option>Pending</option>
                <option>Failed</option>
                <option>Refunded</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Payment Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              <Save size={18} />
              Save Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPayment;