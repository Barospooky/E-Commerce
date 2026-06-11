import {
  Facebook,
  Instagram,
  Menu,
  Search,
  ShoppingBasket,
  Twitter,
  Youtube,
  UserRound
} from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { brand } from "../../config/brand";
import { useCartStore } from "../../store/cartStore";
import { formatMoney } from "../../utils/money";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "About", href: "/products" },
  { label: "Contact", href: "/cart" }
];

const socialLinks = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" }
];

export default function StoreLayout() {
  const lines = useCartStore((state) => state.lines);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f6f5f1] text-ink">
      <header className="sticky top-0 z-50 border-b border-soil/8 bg-[#f6f5f1]/96 backdrop-blur-xl">
        <div className="mx-auto max-w-[1360px] px-4 py-4 sm:px-6">
          <div className="rounded-[1.4rem] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(48,37,29,0.06)] sm:px-5">
            <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)_280px] lg:items-center">
              <Link to="/" className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-[1rem] bg-[#0b7a57] shadow-[0_10px_20px_rgba(11,122,87,0.18)]">
                  <img src={brand.logoUrl} alt={`${brand.clientName} logo`} className="h-7 w-7 object-contain" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[13px] font-semibold uppercase tracking-[0.22em] text-soil/45">
                    {brand.clientName}
                  </span>
                  <span className="block text-[1.15rem] font-extrabold tracking-[-0.04em] text-soil">
                    {brand.platformName}
                  </span>
                </span>
              </Link>

              <form action="/products" className="flex w-full overflow-hidden rounded-[1rem] border border-soil/8 bg-white shadow-[0_10px_30px_rgba(48,37,29,0.06)]">
                <label className="sr-only" htmlFor="layout-search">
                  Search products
                </label>
                <input
                  id="layout-search"
                  name="q"
                  placeholder="Search..."
                  className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm font-medium text-soil outline-none placeholder:text-soil/35"
                />
                <button
                  type="button"
                  className="hidden items-center gap-2 border-l border-soil/8 bg-[#0e8a66] px-5 text-sm font-semibold text-white sm:inline-flex"
                >
                  All Categories
                  <Search className="h-4 w-4" />
                </button>
                <button
                  type="submit"
                  className="grid w-14 place-items-center bg-[#ff7b47] text-white transition hover:bg-[#ef6e3d]"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>

              <div className="flex items-center justify-between gap-4 lg:justify-end">
                <button className="hidden text-sm font-medium text-soil/60 transition hover:text-soil sm:inline-flex">
                  Login <UserRound className="ml-2 h-4 w-4" />
                </button>
                <Link to="/cart" className="relative flex items-center gap-3 rounded-[1rem] border border-soil/8 bg-white px-4 py-3 shadow-[0_8px_18px_rgba(48,37,29,0.05)]">
                  <ShoppingBasket className="h-5 w-5 text-soil/55" />
                  <div className="text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-soil/35">
                      Shopping Basket
                    </p>
                    <p className="text-sm font-bold text-[#0e8a66]">{formatMoney(total)}</p>
                  </div>
                  {count > 0 && (
                    <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-[#ff7b47] text-xs font-bold text-white">
                      {count}
                    </span>
                  )}
                </Link>
                <button className="rounded-[0.9rem] border border-soil/8 bg-white p-3 sm:hidden">
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4 border-t border-soil/8 pt-4 lg:flex-row lg:items-center lg:justify-between">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-[0.9rem] bg-[#ff7b47] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#ef6e3d]"
              >
                Shop By Category
              </Link>

              <nav className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-soil/72">
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    className={({ isActive }) =>
                      `transition hover:text-[#0e8a66] ${isActive ? "text-[#0e8a66]" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="flex items-center justify-center gap-5 text-[#0e8a66]">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href="/"
                    aria-label={item.label}
                    className="transition hover:text-[#ff7b47]"
                  >
                    <item.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
