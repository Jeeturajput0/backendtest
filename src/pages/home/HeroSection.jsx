import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { setImageURL } from "../../config";

const defaultImage =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800";

export default function HeroSection({ hero }) {
  return (
    <section className="relative min-h-[500px] bg-slate-900">
      <img
        src={hero ? setImageURL(hero.image) : defaultImage}
        alt={hero?.title || "ShopEase collection"}
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />

      <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-6 py-20 lg:px-8">
        <div className="max-w-2xl text-white">
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[.18em] text-indigo-200">
            <Sparkles size={16} />
            Curated for you
          </p>

          <h1 className="mt-5 text-5xl font-extrabold tracking-tight sm:text-6xl">
            {hero?.title || "Discover your next favourite"}
          </h1>

          <p className="mt-5 max-w-lg text-lg text-slate-200">
            Fresh styles, trusted brands and everyday essentials—all in one
            place.
          </p>

          <Link
            to={hero?.link || "/shop"}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-900 transition hover:bg-indigo-50"
          >
            Shop now
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}