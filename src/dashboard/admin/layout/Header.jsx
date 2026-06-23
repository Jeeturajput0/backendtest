const Header = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          alt=""
          className="w-10 h-10 rounded-full"
        />

        <span>Admin</span>
      </div>
    </header>
  );
};

export default Header;