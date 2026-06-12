import { Link } from "react-router-dom";
import { recentOrders } from "../../data/accountMock";
import { formatMoney } from "../../utils/money";

const tabs = ["All Orders", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"];

function statusClassName(status: string) {
  const map: Record<string, string> = {
    Delivered: "bg-[#e7f7ec] text-[#0e8a66]",
    Shipped: "bg-[#e7f1ff] text-[#2563eb]",
    Cancelled: "bg-[#fde8e8] text-[#ef4444]"
  };
  return map[status] ?? "bg-[#f3f4f6] text-soil";
}

export default function MyOrdersPage() {
  return (
    <section className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-5 shadow-[0_12px_30px_rgba(48,37,29,0.06)] sm:p-6">
        <div className="text-sm text-soil/50">Home &gt; My Orders</div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-soil">My Orders</h1>
        <div className="mt-5 flex flex-wrap gap-3">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`rounded-full px-4 py-2 text-sm font-medium ${index === 0 ? "bg-[#0e8a66] text-white" : "bg-[#f5f5f1] text-soil/70"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-soil/8 text-soil/48">
              <tr>
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-soil/6 last:border-b-0">
                  <td className="py-4 font-semibold text-[#0e8a66]">{order.id}</td>
                  <td className="py-4 text-soil/65">{order.date}</td>
                  <td className="py-4">{order.items}</td>
                  <td className="py-4">{formatMoney(order.total)}</td>
                  <td className="py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClassName(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <Link to="/order-success" className="font-medium text-soil/72">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
