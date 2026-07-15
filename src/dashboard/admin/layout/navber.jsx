import { Search, Bell, User, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
          <Menu size={22} />
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-96">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 w-full text-sm"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <Bell size={22} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              Admin
            </p>
            <p className="text-xs text-gray-500">
              admin@example.com
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;