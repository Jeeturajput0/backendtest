import { Bell, Command, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URI } from "../../../config";

export default function Navbar({ onMenuClick }) {
  const [profile, setProfile] = useState({ name: "Admin", email: "" });
  useEffect(() => {
    const load = () =>
      fetch(`${API_URI}/admin/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => data.success && setProfile(data.data))
        .catch(() => {});
    load();
    window.addEventListener("profile-updated", load);
    return () => window.removeEventListener("profile-updated", load);
  }, []);
  const avatar =
    profile.avatar ||
    `https://ui-avatars.com/api/?background=f97316&color=fff&bold=true&name=${encodeURIComponent(profile.name || "Admin")}`;
  return (
    <header className="sticky top-0 z-40 border-b XFborder-slate-200/80 bg-[#F8FAFC]/85 backdrop-blur-xl">
      <div className="flex h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-xl p-2 text-slate-600 hover:bg-white lg:hidden"
          >
            <Menu size={21} />
          </button>
          <div>
            <p className="hidden text-xs font-bold uppercase tracking-[.16em] text-blue-600 sm:block">
              ShopEase workspace
            </p>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl">
              Store overview
            </h1>
          </div>
        </div>
        <button className="hidden w-full max-w-sm items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left text-sm text-slate-400 shadow-sm transition hover:border-slate-300 md:flex">
          <Search size={17} />
          <span className="ml-2">Search orders, products...</span>
          <span className="ml-auto flex items-center gap-1 rounded-md border bg-slate-50 px-1.5 py-0.5 text-[10px]">
            <Command size={10} />K
          </span>
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="relative rounded-xl border border-transparent p-2.5 text-slate-600 transition hover:border-slate-200 hover:bg-white">
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[#F8FAFC]" />
          </button>
          <div className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-2 transition hover:bg-white sm:gap-3">
            <img
              src={avatar}
              alt={profile.name}
              className="h-9 w-9 rounded-lg object-cover shadow-sm"
            />
            <div className="hidden sm:block">
              <p className="max-w-28 truncate text-sm font-bold text-slate-800">
                {profile.name || "Admin"}
              </p>
              <p className="max-w-28 truncate text-xs text-slate-500">
                {profile.email || "Administrator"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
