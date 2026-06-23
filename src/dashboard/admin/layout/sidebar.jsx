import {
  LayoutDashboard,
  CreditCard,
  List,
  Folder,
  Settings,
  User,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-2 py-2 rounded ${
      isActive
        ? "bg-blue-500 text-white"
        : "text-white hover:bg-gray-700"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-8">Admin</h2>

      <ul className="space-y-3">
        <li>
          <NavLink to="/admin" end className={linkClass}>
            <LayoutDashboard size={18} />
            Overview
          </NavLink>
        </li>

        <li className="font-semibold mt-4">Card</li>

        <li>
          <NavLink
            to="/admin/card-form"
            className={linkClass}
          >
            <CreditCard size={18} />
            Card Form
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/card-list"
            className={linkClass}
          >
            <List size={18} />
            Card List
          </NavLink>
        </li>

        <li className="font-semibold mt-4">Category</li>

        <li>
          <NavLink
            to="/admin/category-form"
            className={linkClass}
          >
            <Folder size={18} />
            Category Form
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/category-list"
            className={linkClass}
          >
            <List size={18} />
            Category List
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/settings"
            className={linkClass}
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/profile"
            className={linkClass}
          >
            <User size={18} />
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/logout"
            className="flex items-center gap-2 px-2 py-2 rounded text-red-400 hover:bg-gray-700"
          >
            <LogOut size={18} />
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;