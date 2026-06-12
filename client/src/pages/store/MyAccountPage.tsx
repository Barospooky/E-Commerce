import { Heart, LayoutDashboard, LogOut, MapPin, Package, Settings, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { accountHighlights, accountProfile, recentOrders } from "../../data/accountMock";
import { formatMoney } from "../../utils/money";

function statusClassName(status: string) {
  const map: Record<string, string> = {
    Delivered: "bg-[#e7f7ec] text-[#0e8a66]",
    Shipped: "bg-[#e7f1ff] text-[#2563eb]",
    Cancelled: "bg-[#fde8e8] text-[#ef4444]"
  };
  return map[status] ?? "bg-[#f3f4f6] text-soil";
}

export default function MyAccountPage() {
  const shortcuts = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/account", active: true },
    { icon: Package, label: "My Orders", to: "/account/orders" },
    { icon: Heart, label: "Wishlist", to: "/wishlist" },
    { icon: MapPin, label: "Addresses", to: "/contact" },
    { icon: Settings, label: "Account Details", to: "/contact" },
    { icon: ShieldCheck, label: "Change Password", to: "/contact" },
    { icon: LogOut, label: "Logout", to: "/" }
  ];

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-5 shadow-[0_12px_30px_rgba(48,37,29,0.06)] sm:p-6">
        <div className="mb-5 text-sm text-soil/50">Home &gt; My Account</div>
        <div className="grid gap-5 xl:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="rounded-[1.4rem] border border-soil/8 bg-[#fbfaf8] p-4">
            <div className="flex items-center gap-3 rounded-[1rem] bg-white p-3 shadow-[0_6px_16px_rgba(48,37,29,0.04)]">
              <img src={accountProfile.avatar} alt={accountProfile.name} className="h-14 w-14 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-soil">{accountProfile.name}</p>
                <p className="mt-1 text-xs text-soil/55">{accountProfile.email}</p>
                <p className="mt-1 text-xs text-soil/55">{accountProfile.phone}</p>
              </div>
            </div>

            <nav className="mt-4 space-y-1.5">
              {shortcuts.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-[0.95rem] px-3 py-2.5 text-sm font-medium transition ${
                    item.active ? "bg-[#eaf6ee] text-[#0e8a66]" : "text-soil/72 hover:bg-white"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {accountHighlights.map((item) => (
                <div key={item.label} className="rounded-[1.2rem] border border-soil/8 bg-white p-4 shadow-[0_6px_16px_rgba(48,37,29,0.04)]">
                  <p className="text-sm text-soil/52">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-soil">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.4rem] border border-soil/8 bg-white p-4 shadow-[0_6px_16px_rgba(48,37,29,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-soil">Recent Orders</h2>
                <Link to="/account/orders" className="text-sm font-medium text-[#0e8a66]">
                  View all
                </Link>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="border-b border-soil/8 text-soil/48">
                    <tr>
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Total</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-soil/6 last:border-b-0">
                        <td className="py-3 font-semibold text-[#0e8a66]">{order.id}</td>
                        <td className="py-3 text-soil/65">{order.date}</td>
                        <td className="py-3">{formatMoney(order.total)}</td>
                        <td className="py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClassName(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <Link to="/account/orders" className="text-sm font-medium text-soil/72">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
