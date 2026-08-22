import { Link } from "react-router-dom";

export default function OfferBanner({ offer }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
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
  );
}