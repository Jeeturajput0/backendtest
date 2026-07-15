import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Search } from "lucide-react";
import Navbar from "./navber";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r z-50 overflow-y-auto">
  <Sidebar />
</aside>


      {/* Right Area */}
      <div className="flex flex-col flex-1 ml-64">

        {/* Navbar */}
       
<Navbar/>
      
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">

          <Outlet />

        </main>


      </div>

    </div>
  );
};

export default AdminLayout;