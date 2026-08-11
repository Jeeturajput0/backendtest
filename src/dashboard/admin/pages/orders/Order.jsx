import { Search, Eye, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import services from "../../../../services/order.service";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const getOrders = async () => {
    try {
      const params = {
        search: search,
        page: 1,
        limit: 10,
      };

      const data = await services.getAllOrders(params);

      console.log("Orders:", data);

      if (data.success) {
        setOrders(data.data || []);
      } else {
        setOrders([]);
        console.log(data.message);
      }
    } catch (error) {
      console.error("Get orders error:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const count = (status) =>
    orders.filter(
      (order) => order.orderStatus === status
    ).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Orders
          </h1>

          <p className="text-gray-500">
            Manage customer orders.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/orders/add")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition"
        >
          <Plus size={18} />
          Add Order
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        {[
          ["Total Orders", orders.length, "text-gray-800"],
          ["Pending", count("Pending"), "text-yellow-500"],
          ["Delivered", count("Delivered"), "text-green-600"],
          ["Cancelled", count("Cancelled"), "text-red-600"],
        ].map(([label, value, color]) => (
          <div
            key={label}
            className="bg-white rounded-xl shadow p-5"
          >
            <p className="text-gray-500">
              {label}
            </p>

            <h2
              className={`text-3xl font-bold mt-2 ${color}`}
            >
              {value}
            </h2>
          </div>
        ))}

      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="relative max-w-sm">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search Orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getOrders();
              }
            }}
            className="w-full border rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">
                Order ID
              </th>

              <th className="text-left p-4">
                Customer
              </th>

              <th className="text-left p-4">
                Date
              </th>

              <th className="text-left p-4">
                Amount
              </th>

              <th className="text-left p-4">
                Payment
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-center p-4">
                Action
              </th>
            </tr>
          </thead>

          <tbody>

            {orders.map((item) => (

              <tr
                key={item._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-medium">
                  {item.orderNumber}
                </td>

                <td className="p-4">
                  {item.customer}
                </td>

                <td className="p-4">
                  {item.createdAt
                    ? new Date(
                        item.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-4">
                  ₹{item.totalAmount}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.paymentStatus}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : item.orderStatus === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {item.orderStatus}
                  </span>
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() =>
                     navigate(`/admin/orders/${item._id}`)
                    }
                    className="flex items-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                  >
                    <Eye size={16} />
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {orders.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No Orders Found
          </div>
        )}

      </div>

    </div>
  );
};

export default Orders;