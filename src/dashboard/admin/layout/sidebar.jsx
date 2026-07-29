import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Book,
  ChevronDown,
  ChevronUp,
  CircleArrowOutUpLeft,
  CreditCard,
  FileText,
  Gift,
  Grid,
  Grid2X2Check,
  Image,
  Settings,
  ShoppingCart,
  Star,
  StretchHorizontal,
    Tags,
  User,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const [masterOpen, setMasterOpen] = useState(true);

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
      isActive ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
    }`;

  const subClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
      isActive ? "bg-indigo-50 font-semibold text-indigo-700" : "text-slate-500 hover:bg-slate-50"
    }`;

  return (
    <aside className="min-h-screen w-72 bg-white px-4 py-5">
      {/* Logo */}
      <div className="px-3 pb-8 pt-2">
        <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 font-bold text-white">S</div><div><h2 className="text-lg font-extrabold tracking-tight text-slate-900">ShopEase</h2><p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Admin workspace</p></div></div>
      </div>

      <nav className="space-y-1">
        <NavLink to="/admin/dashboard" className={navClass}>
          <Grid2X2Check />
          Overview
        </NavLink>

        <NavLink to="/admin/products" className={navClass}>
          <Book />
          Products
        </NavLink>

        <NavLink to="/admin/orders" className={navClass}>
          <ShoppingCart />
          Orders
        </NavLink>

        <NavLink to="/admin/payments" className={navClass}>
          <CreditCard />
          Payments
        </NavLink>

        <NavLink to="/admin/profile" className={navClass}>
          <User />
          Profile
        </NavLink>

        <NavLink to="/admin/users" className={navClass}>
          <Users />
          Users
        </NavLink>

        <NavLink to="/admin/vendors" className={navClass}>
          <Users />
          Vendors
        </NavLink>

        <NavLink to="/admin/settings" className={navClass}>
          <Settings />
          Settings
        </NavLink>

        {/* Master Data */}

        <button
          onClick={() => setMasterOpen(!masterOpen)}
          className="mt-4 flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          <span className="flex items-center gap-3">
            <Grid />
            Master Data
          </span>

          {masterOpen ? <ChevronUp /> : <ChevronDown />}
        </button>

        {masterOpen && (
          <div className="ml-5 mt-1 space-y-1 border-l border-slate-200 pl-3">
            <NavLink to="/admin/categories" className={subClass}>
              <Tags />
              Categories
            </NavLink>

            <NavLink to="/admin/brand" className={subClass}>
              <Book />
              Brands
            </NavLink>

            <NavLink to="/admin/reviews" className={subClass}>
              <Star />
              Reviews
            </NavLink>

            <NavLink to="/admin/coupons" className={subClass}>
              <Gift />
              Coupons
            </NavLink>

            <NavLink to="/admin/offers" className={subClass}>
              <FileText />
              Offers
            </NavLink>

            <NavLink to="/admin/colors" className={subClass}>
              <CircleArrowOutUpLeft />
              Colors
            </NavLink>

            <NavLink to="/admin/sizes" className={subClass}>
              <StretchHorizontal/>
              Sizes
            </NavLink>

            <NavLink to="/admin/banners" className={subClass}>
              <Image />
              Banners
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
