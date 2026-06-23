function CategoryList() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Category List
      </h2>

      <table className="w-full bg-white shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Category</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-2">1</td>
            <td className="p-2">Technology</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;