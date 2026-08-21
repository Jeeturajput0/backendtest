import { useEffect, useState } from "react";
import axios from "axios";
import { Package, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { API_URI } from "../../../../config";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URI}/vendor/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.data || []);
    } catch (error) {
      console.log("Vendor Orders Error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading orders...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>

        <p className="text-gray-500 mt-1">Orders containing your products</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border p-10 text-center">
          <Package size={45} className="mx-auto text-gray-400" />

          <h2 className="mt-4 text-xl font-semibold">No orders found</h2>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl border p-5 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>

                  <h2 className="font-bold text-lg">#{order.orderNumber}</h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Customer</p>

                  <p className="font-semibold">{order.customer}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Payment</p>

                  <span className="font-semibold">{order.paymentStatus}</span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Order Status</p>

                  <span className="font-semibold">{order.orderStatus}</span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Your Total</p>

                  <p className="font-bold text-green-600">
                    ₹{order.vendorTotal}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t pt-5">
                <h3 className="font-bold mb-3">Your Products</h3>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between bg-gray-50 rounded-xl p-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product?.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-lg object-cover"
                        />

                        <div>
                          <p className="font-semibold">{item.name}</p>

                          <p className="text-sm text-gray-500">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="font-bold">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <Link
                  to={`/vendor/orders/${order._id}`}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
                >
                  <Eye size={17} />
                  View Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorOrders;