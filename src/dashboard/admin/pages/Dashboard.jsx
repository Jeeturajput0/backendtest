
const Dashboard = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl shadow">
          Categories
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          Cards
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          Users
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          Revenue
        </div>
      </div>
  );
};

export default Dashboard;