import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { Search } from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-white border-r shadow-md fixed left-0 top-0">
        <Sidebar />
      </aside>

      {/* Main */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
          <h1 className="text-xl font-semibold">Dashboard</h1>

          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;