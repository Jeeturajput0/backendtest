import { Search, Eye, Plus } from "lucide-react";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getOrders } from "../../../../store/slices/order.slice";
const Orders = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.order);

  const [search, setSearch] = useState("");

  const getOrdersData = () => {
    const params = {
      search: search,
      page: 1,
      limit: 10,
    };

    console.log("DISPATCH PARAMS:", params);

    dispatch(getOrders(params));
  }; CALL

  useEffect(() => {
    getOrdersData();
  }, []); STATUS

  const count = (status) => {
    return orders.filter((order) => order.orderStatus === status).length;
  };
  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>

          <p className="text-gray-500">Manage customer orders.</p>
        </div>

        <button
          onClick={() => navigate("/admin/orders/add")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition"
        >
          <Plus size={18} />
          Add Order
        </button>
      </div>


      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
          {error}
        </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Total Orders</p>

          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            {orders.length}
          </h2>
        </div>


        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Pending</p>

          <h2 className="text-3xl font-bold mt-2 text-yellow-500">
            {count("Pending")}
          </h2>
        </div>


        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Delivered</p>

          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {count("Delivered")}
          </h2>
        </div>


        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Cancelled</p>

          <h2 className="text-3xl font-bold mt-2 text-red-600">
            {count("Cancelled")}
          </h2>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search Orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getOrdersData();
              }
            }}
            className="w-full border rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={getOrdersData}
          disabled={loading}
          className="mt-3 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          <Search size={17} />

          {loading ? "Searching..." : "Search"}
        </button>
      </div>


      <div className="bg-white rounded-xl shadow overflow-x-auto">
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

            {loading && (
              <tr>
                <td colSpan="7" className="p-10 text-center text-gray-500">
                  Loading Orders...
                </td>
              </tr>
            )}


            {!loading &&
              orders.length > 0 &&
              orders.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">

                  <td className="p-4 font-medium">
                    {item.orderNumber || item._id}
                  </td>


                  <td className="p-4">{item.customer || "-"}</td>


                  <td className="p-4">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "-"}
                  </td>


                  <td className="p-4">₹{item.totalAmount || 0}</td>


                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.paymentStatus || "Pending"}
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
                      {item.orderStatus || "Pending"}
                    </span>
                  </td>


                  <td className="p-4 text-center">
                    <button
                      onClick={() => navigate(`/admin/orders/${item._id}`)}
                      className="flex items-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}


            {!loading && orders.length === 0 && (
              <tr>
                <td colSpan="7" className="p-10 text-center text-gray-500">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
