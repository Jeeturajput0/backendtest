import ProductGrid from "./ProductGrid";
import SectionTitle from "./SectionTitle";

export default function FeaturedProducts() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <SectionTitle
          eyebrow="Chosen for you"
          title="Featured Products"
        />

        <ProductGrid />

      </div>
    </section>
  );
}