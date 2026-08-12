import { Eye, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getOrders } from "../../../../store/slices/order.slice";

const money = (value) => `Rs ${Number(value || 0).toLocaleString("en-IN")}`;

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [search, setSearch] = useState("");

  const getOrdersData = (term = search) => {
    dispatch(
      getOrders({
        search: term,
        page: 1,
        limit: 10,
      }),
    );
  };

  useEffect(() => {
    getOrdersData("");
  }, [dispatch]);

  const count = (status) =>
    orders.filter((order) => order.orderStatus === status).length;

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.16em] text-indigo-600">
            Sales
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
            Orders
          </h1>
          <p className="mt-2 text-slate-500">Manage customer orders.</p>
        </div>

        <button
          onClick={() => navigate("/admin/orders/add")}
          className="ui-button"
        >
          <Plus size={18} />
          Add Order
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="ui-card p-5">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {orders.length}
          </h2>
        </div>

        <div className="ui-card p-5">
          <p className="text-gray-500">Pending</p>
          <h2 className="mt-2 text-3xl font-bold text-yellow-500">
            {count("Pending")}
          </h2>
        </div>

        <div className="ui-card p-5">
          <p className="text-gray-500">Delivered</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {count("Delivered")}
          </h2>
        </div>

        <div className="ui-card p-5">
          <p className="text-gray-500">Cancelled</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {count("Cancelled")}
          </h2>
        </div>
      </div>

      <div className="ui-card p-4">
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
            className="ui-input py-2 pl-10 pr-4"
          />
        </div>

        <button
          onClick={() => getOrdersData()}
          disabled={loading}
          className="mt-3 ui-button bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
        >
          <Search size={17} />
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th className="text-center">Action</th>
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
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="font-medium">{item.orderNumber || item._id}</td>
                  <td>{item.customer || "-"}</td>
                  <td>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{money(item.totalAmount)}</td>
                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        item.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : item.paymentStatus === "Failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.paymentStatus || "Pending"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
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
                  <td className="text-center">
                    <button
                      onClick={() => navigate(`/admin/orders/${item._id}`)}
                      className="mx-auto flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
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
                  {error || "No Orders Found"}
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
