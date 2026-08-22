import ProductGrid from "./ProductGrid";
import SectionTitle from "./SectionTitle";

export default function BestSellingProducts({ products = [] }) {
  return (
    <section className="bg-slate-50 py-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle
          eyebrow="Customer favourites"
          title="Best Selling Products"
        />

        <ProductGrid products={products} />
      </div>
    </section>
  );
}