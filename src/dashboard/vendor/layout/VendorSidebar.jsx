import {
  BarChart3,
  Box,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const VendorSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/vendor",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/vendor/products",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/vendor/orders",
      icon: ShoppingBag,
    },
    {
      name: "Sales",
      path: "/vendor/sales",
      icon: BarChart3,
    },
    {
      name: "Profile",
      path: "/vendor/profile",
      icon: User,
    },
    {
      name: "Settings",
      path: "/vendor/settings",
      icon: Settings,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userdetails");

    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-slate-200 bg-white lg:block">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-100 px-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">
            ShopEase
          </h1>

          <p className="text-xs font-semibold text-indigo-600">
            Vendor Panel
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/vendor"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon size={19} />

              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-5 left-4 right-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default VendorSidebar;