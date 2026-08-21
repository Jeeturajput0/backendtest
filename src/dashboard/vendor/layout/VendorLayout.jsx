import { Bell, ChevronDown, Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import VendorSidebar from "./VendorSidebar";

const VendorLayout = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <VendorSidebar />
      <div className="sticky top-0 z-30 flex h-[86px] items-center justify-between border-b border-slate-200/80 bg-white/85 px-5 backdrop-blur-xl lg:ml-72 lg:px-9">
        <button className="rounded-xl p-2 text-slate-600 lg:hidden"><Menu size={21} /></button>
        <div className="ml-auto flex items-center gap-3"><button className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"><Bell size={20} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" /></button><span className="hidden text-sm font-medium text-slate-500 sm:block">Vendor</span><span className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 text-sm font-extrabold text-white shadow-lg shadow-blue-500/30">V</span><ChevronDown size={16} className="text-slate-400" /></div>
      </div>
      <main className="min-h-[calc(100vh-86px)] lg:ml-72">
        <Outlet />
      </main>
    </div>
  );
};

export default VendorLayout;
