import { useQuery } from "@tanstack/react-query";
import { Download, Filter, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchAdminOrders } from "../api/orders";
import { useAdminSessionStore } from "../store/adminSessionStore";

function Badge({ label }: { label: string }) {
  const map: Record<string, string> = {
    Paid: "bg-[#e5f7e8] text-[#0e8a66]",
    COD: "bg-[#f2ede7] text-soil",
    Delivered: "bg-[#e5f7e8] text-[#0e8a66]",
    Processing: "bg-[#dff0ff] text-[#2c7be5]",
    Pending: "bg-[#fff1df] text-[#ff7b47]",
    Shipped: "bg-[#edf8d8] text-[#7b9d42]",
    Cancelled: "bg-[#fde4e4] text-[#ef4444]"
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${map[label] ?? "bg-[#f2ede7] text-soil"}`}>{label}</span>;
}

export default function AdminOrdersPage() {
  const token = useAdminSessionStore((state) => state.accessToken);
  const navigate = useNavigate();

  const ordersQuery = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => fetchAdminOrders(token ?? ""),
    enabled: Boolean(token)
  });

  const orders = ordersQuery.data?.data ?? [];

  return (
    <div className="space-y-4 text-soil">
      <section className="rounded-[20px] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-[1.7rem] font-semibold tracking-[-0.04em] text-soil">Orders</h1>
            <p className="mt-1 text-sm text-soil/70">Manage and track all customer orders.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-[12px] border border-soil/8 bg-white px-4 py-2.5 text-sm text-soil">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </section>

      <section className="rounded-[20px] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
          {["All Orders", "Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returns"].map((tab, index) => (
            <button key={tab} className={index === 0 ? "border-b-2 border-[#ff7b47] pb-3 text-[#ff7b47]" : "pb-3 text-soil/60"}>
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_1fr_1fr_auto]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-soil/45" />
            <input placeholder="Search orders..." className="w-full rounded-[12px] border border-soil/8 px-10 py-2.5 text-sm outline-none" />
          </label>
          <select className="rounded-[12px] border border-soil/8 bg-white px-4 py-2.5 text-sm text-soil outline-none">
            <option>All Status</option>
          </select>
          <select className="rounded-[12px] border border-soil/8 bg-white px-4 py-2.5 text-sm text-soil outline-none">
            <option>May 12 - May 18, 2024</option>
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
                <th className="px-4 py-3 font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {ordersQuery.isLoading ? (
                <tr>
                  <td className="px-4 py-6 text-sm text-soil/60" colSpan={7}>
                    Loading orders...
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-t border-soil/8">
                    <td className="px-4 py-3 font-medium text-[#0e8a66]">{`#${order.id}`}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3">₹{order.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <Badge label={order.payment} />
                    </td>
                    <td className="px-4 py-3">
                      <Badge label={order.status.charAt(0) + order.status.slice(1).toLowerCase()} />
                    </td>
                    <td className="px-4 py-3 text-soil/70">{order.date}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                        className="rounded-[10px] border border-soil/8 px-3 py-1.5 text-sm hover:text-[#0e8a66]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-soil/60">
          <span>Showing 1 to {orders.length} of {orders.length} orders</span>
          <div className="flex items-center gap-2">
            <button className="rounded-[10px] border border-soil/8 bg-white px-3 py-1.5">1</button>
            <button className="rounded-[10px] border border-soil/8 bg-[#ff7b47] px-3 py-1.5 text-white">2</button>
            <button className="rounded-[10px] border border-soil/8 bg-white px-3 py-1.5">3</button>
            <span>...</span>
            <button className="rounded-[10px] border border-soil/8 bg-white px-3 py-1.5">20</button>
          </div>
        </div>
      </section>
    </div>
  );
}
