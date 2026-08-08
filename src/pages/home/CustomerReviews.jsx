import { Star } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function CustomerReviews({ reviews = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionTitle
        eyebrow="Loved by shoppers"
        title="Customer Reviews"
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={review._id}
            className="rounded-2xl border border-slate-100 p-6 shadow-sm"
          >
            <div className="flex text-amber-400">
              {Array.from({ length: review.rating }).map((_, index) => (
                <Star
                  key={index}
                  size={17}
                  fill="currentColor"
                />
              ))}
            </div>

            <p className="mt-4 leading-7 text-slate-600">
              “{review.review}”
            </p>

            <p className="mt-5 font-bold text-slate-900">
              {review.customer}
            </p>

            <p className="text-sm text-slate-400">
              {review.product}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}