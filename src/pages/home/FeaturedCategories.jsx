import { Link } from "react-router-dom";
import { setImageURL } from "../../config";
import SectionTitle from "./SectionTitle";

export default function FeaturedCategories({ categories = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionTitle
        eyebrow="Explore collections"
        title="Featured Categories"
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((item) => (
          <Link
            key={item._id}
            to={`/shop?category=${item._id}`}
            className="group relative h-60 overflow-hidden rounded-2xl bg-slate-900"
          >
            <img
              src={setImageURL(item.image)}
              alt={item.title}
              className="h-full w-full object-cover opacity-70 transition group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 p-6 text-xl font-bold text-white">
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}