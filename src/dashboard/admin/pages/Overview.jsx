function Overview() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          Total Cards: 10
        </div>

        <div className="bg-white p-4 rounded shadow">
          Categories: 5
        </div>

        <div className="bg-white p-4 rounded shadow">
          Users: 2
        </div>
      </div>
    </div>
  );
}

export default Overview;