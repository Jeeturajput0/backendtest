import ProductGrid from "./ProductGrid";
import SectionTitle from "./SectionTitle";

export default function FlashSale({ products = [] }) {
  return (
    <section className="bg-slate-50 py-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle eyebrow="Ends soon" title="Flash Sale" />

        <ProductGrid products={products} sale />
      </div>
    </section>
  );
}