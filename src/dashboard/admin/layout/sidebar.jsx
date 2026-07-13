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
    `flex items-center gap-3 rounded-r-full px-5 py-3 text-lg transition ${
      isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
    }`;

  const subClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-2 transition ${
      isActive ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-72 min-h-screen bg-gray-100 border-r">
      {/* Logo */}
      <div className="p-6">
        <h2 className="text-3xl font-bold">E-Commerces</h2>
        <p className="text-sm uppercase text-gray-500">Admin Panel</p>
      </div>

      <nav className="space-y-2">
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
          className="flex w-full items-center justify-between px-5 py-3 text-lg text-gray-700 hover:bg-gray-100"
        >
          <span className="flex items-center gap-3">
            <Grid />
            Master Data
          </span>

          {masterOpen ? <ChevronUp /> : <ChevronDown />}
        </button>

        {masterOpen && (
          <div className="ml-8 border-l pl-4 space-y-2">
            <NavLink to="/admin/categories" className={subClass}>
              <Tags />
              Categories
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
