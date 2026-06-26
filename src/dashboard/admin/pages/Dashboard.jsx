export default function Dashboard() {
  const cards = [
    { title: "Products", value: "1,250" },
    { title: "Orders", value: "856" },
    { title: "Revenue", value: "$25,400" },
    { title: "Users", value: "3,120" },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((item) => (
        <div
          key={item.title}
          className="bg-white p-6 rounded-2xl shadow-sm"
        >
          <p className="text-gray-500">
            {item.title}
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {item.value}
          </h3>
        </div>
      ))}
    </div>
  );
}