import React from "react";
import { Link } from "react-router-dom";
import { Plus, Star } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      customer: "Jeetu Rajput",
      product: "Wireless Headphones",
      rating: 5,
      review: "Excellent product! Highly recommended.",
      status: "Approved",
    },
    {
      id: 2,
      customer: "Rahul Sharma",
      product: "Gaming Mouse",
      rating: 4,
      review: "Very good quality.",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Priya Verma",
      product: "Smart Watch",
      rating: 3,
      review: "Average experience.",
      status: "Rejected",
    },
  ];

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">⭐ Reviews</h1>
          <p className="text-gray-500">
            Manage customer product reviews
          </p>
        </div>

        <Link
          to="/admin/reviews/add"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          <Plus size={18} />
          Add Review
        </Link>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Total Reviews</h3>
          <p className="text-3xl font-bold text-blue-600">
            {reviews.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Average Rating</h3>
          <p className="text-3xl font-bold text-yellow-500">
            ⭐ 4.0
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Approved</h3>
          <p className="text-3xl font-bold text-green-600">
            {reviews.filter(r => r.status === "Approved").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th>Product</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((item) => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="p-3 font-medium">{item.customer}</td>
                <td>{item.product}</td>

                <td>
                  <div className="flex justify-center">
                    {[...Array(item.rating)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className="text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                </td>

                <td>{item.review}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      item.status === "Approved"
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

        {reviews.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No Reviews Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;