import { Outlet } from "react-router-dom";
import VendorSidebar from "./VendorSidebar";

const VendorLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <VendorSidebar />

      <main className="min-h-screen lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default VendorLayout;