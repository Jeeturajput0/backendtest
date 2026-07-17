import { Search, Eye } from "lucide-react";

const orders = [
  {
    id: "#ORD001",
    customer: "Ali Khan",
    date: "12 Jul 2026",
    amount: "$120",
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "#ORD002",
    customer: "Ahmed Ali",
    date: "11 Jul 2026",
    amount: "$250",
    payment: "Pending",
    status: "Processing",
  },
  {
    id: "#ORD003",
    customer: "Sara",
    date: "10 Jul 2026",
    amount: "$90",
    payment: "Paid",
    status: "Cancelled",
  },
];

const Orders = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-500">
            Manage customer orders.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Export Orders
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold mt-2">320</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-500 mt-2">18</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Delivered</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">280</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Cancelled</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">22</h2>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="relative max-w-sm">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search Orders..."
            className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Order ID</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Payment</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 font-medium">{item.id}</td>
                <td className="p-4">{item.customer}</td>
                <td className="p-4">{item.date}</td>
                <td className="p-4">{item.amount}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.payment === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.payment}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <button className="flex items-center gap-2 mx-auto bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">
                    <Eye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;