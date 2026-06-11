import { Plus } from "lucide-react";

const categories = [
  { category: "Fruits", description: "Fresh and organic fruits", products: 25, status: "Active" },
  { category: "Vegetables", description: "Organic and fresh vegetables", products: 18, status: "Active" },
  { category: "Organic Food", description: "Pure organic food products", products: 32, status: "Active" },
  { category: "Dairy", description: "Organic dairy and milk products", products: 12, status: "Active" },
  { category: "Nuts & Seeds", description: "Healthy nuts and seeds", products: 15, status: "Active" },
  { category: "Beverages", description: "Organic drinks and juices", products: 10, status: "Inactive" }
];

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-4 text-soil">
      <section className="rounded-[20px] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-[1.7rem] font-semibold tracking-[-0.04em] text-soil">Categories</h1>
            <p className="mt-1 text-sm text-soil/70">Manage your product categories.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-[12px] bg-[#ff7b47] px-4 py-2.5 text-sm font-semibold text-white">
            <Plus className="h-4 w-4" />
            Add Category
          </button>
        </div>
      </section>

      <section className="rounded-[20px] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="overflow-hidden rounded-[16px] border border-soil/8">
          <table className="w-full text-left text-[0.82rem]">
            <thead className="bg-[#f8f7f3] text-soil/70">
              <tr>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Products</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((row) => (
                <tr key={row.category} className="border-t border-soil/8">
                  <td className="px-4 py-3 font-medium text-soil">{row.category}</td>
                  <td className="px-4 py-3 text-soil/70">{row.description}</td>
                  <td className="px-4 py-3">{row.products}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${row.status === "Active" ? "bg-[#e5f7e8] text-[#0e8a66]" : "bg-[#fff1df] text-[#ff7b47]"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-soil/70">⋮</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
