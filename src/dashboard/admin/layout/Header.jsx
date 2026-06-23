import { Bell, UserCircle } from "lucide-react";

function Header() {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <Bell />
        <UserCircle />
      </div>
    </div>
  );
}

export default Header;