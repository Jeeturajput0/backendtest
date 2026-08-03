import { motion } from "framer-motion";
import {
  Book,
  ChevronDown,
  ChevronUp,
  CircleArrowOutUpLeft,
  CreditCard,
  FileText,
  Gift,
  Grid2X2Check,
  Image,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Sparkles,
  Star,
  StretchHorizontal,
  Tags,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const primary = [
  [Grid2X2Check, "Overview", "/admin/dashboard"],
  [Package, "Products", "/admin/products"],
  [ShoppingCart, "Orders", "/admin/orders"],
  [CreditCard, "Payments", "/admin/payments"],
  [Users, "Customers", "/admin/users"],
  [Users, "Vendors", "/admin/vendors"],
  [User, "Profile", "/admin/profile"],
  [Settings, "Settings", "/admin/settings"],
];
const master = [
  [Tags, "Categories", "/admin/categories"],
  [Book, "Brands", "/admin/brand"],
  [Star, "Reviews", "/admin/reviews"],
  [Gift, "Coupons", "/admin/coupons"],
  [FileText, "Offers", "/admin/offers"],
  [CircleArrowOutUpLeft, "Colors", "/admin/colors"],
  [StretchHorizontal, "Sizes", "/admin/sizes"],
  [Image, "Banners", "/admin/banners"],
];
const Sidebar = ({ onNavigate }) => {
  const [masterOpen, setMasterOpen] = useState(true);
  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${isActive ? "bg-white text-slate-950 shadow-xl shadow-black/10" : "text-slate-400 hover:bg-white/8 hover:text-white"}`;
  const navigate = useNavigate();
  const logout = () => {
    ["token", "role", "userdetails"].forEach((key) => localStorage.removeItem(key));
    navigate("/login", { replace: true });
  };
  return (
    <aside className="min-h-full px-4 py-5 text-white">
      <div className="flex items-center gap-3 px-3 pb-8 pt-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/25">
          <Sparkles size={19} />
        </div>
        <div>
          <h2 className="text-lg font-extrabold tracking-tight">ShopEase</h2>
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">
            Command center
          </p>
        </div>
      </div>
      <nav className="space-y-1">
        {primary.map(([Icon, label, to], i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <NavLink onClick={onNavigate} to={to} className={navClass}>
              <Icon size={18} />
              {label}
            </NavLink>
          </motion.div>
        ))}
        <button
          onClick={() => setMasterOpen(!masterOpen)}
          className="mt-5 flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-400 transition hover:bg-white/8 hover:text-white"
        >
          <span>Catalog & content</span>
          {masterOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
        </button>
        {masterOpen && (
          <div className="ml-3 space-y-1 border-l border-white/10 pl-3">
            {master.map(([Icon, label, to]) => (
              <NavLink
                onClick={onNavigate}
                key={to}
                to={to}
                className={navClass}
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
          Store health
        </p>
        <p className="mt-2 text-sm font-semibold">
          Everything is running smoothly.
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[88%] rounded-full bg-linear-to-r from-blue-400 to-sky-300" />
        </div>
      </div>
      <button onClick={logout} className="mt-5 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-400 transition hover:bg-white/8 hover:text-white">
        <LogOut size={17} />
        Sign out
      </button>
    </aside>
  );
};
export default Sidebar;
