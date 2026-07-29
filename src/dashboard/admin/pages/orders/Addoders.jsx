import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URI } from "../../../../config";

const AddOrders = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    orderNumber: "",
    customer: "",
    customerEmail: "",
    totalAmount: "",
    paymentStatus: "Pending",
    orderStatus: "Pending",
    items: [
      {
        name: "",
        quantity: 1,
        price: "",
      },
    ],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (index, e) => {
    const values = [...formData.items];
    values[index][e.target.name] = e.target.value;

    setFormData({
      ...formData,
      items: values,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          name: "",
          quantity: 1,
          price: "",
        },
      ],
    });
  };

  const removeItem = (index) => {
    const values = [...formData.items];
    values.splice(index, 1);

    setFormData({
      ...formData,
      items: values,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URI}/admin/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...formData,
          totalAmount: Number(formData.totalAmount),
          items: formData.items.map((item) => ({
            ...item,
            quantity: Number(item.quantity),
            price: Number(item.price),
          })),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order Added Successfully");
        navigate("/admin/orders");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Add New Order
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Details */}

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="font-medium">
              Order Number
            </label>

            <input
              type="text"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">
              Customer Name
            </label>

            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">
              Customer Email
            </label>

            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">
              Total Amount
            </label>

            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">
              Payment Status
            </label>

            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option>Pending</option>
              <option>Paid</option>
              <option>Failed</option>
              <option>Refunded</option>
            </select>
          </div>

          <div>
            <label className="font-medium">
              Order Status
            </label>

            <select
              name="orderStatus"
              value={formData.orderStatus}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* Products */}

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Order Items
            </h3>

            <button
              type="button"
              onClick={addItem}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Add Item
            </button>
          </div>

          {formData.items.map((item, index) => (
            <div
              key={index}
              className="grid md:grid-cols-4 gap-4 border rounded-lg p-4 mb-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, e)
                }
                className="border rounded-lg p-3"
                required
              />

              <input
                type="number"
                name="quantity"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, e)
                }
                className="border rounded-lg p-3"
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, e)
                }
                className="border rounded-lg p-3"
                required
              />

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="bg-red-500 text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Save Order
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/orders")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrders;