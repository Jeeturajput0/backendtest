import {
  LayoutDashboard,
  CreditCard,
  Folder,
  Settings,
  User,
  LogOut,
} from "lucide-react";

export const menu = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    path: "/admin",
  },

  {
    title: "Card Form",
    icon: CreditCard,
    path: "/admin/card-form",
  },

  {
    title: "Card List",
    icon: CreditCard,
    path: "/admin/card-list",
  },

  {
    title: "Category Form",
    icon: Folder,
    path: "/admin/category-form",
  },

  {
    title: "Category List",
    icon: Folder,
    path: "/admin/category-list",
  },

  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },

  {
    title: "Profile",
    icon: User,
    path: "/admin/profile",
  },

  {
    title: "Logout",
    icon: LogOut,
    path: "/logout",
  },
];