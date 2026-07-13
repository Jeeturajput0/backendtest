import {
  ShoppingCart,
  DollarSign,
  Users,
  Package,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here's what's happening in your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Total Revenue</p>
            <h2 className="text-3xl font-bold mt-2">$25,480</h2>
          </div>

          <div className="bg-green-100 p-4 rounded-full">
            <DollarSign className="text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Orders</p>
            <h2 className="text-3xl font-bold mt-2">1,240</h2>
          </div>

          <div className="bg-blue-100 p-4 rounded-full">
            <ShoppingCart className="text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Customers</p>
            <h2 className="text-3xl font-bold mt-2">845</h2>
          </div>

          <div className="bg-purple-100 p-4 rounded-full">
            <Users className="text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Products</p>
            <h2 className="text-3xl font-bold mt-2">320</h2>
          </div>

          <div className="bg-orange-100 p-4 rounded-full">
            <Package className="text-orange-600" />
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Sales Overview
          </h2>

          <div className="h-80 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-400">
            Sales Chart Here
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Top Selling Products
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Nike Shoes</span>
              <span className="font-semibold">250 Sales</span>
            </div>

            <div className="flex justify-between">
              <span>Apple Watch</span>
              <span className="font-semibold">180 Sales</span>
            </div>

            <div className="flex justify-between">
              <span>Leather Bag</span>
              <span className="font-semibold">145 Sales</span>
            </div>

            <div className="flex justify-between">
              <span>Headphones</span>
              <span className="font-semibold">120 Sales</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold">
            Recent Orders
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Order ID</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4">#1001</td>
              <td className="p-4">Ali Khan</td>
              <td className="p-4">$150</td>
              <td className="p-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Delivered
                </span>
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4">#1002</td>
              <td className="p-4">Ahmed</td>
              <td className="p-4">$220</td>
              <td className="p-4">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  Pending
                </span>
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4">#1003</td>
              <td className="p-4">Sara</td>
              <td className="p-4">$90</td>
              <td className="p-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  Processing
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;