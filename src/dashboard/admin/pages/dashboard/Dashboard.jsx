import {
  ShoppingCart,
  DollarSign,
  Users,
  Package,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-7">
      {/* Page Heading */}
      <div>
        <p className="text-sm font-bold uppercase tracking-[.16em] text-indigo-600">Analytics</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-slate-500">
          Welcome back! Here's what's happening in your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="ui-card flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Revenue</p><h2 className="mt-2 text-2xl font-extrabold">$25,480</h2><p className="mt-1 text-xs font-semibold text-emerald-600">↑ 12.5% this month</p>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-3.5">
            <DollarSign className="text-green-600" />
          </div>
        </div>

        <div className="ui-card flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium text-slate-500">Orders</p><h2 className="mt-2 text-2xl font-extrabold">1,240</h2><p className="mt-1 text-xs font-semibold text-emerald-600">↑ 8.2% this month</p>
          </div>

          <div className="rounded-2xl bg-indigo-50 p-3.5">
            <ShoppingCart className="text-blue-600" />
          </div>
        </div>

        <div className="ui-card flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium text-slate-500">Customers</p><h2 className="mt-2 text-2xl font-extrabold">845</h2><p className="mt-1 text-xs font-semibold text-emerald-600">↑ 5.1% this month</p>
          </div>

          <div className="rounded-2xl bg-violet-50 p-3.5">
            <Users className="text-purple-600" />
          </div>
        </div>

        <div className="ui-card flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium text-slate-500">Products</p><h2 className="mt-2 text-2xl font-extrabold">320</h2><p className="mt-1 text-xs font-semibold text-slate-500">18 low-stock items</p>
          </div>

          <div className="rounded-2xl bg-amber-50 p-3.5">
            <Package className="text-orange-600" />
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Chart Placeholder */}
        <div className="ui-card lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">
            Sales Overview
          </h2>

          <div className="relative mt-6 flex h-72 items-end gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-white px-6 pb-7 pt-12">
            {[36,52,42,68,54,82,65,92,72,88,78,100].map((height,index)=><div key={index} className="group flex h-full flex-1 items-end"><div style={{height:`${height}%`}} className="w-full rounded-t-md bg-gradient-to-t from-indigo-600 to-violet-400 transition group-hover:from-violet-600 group-hover:to-indigo-400"/></div>)}<div className="absolute left-6 top-5 text-sm font-semibold text-indigo-700">Revenue trend · Jul 2026</div>
          </div>
        </div>

        {/* Top Products */}
        <div className="ui-card p-6">
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
      <div className="ui-table-wrap">
        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold">
            Recent Orders
          </h2>
        </div>

        <table className="ui-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
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
