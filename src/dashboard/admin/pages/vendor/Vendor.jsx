import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Vendors = () => {
  const vendors = [
    {
      id: 1,
      name: "Tech Store",
      owner: "Jeetu Rajput",
      email: "techstore@gmail.com",
      phone: "9876543210",
      status: "Active",
    },
    {
      id: 2,
      name: "Fashion Hub",
      owner: "Rahul Sharma",
      email: "fashion@gmail.com",
      phone: "9876543211",
      status: "Pending",
    },
    {
      id: 3,
      name: "Mobile World",
      owner: "Aman Singh",
      email: "mobile@gmail.com",
      phone: "9876543212",
      status: "Blocked",
    },
  ];

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">🏪 Vendors</h1>
          <p className="text-gray-500">
            Manage all registered vendors
          </p>
        </div>

        <Link
          to="/admin/vendors/add"
          className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          <Plus size={18} />
          Add Vendor
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Total Vendors</h3>
          <p className="text-3xl font-bold text-blue-600">
            {vendors.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Active</h3>
          <p className="text-3xl font-bold text-green-600">
            {vendors.filter(v => v.status === "Active").length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-3xl font-bold text-yellow-500">
            {vendors.filter(v => v.status === "Pending").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-3 text-left">Store</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="border-b hover:bg-slate-50">
                <td className="p-3 font-semibold">
                  {vendor.name}
                </td>
                <td>{vendor.owner}</td>
                <td>{vendor.email}</td>
                <td>{vendor.phone}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      vendor.status === "Active"
                        ? "bg-green-500"
                        : vendor.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {vendor.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {vendors.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No Vendors Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendors;