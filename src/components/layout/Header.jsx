import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
];

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const navClass = ({ isActive }) =>
    `rounded-xl px-3.5 py-2 text-sm font-semibold transition ${isActive ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`;
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="page-shell flex h-[72px] items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          aria-label="ShopEase home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/25">
            <Sparkles size={18} />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            ShopEase
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => navigate("/shop")}
          className="hidden max-w-sm flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left text-sm text-slate-400 transition hover:border-slate-300 md:flex"
        >
          <Search size={17} />
          <span className="ml-2">Search curated products</span>
          <kbd className="ml-auto rounded border bg-white px-1.5 py-0.5 text-[10px]">
            ⌘ K
          </kbd>
        </button>
        <div className="flex items-center gap-1.5">
          <Link
            to="/cart"
            className="relative rounded-xl p-2.5 text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={20} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white" />
          </Link>
          <button
            onClick={() => navigate("/login")}
            className="hidden ui-button px-4 py-2 sm:inline-flex"
          >
            <UserRound size={16} />
            Sign in
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-slate-100 bg-white px-5 py-4 shadow-xl md:hidden"
          >
            <nav className="page-shell flex flex-col gap-1">
              {links.map((link) => (
                <NavLink
                  onClick={() => setOpen(false)}
                  key={link.to}
                  to={link.to}
                  className={navClass}
                >
                  {link.label}
                </NavLink>
              ))}
              {/* <button
                onClick={() => navigate("/login")}
                className="mt-2 ui-button w-full"
              >
                Sign in
              </button> */}

              <button onClick={() => navigate("/login")}>Sign In</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
export default Header;
