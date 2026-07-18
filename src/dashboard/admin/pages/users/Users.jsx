import React, { useState } from "react";
import {
  Search,
  Users,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

const UsersPage = () => {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: 1,
      name: "Jeetu Rajput",
      email: "jeetu@gmail.com",
      phone: "9876543210",
      role: "Admin",
      status: "Active",
      joined: "10 Jul 2026",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543211",
      role: "Customer",
      status: "Active",
      joined: "09 Jul 2026",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Aman Singh",
      email: "aman@gmail.com",
      phone: "9876543212",
      role: "Vendor",
      status: "Inactive",
      joined: "05 Jul 2026",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Priya Verma",
      email: "priya@gmail.com",
      phone: "9876543213",
      role: "Customer",
      status: "Active",
      joined: "02 Jul 2026",
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Rohit Kumar",
      email: "rohit@gmail.com",
      phone: "9876543214",
      role: "Vendor",
      status: "Blocked",
      joined: "30 Jun 2026",
      image: "https://i.pravatar.cc/150?img=5",
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Users size={32} className="text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-gray-500">
              Total Users : {filteredUsers.length}
            </p>
          </div>
        </div>

        <div className="relative mt-4 md:mt-0">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search User..."
            className="pl-10 pr-4 py-2 border rounded-xl outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />

                    <span className="font-semibold">
                      {user.name}
                    </span>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>{user.phone}</td>

                <td>{user.role}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm text-white ${
                      user.status === "Active"
                        ? "bg-green-500"
                        : user.status === "Blocked"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td>{user.joined}</td>

                <td>
                  <div className="flex justify-center gap-3">
                    <button className="text-blue-600">
                      <Eye size={18} />
                    </button>

                    <button className="text-green-600">
                      <Edit size={18} />
                    </button>

                    <button className="text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center p-10 text-gray-500"
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;