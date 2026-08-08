import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SectionTitle({ eyebrow, title }) {
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