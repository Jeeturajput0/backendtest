import { useState } from "react";
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  CreditCard,
  User,
  Users,
  Store,
  Settings,
  Boxes,
  Tag,
  Star,
  TicketPercent,
  FileText,
  Palette,
  Ruler,
  Image,
  ChevronDown,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside className="w-72 min-h-screen bg-white border-r">
      <div className="p-6">
        <h1 className="text-4xl font-bold text-slate-800">
          E-Commerces
        </h1>

        <p className="text-sm text-slate-400">
          ADMIN PANEL
        </p>
      </div>

      <div className="px-3">
        <MenuItem
          active
          icon={<LayoutGrid size={20} />}
          title="Overview"
        />

        <MenuItem
          icon={<Package size={20} />}
          title="Products"
        />

        <MenuItem
          icon={<ShoppingCart size={20} />}
          title="Orders"
        />

        <MenuItem
          icon={<CreditCard size={20} />}
          title="Payments"
        />

        <MenuItem
          icon={<User size={20} />}
          title="Profile"
        />

        <MenuItem
          icon={<Users size={20} />}
          title="Users"
        />

        <MenuItem
          icon={<Store size={20} />}
          title="Vendors"
        />

        <MenuItem
          icon={<Settings size={20} />}
          title="Settings"
        />

        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center px-4 py-4 rounded-xl hover:bg-gray-100"
        >
          <div className="flex gap-3 items-center">
            <Boxes size={20} />
            <span>Master Data</span>
          </div>

          <ChevronDown
            size={18}
            className={`transition ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="ml-8 border-l pl-5 mt-2 space-y-2">
           <Link>
           <SubMenu
              icon={<Tag size={18} />}
              title="Categories"
              
            /></Link> 

            <SubMenu
              icon={<Star size={18} />}
              title="Reviews"
            />

            <SubMenu
              icon={<TicketPercent size={18} />}
              title="Coupons"
            />

            <SubMenu
              icon={<FileText size={18} />}
              title="Offers"
            />

            <SubMenu
              icon={<Palette size={18} />}
              title="Colors"
            />

            <SubMenu
              icon={<Ruler size={18} />}
              title="Sizes"
            />

            <SubMenu
              icon={<Image size={18} />}
              title="Banners"
            />
          </div>
        )}
      </div>
    </aside>
  );
}

function MenuItem({ icon, title, active }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl mb-2
      ${
        active
          ? "bg-blue-600 text-white"
          : "hover:bg-gray-100 text-slate-700"
      }`}
    >
      {icon}
      {title}
    </button>
  );
}

function SubMenu({ icon, title }) {
  return (
    <button className="flex items-center gap-3 py-3 text-slate-500 hover:text-blue-600">
      {icon}
      {title}
    </button>
  );
}