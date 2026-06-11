import { Download, Filter, Search } from "lucide-react";

const inventory = [
  { product: "Organic Bananas", sku: "SKU123", category: "Fruits", stock: 120, reserved: 10, available: 110, reorder: 20, status: "In Stock" },
  { product: "Organic Apples", sku: "SKU124", category: "Fruits", stock: 85, reserved: 5, available: 80, reorder: 15, status: "In Stock" },
  { product: "Organic Spinach", sku: "SKU125", category: "Vegetables", stock: 45, reserved: 5, available: 40, reorder: 10, status: "Low Stock" },
  { product: "Organic Milk", sku: "SKU126", category: "Dairy", stock: 60, reserved: 10, available: 50, reorder: 15, status: "In Stock" },
  { product: "Organic Honey", sku: "SKU127", category: "Organic Food", stock: 30, reserved: 0, available: 30, reorder: 5, status: "Low Stock" },
  { product: "Organic Almonds", sku: "SKU128", category: "Nuts", stock: 25, reserved: 5, available: 20, reorder: 5, status: "Low Stock" }
];

function Badge({ label }: { label: string }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${label === "Low Stock" ? "bg-[#fff1df] text-[#ff9f1a]" : "bg-[#e5f7e8] text-[#0e8a66]"}`}>{label}</span>;
}

export default function AdminInventoryPage() {
  return (
    <div className="space-y-4 text-soil">
      <section className="rounded-[20px] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-[1.7rem] font-semibold tracking-[-0.04em] text-soil">Inventory</h1>
            <p className="mt-1 text-sm text-soil/70">Track stock levels and manage inventory.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-[12px] border border-soil/8 bg-white px-4 py-2.5 text-sm text-soil">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </section>

      <section className="rounded-[20px] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr_1fr_auto]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-soil/45" />
            <input placeholder="Search inventory..." className="w-full rounded-[12px] border border-soil/8 px-10 py-2.5 text-sm outline-none" />
          </label>
          <select className="rounded-[12px] border border-soil/8 bg-white px-4 py-2.5 text-sm outline-none">
            <option>All Categories</option>
          </select>
          <select className="rounded-[12px] border border-soil/8 bg-white px-4 py-2.5 text-sm outline-none">
            <option>Stock Status</option>
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
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Reserved</th>
                <th className="px-4 py-3 font-medium">Available</th>
                <th className="px-4 py-3 font-medium">Reorder Level</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((row) => (
                <tr key={row.sku} className="border-t border-soil/8">
                  <td className="px-4 py-3 font-medium text-soil">{row.product}</td>
                  <td className="px-4 py-3 text-soil/70">{row.sku}</td>
                  <td className="px-4 py-3 text-soil/70">{row.category}</td>
                  <td className="px-4 py-3">{row.stock}</td>
                  <td className="px-4 py-3">{row.reserved}</td>
                  <td className="px-4 py-3">{row.available}</td>
                  <td className="px-4 py-3">{row.reorder}</td>
                  <td className="px-4 py-3">
                    <Badge label={row.status} />
                  </td>
                  <td className="px-4 py-3 text-soil/70">✎</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
