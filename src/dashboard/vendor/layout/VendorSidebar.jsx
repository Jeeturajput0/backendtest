import { Box, LayoutDashboard, LogOut, Package, ShoppingCart, Store, UserRound } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const VendorSidebar = () => {
  const navigate = useNavigate();
  const mainMenu = [
    { label: "Dashboard", to: "/vendor", icon: LayoutDashboard, end: true },
    { label: "My Products", to: "/vendor/products", icon: Package },
    { label: "Orders", to: "/vendor/orders", icon: ShoppingCart },
  ];
  const manageMenu = [{ label: "Shop Profile", to: "/vendor/profile", icon: Store }, { label: "Customers", to: "/vendor/customers", icon: UserRound }];
  const itemClass = ({ isActive }) => `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25" : "text-slate-500 hover:bg-blue-50 hover:text-blue-700"}`;
  const logout = () => { localStorage.removeItem("token"); localStorage.removeItem("role"); localStorage.removeItem("userdetails"); navigate("/login"); };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-[86px] items-center gap-3 border-b border-slate-100 px-6">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30"><Box size={21} /></span>
        <div><p className="text-lg font-extrabold tracking-tight text-slate-950">CommerceHub</p><p className="text-xs font-medium text-slate-400">Vendor workspace</p></div>
      </div>
      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
        <section><p className="mb-3 px-3 text-[11px] font-extrabold uppercase tracking-[.16em] text-slate-400">Overview</p><div className="space-y-1">{mainMenu.map(({ label, to, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={itemClass}><Icon size={19} />{label}</NavLink>)}</div></section>
        <section><p className="mb-3 px-3 text-[11px] font-extrabold uppercase tracking-[.16em] text-slate-400">Management</p><div className="space-y-1">{manageMenu.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} className={itemClass}><Icon size={19} />{label}</NavLink>)}</div></section>
      </nav>
      <div className="border-t border-slate-100 p-4"><button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"><LogOut size={19} />Sign out</button></div>
    </aside>
  );
};

export default VendorSidebar;
