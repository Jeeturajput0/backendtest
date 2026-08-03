import { Package, Plus, ShoppingBag, Store } from "lucide-react";
import { Link } from "react-router-dom";

export default function VendorDashboard() {
  const user = JSON.parse(localStorage.getItem("userdetails") || "{}");
  return (
    <div className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-6xl space-y-7">
        <section className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-emerald-300">
            Vendor workspace
          </p>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Welcome{user.name ? `, ${user.name}` : ""}.
          </h1>
          <p className="mt-2 max-w-xl text-slate-300">
            Manage the products you sell and keep your catalogue ready for
            customers.
          </p>
          <Link
            to="/vendor/products/add"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 hover:bg-emerald-400"
          >
            <Plus size={18} /> Add product
          </Link>
        </section>
        <section className="grid gap-4 sm:grid-cols-3">
          {[
            [Package, "My products", "Create and manage only your products."],
            [
              ShoppingBag,
              "Orders",
              "Order management will appear here as sales arrive.",
            ],
            [Store, "Store profile", "Keep your vendor details current."],
          ].map(([Icon, title, text]) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Icon className="text-emerald-600" />
              <h2 className="mt-4 text-lg font-extrabold text-slate-900">
                {title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{text}</p>
            </article>
          ))}
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold">Product management</h2>
              <p className="mt-1 text-sm text-slate-500">
                Products in this area are automatically scoped to your vendor
                account.
              </p>
            </div>
            <Link
              to="/vendor/products"
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-700"
            >
              View products
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
