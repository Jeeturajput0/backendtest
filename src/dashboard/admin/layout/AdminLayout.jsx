import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { Search } from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r z-50">
        <Sidebar />
      </aside>


      {/* Right Area */}
      <div className="flex flex-col flex-1 ml-64">

        {/* Navbar */}
        {/* <header className="h-16 bg-white border-b flex items-center justify-between px-6">

          <h1 className="text-xl font-semibold text-gray-800">
            Dashboard
          </h1>


          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Search 
              size={22}
              className="text-gray-600"
            />
          </button>

        </header> */}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">

          <Outlet />

        </main>


      </div>

    </div>
  );
};

export default AdminLayout;