import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Edit3, Filter, Plus, Search, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { deleteAdminProduct, fetchAdminProducts, type ApiProduct } from "../api/products";
import { useAdminSessionStore } from "../store/adminSessionStore";
import { formatMoney } from "../utils/money";

function StatusBadge({ product }: { product: ApiProduct }) {
  const label = !product.isActive ? "Inactive" : product.stock <= 25 ? "Low Stock" : "Active";
  const color =
    label === "Active"
      ? "bg-[#e5f7e8] text-[#0e8a66]"
      : label === "Low Stock"
        ? "bg-[#fff2df] text-[#ff9f1a]"
        : "bg-[#f2ede7] text-soil";

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${color}`}>{label}</span>;
}

export default function AdminProductsPage() {
  const token = useAdminSessionStore((state) => state.accessToken);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const productsQuery = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => fetchAdminProducts(token ?? ""),
    enabled: Boolean(token)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAdminProduct(token ?? "", id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    }
  });

  const products = productsQuery.data?.data ?? [];

  return (
    <div className="space-y-4 text-soil">
      <section className="rounded-[20px] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#0e8a66]">Products</p>
            <h1 className="mt-2 text-[1.7rem] font-semibold tracking-[-0.04em] text-soil">Products</h1>
            <p className="mt-1 text-sm text-soil/70">Manage all your products and inventory.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-[12px] border border-soil/8 bg-white px-4 py-2.5 text-sm text-soil shadow-[0_8px_18px_rgba(48,37,29,0.05)]">
              <Download className="h-4 w-4" />
              Export
            </button>
            <Link
              to="/admin/products/add"
              className="inline-flex items-center gap-2 rounded-[12px] bg-[#ff7b47] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(255,123,71,0.18)]"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-[20px] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
          {["All Products", "Active", "Inactive", "Low Stock", "Out of Stock"].map((tab, index) => (
            <button key={tab} className={index === 0 ? "border-b-2 border-[#ff7b47] pb-3 text-[#ff7b47]" : "pb-3 text-soil/60"}>
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_1fr_1fr_auto]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-soil/45" />
            <input
              placeholder="Search products..."
              className="w-full rounded-[12px] border border-soil/8 bg-white py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-soil/35"
            />
          </label>
          <select className="rounded-[12px] border border-soil/8 bg-white px-4 py-2.5 text-sm text-soil outline-none">
            <option>All Categories</option>
          </select>
          <select className="rounded-[12px] border border-soil/8 bg-white px-4 py-2.5 text-sm text-soil outline-none">
            <option>All Status</option>
          </select>
          <button className="inline-flex items-center gap-2 rounded-[12px] border border-soil/8 bg-white px-4 py-2.5 text-sm text-soil">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-[16px] border border-soil/8">
          <table className="w-full text-left text-[0.82rem]">
            <thead className="bg-[#f8f7f3] text-soil/70">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {productsQuery.isLoading ? (
                <tr>
                  <td className="px-4 py-6 text-sm text-soil/60" colSpan={6}>
                    Loading products...
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-t border-soil/8">
                    <td className="px-4 py-3 font-medium text-soil">{product.name}</td>
                    <td className="px-4 py-3 text-soil/70">{product.category}</td>
                    <td className="px-4 py-3">{formatMoney(product.price)}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      <StatusBadge product={product} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-soil/70">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                          className="rounded-[10px] border border-soil/8 p-2 hover:text-[#0e8a66]"
                          aria-label={`Edit ${product.name}`}
                          title={`Edit ${product.name}`}
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            const confirmed = window.confirm(`Delete ${product.name}?`);
                            if (!confirmed) {
                              return;
                            }

                            await deleteMutation.mutateAsync(product.id);
                          }}
                          className="rounded-[10px] border border-soil/8 p-2 hover:text-[#ff7b47]"
                          aria-label={`Delete ${product.name}`}
                          title={`Delete ${product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-soil/60">
          <span>Showing 1 to {products.length} of {products.length} products</span>
          <div className="flex items-center gap-2">
            <button className="rounded-[10px] border border-soil/8 bg-white px-3 py-1.5">1</button>
            <button className="rounded-[10px] border border-soil/8 bg-[#ff7b47] px-3 py-1.5 text-white">2</button>
            <button className="rounded-[10px] border border-soil/8 bg-white px-3 py-1.5">3</button>
            <span>...</span>
            <button className="rounded-[10px] border border-soil/8 bg-white px-3 py-1.5">10</button>
          </div>
        </div>
      </section>
    </div>
  );
}
