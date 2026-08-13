import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setImageURL } from "../../../../config";
import services from "../../../../services/order.service";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getOrderDetails = async () => {
    try {
      setLoading(true);

      const data = await services.getOrderById(id);

      console.log("ORDER DETAILS:", data);

      if (data.success) {
        setOrder(data.data);
        setError("");
      } else {
        setError(data.message || "Order not found");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getOrderDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/admin/orders")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>

        <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
          <XCircle size={50} className="mx-auto text-red-400" />

          <h2 className="mt-4 text-xl font-bold text-gray-800">
            Order Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            {error || "Unable to load order details."}
          </p>
        </div>
      </div>
    );
  }

  const items = order.items || order.products || [];

  const subtotal =
    order.subtotal ??
    items.reduce(
      (total, item) =>
        total +
        Number(item.price || item.saleprice || 0) * Number(item.quantity || 1),
      0,
    );

  const shipping = Number(order.shippingCharge || 0);
  const discount = Number(order.discount || 0);

  const total = order.totalAmount ?? subtotal + shipping - discount;

  const customerName =
    order.customer?.name ||
    order.customerName ||
    order.user?.name ||
    order.customer ||
    "Customer";

  const customerEmail =
    order.customer?.email || order.email || order.user?.email || "-";

  const customerPhone =
    order.customer?.phone || order.phone || order.user?.phone || "-";

  const address =
    order.shippingAddress || order.address || order.deliveryAddress || {};

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const steps = [
    {
      title: "Order Placed",
      icon: CheckCircle2,
      active: true,
    },
    {
      title: "Processing",
      icon: Package,
      active: ["Processing", "Shipped", "Delivered"].includes(
        order.orderStatus,
      ),
    },
    {
      title: "Shipped",
      icon: Truck,
      active: ["Shipped", "Delivered"].includes(order.orderStatus),
    },
    {
      title: "Delivered",
      icon: CheckCircle2,
      active: order.orderStatus === "Delivered",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/admin/orders")}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-3 transition"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </button>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                order.orderStatus,
              )}`}
            >
              {order.orderStatus || "Pending"}
            </span>
          </div>

          <p className="text-gray-500 mt-1">
            Order #{order.orderNumber || order._id}
          </p>
        </div>

        <div className="text-sm text-gray-500">
          {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="font-bold text-gray-900 mb-6">Order Status</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative flex items-center gap-3"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center ${
                    step.active
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <div>
                  <p
                    className={`font-semibold ${
                      step.active ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>

                  {index === 0 && order.createdAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Products */}
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2">
                <Package size={20} className="text-blue-600" />

                <h2 className="font-bold text-gray-900">Ordered Products</h2>
              </div>
            </div>

            <div className="divide-y">
              {items.length > 0 ? (
                items.map((item, index) => {
                  const product = item.product || item;

                  const image = product.image || item.image;

                  const name = product.name || item.name || "Product";

                  const price =
                    item.price || item.saleprice || product.saleprice || 0;

                  const quantity = item.quantity || 1;

                  return (
                    <div
                      key={item._id || index}
                      className="p-5 flex items-center gap-4"
                    >
                      {image ? (
                        <img
                          src={setImageURL(image)}
                          alt={name}
                          className="w-20 h-20 rounded-xl object-cover border"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center">
                          <Package size={28} className="text-gray-400" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{name}</h3>

                        {item.size && (
                          <p className="text-sm text-gray-500 mt-1">
                            Size: {item.size}
                          </p>
                        )}

                        {item.color && (
                          <p className="text-sm text-gray-500">
                            Color: {item.color}
                          </p>
                        )}

                        <p className="text-sm text-gray-500 mt-1">
                          Qty: {quantity}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          ₹{Number(price * quantity).toLocaleString()}
                        </p>

                        <p className="text-xs text-gray-400">
                          ₹{Number(price).toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-10 text-center text-gray-500">
                  No products found in this order.
                </div>
              )}
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard size={20} className="text-blue-600" />

              <h2 className="font-bold text-gray-900">Payment Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>

                <p className="font-semibold mt-1">
                  {order.paymentMethod || "Online"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Payment Status</p>

                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paymentStatus || "Pending"}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500">Transaction ID</p>

                <p className="font-semibold mt-1 break-all">
                  {order.transactionId || order.paymentId || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Customer */}
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <User size={20} className="text-blue-600" />

              <h2 className="font-bold text-gray-900">Customer</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>

                <p className="font-semibold text-gray-900">{customerName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>

                <p className="font-medium text-gray-800 break-all">
                  {customerEmail}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={17} className="text-gray-400 mt-1" />

                <div>
                  <p className="text-sm text-gray-500">Phone</p>

                  <p className="font-medium">{customerPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <MapPin size={20} className="text-blue-600" />

              <h2 className="font-bold text-gray-900">Delivery Address</h2>
            </div>

            <div className="text-gray-600 leading-7">
              {typeof address === "string" ? (
                <p>{address}</p>
              ) : (
                <>
                  <p className="font-semibold text-gray-900">
                    {address.name || customerName}
                  </p>

                  <p>{address.address || address.street || ""}</p>

                  <p>
                    {address.city || ""}
                    {address.city && address.state ? ", " : ""}
                    {address.state || ""}
                  </p>

                  <p>{address.pincode || address.zipCode || ""}</p>

                  <p>{address.phone || customerPhone}</p>
                </>
              )}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-5">Price Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{Number(subtotal).toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₹{Number(shipping).toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹{Number(discount).toLocaleString()}</span>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <span className="font-bold text-gray-900">Total</span>

                <span className="text-xl font-bold text-blue-600">
                  ₹{Number(total).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
