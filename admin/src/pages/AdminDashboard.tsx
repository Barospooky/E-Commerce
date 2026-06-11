import { CalendarDays, ChevronDown, CircleDollarSign, PackageSearch, ShoppingBag, Users } from "lucide-react";
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const salesData = [
  { day: "May 12", revenue: 2100, orders: 700 },
  { day: "May 13", revenue: 4500, orders: 1900 },
  { day: "May 14", revenue: 6100, orders: 3000 },
  { day: "May 15", revenue: 5200, orders: 2100 },
  { day: "May 16", revenue: 6900, orders: 3300 },
  { day: "May 17", revenue: 4600, orders: 2000 },
  { day: "May 18", revenue: 6500, orders: 3900 }
];

const orderStatus = [
  { name: "Pending", value: 25, color: "#ff7b47", amount: 320 },
  { name: "Processing", value: 33, color: "#0e8a66", amount: 410 },
  { name: "Shipped", value: 28, color: "#f3c113", amount: 350 },
  { name: "Delivered", value: 10, color: "#7b9d42", amount: 126 },
  { name: "Cancelled", value: 4, color: "#ef4444", amount: 50 }
];

const recentOrders = [
  { id: "#ORD-1256", customer: "John Doe", avatar: "https://randomuser.me/api/portraits/men/32.jpg", amount: "$125.00", payment: "Paid", status: "Delivered", date: "May 18, 2024" },
  { id: "#ORD-1255", customer: "Jane Smith", avatar: "https://randomuser.me/api/portraits/women/44.jpg", amount: "$89.50", payment: "Paid", status: "Processing", date: "May 18, 2024" },
  { id: "#ORD-1254", customer: "Robert Johnson", avatar: "https://randomuser.me/api/portraits/men/54.jpg", amount: "$210.00", payment: "COD", status: "Pending", date: "May 17, 2024" },
  { id: "#ORD-1253", customer: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/68.jpg", amount: "$65.75", payment: "Paid", status: "Shipped", date: "May 17, 2024" },
  { id: "#ORD-1252", customer: "Michael Brown", avatar: "https://randomuser.me/api/portraits/men/76.jpg", amount: "$99.99", payment: "Paid", status: "Delivered", date: "May 16, 2024" }
];

const topProducts = [
  { name: "Organic Bananas", sold: "1,256 Sold", price: "$2.45", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=120&q=80" },
  { name: "Organic Apples", sold: "1,125 Sold", price: "$3.25", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=120&q=80" },
  { name: "Organic Spinach", sold: "985 Sold", price: "$1.80", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=120&q=80" },
  { name: "Organic Milk", sold: "875 Sold", price: "$4.25", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=120&q=80" },
  { name: "Organic Tomatoes", sold: "765 Sold", price: "$2.10", image: "https://images.unsplash.com/photo-1546470427-95a0e4e04929?auto=format&fit=crop&w=120&q=80" }
];

function StatusPill({ label }: { label: string }) {
  const styles: Record<string, string> = {
    Paid: "bg-[#e3f5df] text-[#0e8a66]",
    COD: "bg-[#f2ede7] text-soil",
    Delivered: "bg-[#e4f4df] text-[#0e8a66]",
    Processing: "bg-[#dff0ff] text-[#2c7be5]",
    Pending: "bg-[#fff1df] text-[#ff7b47]",
    Shipped: "bg-[#edf8d8] text-[#7b9d42]"
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${styles[label] ?? "bg-[#f2ede7] text-soil"}`}>{label}</span>;
}

function StatCard({
  title,
  value,
  note,
  accent,
  icon
}: {
  title: string;
  value: string;
  note: string;
  accent: string;
  icon: typeof ShoppingBag;
}) {
  const Icon = icon;

  return (
    <div className="rounded-[18px] border border-soil/8 bg-white p-4 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-[16px] bg-[color:var(--icon-bg)]" style={{ ["--icon-bg" as string]: `${accent}20` }}>
          <Icon className="h-7 w-7" style={{ color: accent }} />
        </div>
        <div className="min-w-0">
          <p className="text-[0.85rem] text-soil/70">{title}</p>
          <p className="mt-1 text-[1.8rem] font-semibold tracking-[-0.04em] text-soil">{value}</p>
          <p className="mt-1.5 text-xs font-medium text-[#0e8a66]">{note}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-3 text-soil">
      <section className="rounded-[20px] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-[1.85rem] font-semibold tracking-[-0.05em] text-soil">Dashboard</h1>
            <p className="mt-1 text-sm text-soil/75">Welcome back, Admin! Here&apos;s what&apos;s happening with your store today.</p>
          </div>

          <button className="inline-flex items-center gap-3 rounded-[14px] border border-soil/8 bg-white px-4 py-3 text-sm text-soil shadow-[0_8px_18px_rgba(48,37,29,0.05)]">
            <CalendarDays className="h-4 w-4 text-soil/70" />
            May 12 - May 18, 2024
            <ChevronDown className="h-4 w-4 text-soil/55" />
          </button>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Orders" value="1,256" note="↑ 18.5% from last month" accent="#0e8a66" icon={ShoppingBag} />
        <StatCard title="Total Revenue" value="$58,245.00" note="↑ 24.6% from last month" accent="#ff7b47" icon={CircleDollarSign} />
        <StatCard title="Total Products" value="856" note="↑ 8.2% from last month" accent="#22a045" icon={PackageSearch} />
        <StatCard title="Total Customers" value="2,543" note="↑ 16.3% from last month" accent="#ff7b47" icon={Users} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-[20px] border border-soil/8 bg-white p-4 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[1rem] font-medium text-soil">Sales Overview</h2>
              <div className="mt-3 flex items-center gap-5 text-[0.8rem]">
                <span className="inline-flex items-center gap-2 text-soil/75">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
                  Revenue
                </span>
                <span className="inline-flex items-center gap-2 text-soil/75">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff7b47]" />
                  Orders
                </span>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-[12px] border border-soil/8 bg-white px-3 py-2 text-[0.85rem] text-soil/75">
              This Week
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-1 h-[235px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 8, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.03} />
                  </linearGradient>
                  <linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7b47" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#ff7b47" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#78695d", fontSize: 12 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => (value === 0 ? "$0" : `$${value / 1000}K`)}
                  tick={{ fill: "#78695d", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "1px solid rgba(48, 37, 29, 0.08)",
                    boxShadow: "0 16px 28px rgba(48, 37, 29, 0.08)"
                  }}
                />
                <Area name="Revenue" type="monotone" dataKey="revenue" stroke="#16a34a" fill="url(#revenueFill)" strokeWidth={2.4} dot={{ r: 3, strokeWidth: 2, fill: "#16a34a" }} activeDot={{ r: 4 }} />
                <Area name="Orders" type="monotone" dataKey="orders" stroke="#ff7b47" fill="url(#ordersFill)" strokeWidth={2.4} dot={{ r: 3, strokeWidth: 2, fill: "#ff7b47" }} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[20px] border border-soil/8 bg-white p-4 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
          <h2 className="text-[1rem] font-medium text-soil">Order Status</h2>
          <div className="mt-3 grid grid-cols-[190px_1fr] items-center gap-2">
            <div className="relative h-[225px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={orderStatus} dataKey="value" innerRadius={54} outerRadius={92} paddingAngle={2}>
                    {orderStatus.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "1px solid rgba(48, 37, 29, 0.08)",
                      boxShadow: "0 16px 28px rgba(48, 37, 29, 0.08)"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-soil">
                <span className="text-[1rem] font-semibold tracking-[-0.04em]">1,256</span>
                <span className="text-xs text-soil/75">Total</span>
              </div>
            </div>

            <div className="space-y-4 text-[0.85rem]">
              {orderStatus.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-soil/75">{item.name}</span>
                  </div>
                  <span className="text-soil/70">
                    {item.amount} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-[20px] border border-soil/8 bg-white p-4 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
          <div className="mb-3.5 flex items-center justify-between">
            <h2 className="text-[0.98rem] font-medium text-soil">Recent Orders</h2>
            <button className="text-[0.82rem] font-medium text-[#0e8a66]">View All</button>
          </div>

          <div className="overflow-hidden">
            <table className="w-full text-left text-[0.78rem]">
              <thead className="bg-[#f8f7f3] text-soil/70">
                <tr>
                  <th className="px-3 py-2 font-medium">Order ID</th>
                  <th className="px-3 py-2 font-medium">Customer</th>
                  <th className="px-3 py-2 font-medium">Amount</th>
                  <th className="px-3 py-2 font-medium">Payment</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-soil/8">
                    <td className="px-3 py-2 font-medium text-[#0e8a66]">{order.id}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2.5">
                        <img src={order.avatar} alt={order.customer} className="h-5 w-5 rounded-full object-cover" />
                        <span>{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2">{order.amount}</td>
                    <td className="px-3 py-2">
                      <StatusPill label={order.payment} />
                    </td>
                    <td className="px-3 py-2">
                      <StatusPill label={order.status} />
                    </td>
                    <td className="px-3 py-2 text-soil/70">{order.date}</td>
                    <td className="px-3 py-2 text-soil/70">⋮</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[20px] border border-soil/8 bg-white p-4 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[1rem] font-medium text-soil">Top Selling Products</h2>
            <button className="text-[0.85rem] font-medium text-[#0e8a66]">View All</button>
          </div>

          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.name} className="flex items-center justify-between border-b border-soil/8 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="h-10 w-10 object-cover" />
                  <div>
                    <p className="font-medium text-soil">{product.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-soil/70">
                  <span>{product.sold}</span>
                  <span className="font-medium text-soil">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
