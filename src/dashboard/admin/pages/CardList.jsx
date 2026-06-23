function CardList() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Card List</h2>

      <table className="w-full bg-white shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-2">1</td>
            <td className="p-2">Visa Card</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CardList;