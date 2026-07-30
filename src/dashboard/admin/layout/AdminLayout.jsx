import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Search } from "lucide-react";
import Navbar from "./navber";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 overflow-y-auto border-r border-slate-200 bg-white lg:block">
        <Sidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:ml-72">
        <Navbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
