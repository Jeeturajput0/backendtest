import { motion } from "framer-motion";
import { Search } from "lucide-react";

export const PageHeader = ({
  eyebrow = "Workspace",
  title,
  description,
  action,
}) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950">
        {title}
      </h1>
      {description && <p className="mt-2 text-slate-500">{description}</p>}
    </div>
    {action}
  </div>
);
export const StatsCard = ({
  label,
  value,
  note,
  icon: Icon,
  tone = "blue",
}) => (
  <motion.article whileHover={{ y: -4 }} className="ui-card p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-extrabold text-slate-950">{value}</p>
      </div>
      {Icon && (
        <span
          className={`rounded-2xl p-3 ${tone === "green" ? "bg-green-50 text-green-600" : tone === "amber" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}
        >
          <Icon size={20} />
        </span>
      )}
    </div>
    {note && <p className="mt-4 text-xs font-bold text-slate-500">{note}</p>}
  </motion.article>
);
export const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <div className="relative">
    <Search
      size={17}
      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
    />
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="ui-input py-2.5 pl-10"
    />
  </div>
);
export const EmptyState = ({
  title = "Nothing here yet",
  description,
  action,
}) => (
  <div className="ui-card grid min-h-72 place-items-center p-8 text-center">
    <div>
      <div className="mx-auto h-12 w-12 rounded-2xl bg-blue-50" />
      <h2 className="mt-4 text-lg font-extrabold">{title}</h2>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  </div>
);
