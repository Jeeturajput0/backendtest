import { LogOut, Package, Plus, Store } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const navClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
    isActive ? "bg-emerald-500 text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"
  }`;

export default function VendorLayout() {
  const navigate = useNavigate();
  const logout = () => {
    ["token", "role", "userdetails"].forEach((key) => localStorage.removeItem(key));
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <aside className="bg-slate-950 p-5 text-white lg:min-h-screen lg:w-72">
        <NavLink to="/vendor" end className="mb-8 flex items-center gap-3 px-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-slate-950"><Store size={20} /></span>
          <span><b className="block">ShopEase</b><small className="text-slate-400">Vendor portal</small></span>
        </NavLink>
        <nav className="space-y-1">
          <NavLink to="/vendor" end className={navClass}><Store size={18} />Overview</NavLink>
          <NavLink to="/vendor/products" className={navClass}><Package size={18} />My products</NavLink>
          <NavLink to="/vendor/products/add" className={navClass}><Plus size={18} />Add product</NavLink>
        </nav>
        <button onClick={logout} className="mt-8 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"><LogOut size={18} />Sign out</button>
      </aside>
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8"><Outlet /></main>
    </div>
  );
}
