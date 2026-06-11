import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCategories, fetchProducts } from "../../api/products";
import ProductCard from "../../components/store/ProductCard";

export default function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const activeCategory = params.get("filter") ?? "all";

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories
  });

  const productsQuery = useQuery({
    queryKey: ["products", activeCategory, deferredQuery],
    queryFn: () =>
      fetchProducts({
        category: activeCategory === "all" ? undefined : activeCategory,
        q: deferredQuery
      })
  });

  const filteredProducts = useMemo(() => productsQuery.data?.data ?? [], [productsQuery.data]);
  const categories = categoriesQuery.data?.data ?? [
    { id: "all" as const, label: "All harvest" },
    { id: "vegetables" as const, label: "Vegetables" },
    { id: "fruits" as const, label: "Fruits" },
    { id: "grains" as const, label: "Grains" },
    { id: "pantry" as const, label: "Pantry" }
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <div className="rounded-[2.4rem] bg-soil p-8 text-cream shadow-soft md:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-cream/45">Organic catalog</p>
        <div className="mt-5 grid gap-7 lg:grid-cols-[1fr_420px] lg:items-end">
          <h1 className="font-display text-5xl font-black tracking-[-0.04em] md:text-7xl">Browse by harvest, mood or meal plan.</h1>
          <label className="relative block">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-soil/45" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search honey, rice, tomato..."
              className="w-full rounded-full border-0 bg-cream py-4 pl-13 pr-5 font-semibold text-soil outline-none ring-2 ring-transparent transition focus:ring-clay"
            />
          </label>
        </div>
      </div>

      <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setParams(category.id === "all" ? {} : { filter: category.id })}
            className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold transition ${
              activeCategory === category.id ? "bg-leaf text-white shadow-card" : "bg-white text-soil/64 hover:text-soil"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {productsQuery.isLoading ? (
        <div className="mt-8 rounded-[2rem] border border-soil/10 bg-white p-8 text-soil/60">Loading products...</div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
