import ProductGrid from "./ProductGrid";
import SectionTitle from "./SectionTitle";

export default function FeaturedProducts({ products = [] }) {
  return (
    <section className="bg-slate-50 py-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <SectionTitle
          eyebrow="Chosen for you"
        />

        <ProductGrid products={products} limit={8} />

      </div>
    </section>
  );
}
