import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="ShopEase home"
        >
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            ShopEase
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden max-w-xs flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <Search size={17} className="text-slate-400" />
          <input
            className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            placeholder="Search products"
          />
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/shop"
            className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
            aria-label="Shop"
          >
            <ShoppingBag size={20} />
          </Link>
          <button
            onClick={() => navigate("/login")}
            className="hidden sm:inline-flex ui-button px-4 py-2"
          >
            <UserRound size={17} /> Sign in
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                onClick={() => setOpen(false)}
                key={link.to}
                to={link.to}
                className="rounded-lg px-3 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => navigate("/login")}
              className="mt-1 ui-button"
            >
              Sign in
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
export default Header;
