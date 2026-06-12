import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../api/products";
import ProductCard from "../../components/store/ProductCard";

const categoryMeta = {
  fruits: {
    title: "Fresh & Organic Fruits",
    subtitle: "Handpicked fruits packed with nutrition and natural sweetness.",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1400&q=80"
  },
  vegetables: {
    title: "Farm Fresh Vegetables",
    subtitle: "Crisp, colorful vegetables from trusted organic farms.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80"
  },
  grains: {
    title: "Wholesome Ancient Grains",
    subtitle: "Staples rich in fiber, flavor, and slow-release energy.",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e1?auto=format&fit=crop&w=1400&q=80"
  },
  pantry: {
    title: "Pantry Essentials",
    subtitle: "Cold-pressed oils, teas, honey, and everyday healthy basics.",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1400&q=80"
  }
} as const;

export default function CategoryPage() {
  const { category = "fruits" } = useParams();

  const productsQuery = useQuery({
    queryKey: ["category-products", category],
    queryFn: () => fetchProducts({ category })
  });

  const meta = useMemo(
    () => categoryMeta[category as keyof typeof categoryMeta] ?? categoryMeta.fruits,
    [category]
  );

  const products = productsQuery.data?.data ?? [];

  return (
    <section className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-sm text-soil/50">Home &gt; {meta.title}</div>
      <div className="mt-4 overflow-hidden rounded-[2rem] bg-white shadow-[0_12px_30px_rgba(48,37,29,0.06)]">
        <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
          <div className="px-6 py-8 sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0e8a66]">Category spotlight</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-soil sm:text-5xl">{meta.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-soil/62">{meta.subtitle}</p>
            <p className="mt-6 text-sm text-soil/52">Showing 1-{products.length} of {products.length} products</p>
          </div>
          <div className="h-full min-h-[240px]">
            <img src={meta.image} alt={meta.title} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
