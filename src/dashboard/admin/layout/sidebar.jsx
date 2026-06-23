import { NavLink } from "react-router-dom";
import { menuItems } from "../data/menu";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen">
      
      <div className="p-5 border-b border-slate-700">
        <h1 className="text-xl font-bold">
          Admin Panel
        </h1>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `block w-full p-3 rounded-lg mb-2 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-lg">
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;