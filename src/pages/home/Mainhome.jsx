import { useEffect, useState } from "react";
import {
  ArrowRight,
  Heart,
  Mail,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_URI, setImageURL } from "../../config";
import TopSlider from "./TopSlider";
import ProductGrid from "./ProductGrid";

const productImage = (product) =>
  product?.image
    ? setImageURL(product.image)
    : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800";


<ProductGrid/>
function SectionTitle({ eyebrow, title }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
      </div>
      <Link
        to="/shop"
        className="hidden text-sm font-semibold text-indigo-600 sm:block"
      >
        View all <ArrowRight className="inline" size={15} />
      </Link>
    </div>
  );
}

export default function Mainhome() {
  const [home, setHome] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_URI}/home`)
      .then(async (res) => {
        const result = await res.json();
        if (!res.ok || !result.success)
          throw new Error(result.message );
        setHome(result.data);
      })
      .catch((error) => setLoadError(error.message));
  }, []);
  const subscribe = async (event) => {
    event.preventDefault();
    const res = await fetch(`${API_URI}/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const result = await res.json();
    setMessage(result.message);
    if (result.success) setEmail("");
  };
  if (loadError)
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Home page load nahi ho paaya backend not working
          </h1>
          <p className="mt-2 text-slate-500">{loadError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  if (!home) return <div className="min-h-screen animate-pulse bg-slate-50" />;
  const hero = home.heroBanners?.[0];
  const offer = home.offer;
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative min-h-[500px] bg-slate-900">
        <img
          src={hero ? setImageURL(hero.image) : productImage()}
          alt={hero?.title || "ShopEase collection"}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-6 py-20 lg:px-8">
          <div className="max-w-2xl text-white">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[.18em] text-indigo-200">
              <Sparkles size={16} /> Curated for you
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
              Shop now <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <TopSlider categories={home.topCategories} setImageURL={setImageURL} />
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionTitle
          eyebrow="Explore collections"
          title="Featured Categories"
        />
        
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {home.featuredCategories?.map((item) => (
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
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionTitle eyebrow="Chosen for you" title="Featured Products" />
          <ProductGrid products={home.featuredProducts || []} />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-8 py-14 text-white sm:px-14">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-100">
            Limited-time offer
          </p>
          <h2 className="mt-3 text-4xl font-extrabold">
            {offer
              ? `${offer.discount}% off — ${offer.name}`
              : "Special savings on selected products"}
          </h2>
          <Link
            to="/shop"
            className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-indigo-700"
          >
            Shop the offer
          </Link>
        </div>
      </section>
      {/* <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionTitle eyebrow="Just added" title="New Arrivals" />
        <ProductGrid products={home.newArrivals || []} />
      </section> */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionTitle
            eyebrow="Customer favourites"
            title="Best Selling Products"
          />
          <ProductGrid products={home.bestSellingProducts || []} />
        </div>
      </section>
      <section className="bg-rose-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionTitle eyebrow="Ends soon" title="Flash Sale" />
          <ProductGrid products={home.flashSaleProducts || []} sale />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionTitle eyebrow="Loved by shoppers" title="Customer Reviews" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {home.reviews?.map((review) => (
            <article
              key={review._id}
              className="rounded-2xl border border-slate-100 p-6 shadow-sm"
            >
              <div className="flex text-amber-400">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} size={17} fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 leading-7 text-slate-600">“{review.review}”</p>
              <p className="mt-5 font-bold text-slate-900">{review.customer}</p>
              <p className="text-sm text-slate-400">{review.product}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Mail className="mx-auto text-indigo-300" />
          <h2 className="mt-4 text-3xl font-bold">Get offers in your inbox</h2>
          <p className="mt-3 text-slate-300">
            Subscribe for new arrivals, flash sales and member-only deals.
          </p>
          <form
            onSubmit={subscribe}
            className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-xl px-4 py-3 text-slate-900 outline-none"
            />
            <button className="rounded-xl bg-indigo-500 px-5 py-3 font-bold hover:bg-indigo-400">
              Subscribe
            </button>
          </form>
          {message && <p className="mt-3 text-sm text-indigo-200">{message}</p>}
        </div>
      </section>
    </main>
  );
}
