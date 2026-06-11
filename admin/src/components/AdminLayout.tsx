import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  Mail,
  Menu,
  Search,
  PackageSearch,
  Settings,
  Star,
  Store,
  Tags,
  Boxes,
  Users,
  LineChart,
  Grid2x2,
  Wallet,
  Sprout
} from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { brand } from "../config/brand";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: PackageSearch, chevron: true },
  { to: "/admin/orders", label: "Orders", icon: Store, chevron: true },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/categories", label: "Categories", icon: Grid2x2 },
  { to: "/admin/inventory", label: "Inventory", icon: Boxes },
  { to: "/admin/coupons", label: "Coupons & Offers", icon: Tags },
  { to: "#", label: "Reviews & Ratings", icon: Star },
  { to: "#", label: "Banners", icon: Store },
  { to: "/admin/reports", label: "Reports", icon: LineChart, chevron: true },
  { to: "/admin/settings", label: "Settings", icon: Settings, chevron: true }
];

export default function AdminLayout() {
  return (
    <div className="h-screen overflow-hidden bg-white text-ink">
      <div className="mx-auto flex h-screen max-w-[1600px] gap-0 px-0 py-0">
        <aside className="admin-sidebar hidden h-screen w-[224px] flex-col overflow-hidden bg-gradient-to-b from-[#0d6a43] via-[#0c5f3b] to-[#094f31] text-white shadow-[0_18px_40px_rgba(10,84,52,0.22)] lg:flex">
          <div className="shrink-0 border-b border-[#e8ece8] bg-white px-4 py-3.5 text-ink">
            <Link to="/admin" className="flex items-center gap-3">
              <img src={brand.logoUrl} alt="Shop Organic" className="h-10 w-10 object-contain" />
              <div className="leading-tight">
                <p className="text-[0.9rem] font-extrabold tracking-[-0.05em] text-[#0b7a57]">Shop</p>
                <div className="flex items-center gap-1">
                  <h1 className="text-[0.9rem] font-extrabold tracking-[-0.05em] text-soil">Organic</h1>
                  <Sprout className="h-4 w-4 text-[#0b7a57]" />
                </div>
              </div>
            </Link>
          </div>

          <div className="admin-sidebar-menu min-h-0 flex-1 overflow-y-auto">
            <nav className="space-y-2 px-2.5 py-3">
              {links.map((link) =>
                link.to !== "#" ? (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/admin"}
                    className={({ isActive }) =>
                      `mx-0 flex items-center gap-3 px-3 py-2 text-[0.9rem] font-medium transition ${
                        isActive
                          ? "rounded-[12px] bg-[linear-gradient(90deg,rgba(19,160,95,0.95),rgba(15,131,79,0.95))] text-white shadow-[0_8px_22px_rgba(14,120,74,0.25)]"
                          : "rounded-[12px] text-white/85 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <link.icon className="h-4 w-4 shrink-0" />
                    <span>{link.label}</span>
                    {link.chevron ? <ChevronDown className="ml-auto h-4 w-4 text-white/75" /> : null}
                  </NavLink>
                ) : (
                  <button
                    key={link.label}
                    type="button"
                    className="flex w-full items-center justify-between rounded-[12px] px-3 py-2 text-left text-[0.9rem] font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <link.icon className="h-4 w-4 shrink-0" />
                      <span>{link.label}</span>
                    </span>
                    {link.chevron ? <ChevronDown className="h-4 w-4 text-white/75" /> : null}
                  </button>
                )
              )}
            </nav>

            <div className="px-2.5 pb-3 pt-2">
              <div className="rounded-[12px] border border-white/10 bg-white/5 p-2.5 text-sm text-white/90 shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
                <div className="flex items-center gap-3">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white">
                    <Store className="h-6 w-6 text-[#ffb000]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.85rem] font-semibold text-white">Fresh Products</p>
                    <p className="text-[0.85rem] font-semibold text-white">Happy Customers</p>
                  </div>
                </div>
                <button className="mt-3.5 w-full bg-[#0f9d58] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b7a57]">
                  View Store
                </button>
              </div>

              <div className="mt-2.5 flex items-center justify-between px-1 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  <span>Collapse Menu</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </aside>

        <main className="flex h-screen min-h-0 flex-1 flex-col overflow-hidden bg-white">
          <header className="flex items-center justify-between border-b border-soil/8 bg-white px-4 py-3.5">
            <div className="flex items-center gap-3.5">
              <button type="button" className="grid h-8 w-8 place-items-center text-soil" aria-label="Menu">
                <Menu className="h-4 w-4" />
              </button>
              <label className="relative hidden w-[410px] max-w-full md:block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-soil/45" />
                <input
                  placeholder="Search for products, orders, customers..."
                  className="w-full rounded-[14px] border border-soil/8 bg-[#f7f7f5] py-2.5 pl-11 pr-4 text-sm text-soil shadow-[0_1px_0_rgba(255,255,255,0.9),0_1px_8px_rgba(48,37,29,0.03)] outline-none placeholder:text-soil/35"
                />
              </label>
            </div>

            <div className="flex items-center gap-4">
              <button type="button" className="relative grid h-8 w-8 place-items-center text-soil" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-[#ff3b00] text-[9px] font-bold text-white">
                  5
                </span>
              </button>
              <button type="button" className="relative grid h-8 w-8 place-items-center text-soil" aria-label="Messages">
                <Mail className="h-4 w-4" />
                <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-[#ff3b00] text-[9px] font-bold text-white">
                  3
                </span>
              </button>
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80"
                  alt="Admin User"
                  className="h-9 w-9 object-cover"
                />
                <div className="hidden sm:block">
                  <p className="text-[0.92rem] font-semibold text-soil">Admin User</p>
                  <p className="text-[0.75rem] text-soil/50">Super Admin</p>
                </div>
                <ChevronDown className="h-4 w-4 text-soil/45" />
              </div>
            </div>
          </header>

          <div className="admin-content-scroll min-h-0 flex-1 overflow-y-auto p-3 pt-3 lg:p-3">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
