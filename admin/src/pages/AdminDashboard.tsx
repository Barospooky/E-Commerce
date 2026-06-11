import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BarChart3, Boxes, CircleDollarSign, PackageSearch, Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { createAdminProduct, deleteAdminProduct, fetchAdminProducts, type AdminProductInput } from "../api/products";
import { useAdminSessionStore } from "../store/adminSessionStore";
import { formatMoney } from "../utils/money";

type AdminProductFormState = Omit<AdminProductInput, "slug"> & { slug: string };

const emptyForm: AdminProductFormState = {
  name: "",
  slug: "",
  category: "vegetables",
  price: 0,
  mrp: 0,
  unit: "1 kg",
  rating: 4.5,
  stock: 0,
  badge: "New",
  image: "",
  color: "#0e8a66",
  description: "",
  tags: [],
  isActive: true
};

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const token = useAdminSessionStore((state) => state.accessToken);
  const [form, setForm] = useState<AdminProductFormState>(emptyForm);

  const productsQuery = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => fetchAdminProducts(token ?? ""),
    enabled: Boolean(token)
  });

  const createMutation = useMutation({
    mutationFn: (input: AdminProductInput) => createAdminProduct(token ?? "", input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["product"] });
      setForm(emptyForm);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAdminProduct(token ?? "", id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["product"] });
    }
  });

  const products = productsQuery.data?.data ?? [];
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createMutation.mutateAsync({
      ...form,
      slug: form.slug.trim() ? form.slug.trim() : undefined,
      price: Number(form.price),
      mrp: Number(form.mrp),
      rating: Number(form.rating),
      stock: Number(form.stock),
      tags: form.tags.filter(Boolean)
    });
  }

  return (
    <div className="space-y-6 py-2">
      <header className="flex flex-col justify-between gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-moss">Admin control room</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-5xl">Storefront management</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-cream/65">
            Create products here and they will show up in the client product pages because both sides use the same API.
          </p>
        </div>
        <a href="/" className="rounded-full bg-cream px-5 py-3 text-sm font-bold text-soil">
          Open storefront
        </a>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.07] p-5">
          <CircleDollarSign className="h-6 w-6 text-moss" />
          <p className="mt-5 text-sm text-cream/48">Revenue</p>
          <p className="mt-1 text-3xl font-bold">{formatMoney(284500)}</p>
        </div>
        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.07] p-5">
          <PackageSearch className="h-6 w-6 text-moss" />
          <p className="mt-5 text-sm text-cream/48">Products</p>
          <p className="mt-1 text-3xl font-bold">{products.length}</p>
        </div>
        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.07] p-5">
          <Boxes className="h-6 w-6 text-moss" />
          <p className="mt-5 text-sm text-cream/48">Total stock</p>
          <p className="mt-1 text-3xl font-bold">{totalStock}</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add product</h2>
            <Plus className="h-5 w-5 text-moss" />
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Product name"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={form.slug}
                onChange={(event) => setForm({ ...form, slug: event.target.value })}
                placeholder="Slug"
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
              />
              <select
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value as AdminProductInput["category"] })}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
              >
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="grains">Grains</option>
                <option value="pantry">Pantry</option>
              </select>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <input
                type="number"
                value={form.price}
                onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
                placeholder="Price"
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
              />
              <input
                type="number"
                value={form.mrp}
                onChange={(event) => setForm({ ...form, mrp: Number(event.target.value) })}
                placeholder="MRP"
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
              />
              <input
                type="number"
                value={form.stock}
                onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })}
                placeholder="Stock"
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={form.unit}
                onChange={(event) => setForm({ ...form, unit: event.target.value })}
                placeholder="Unit"
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
              />
              <input
                value={form.badge}
                onChange={(event) => setForm({ ...form, badge: event.target.value })}
                placeholder="Badge"
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
              />
            </div>
            <input
              type="url"
              value={form.image}
              onChange={(event) => setForm({ ...form, image: event.target.value })}
              placeholder="Image URL"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
            />
            <input
              value={form.color}
              onChange={(event) => setForm({ ...form, color: event.target.value })}
              placeholder="Brand color"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
            />
            <textarea
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              placeholder="Product description"
              rows={4}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
            />
            <input
              value={form.tags.join(", ")}
              onChange={(event) =>
                setForm({
                  ...form,
                  tags: event.target.value.split(",").map((tag) => tag.trim())
                })
              }
              placeholder="Tags separated by commas"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
            />
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-2xl bg-[#0e8a66] px-4 py-3 font-semibold text-white transition hover:bg-[#0c7256] disabled:opacity-60"
            >
              {createMutation.isPending ? "Saving..." : "Create product"}
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Catalog preview</h2>
            <BarChart3 className="h-5 w-5 text-moss" />
          </div>
          <div className="mt-6 space-y-4">
            {productsQuery.isLoading && <p className="text-sm text-cream/60">Loading products...</p>}
            {products.map((product) => (
              <div
                key={product.id}
                className="grid items-center gap-4 rounded-[1.4rem] bg-black/18 p-4 md:grid-cols-[72px_1fr_auto]"
              >
                <img src={product.image} alt={product.name} className="h-18 w-18 rounded-2xl object-cover" />
                <div>
                  <p className="font-bold">{product.name}</p>
                  <p className="text-sm text-cream/45">
                    {product.category} - {product.stock} in stock - {product.isActive ? "Active" : "Hidden"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-moss/15 px-4 py-2 text-sm font-bold text-moss">
                    {formatMoney(product.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteMutation.mutate(product.id)}
                    className="rounded-full border border-white/10 p-2 text-cream/70 transition hover:bg-white/10 hover:text-white"
                    aria-label={`Delete ${product.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
