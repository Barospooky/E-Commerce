import {
  ChevronDown,
  Facebook,
  Heart,
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
  { label: "About", href: "/account" },
  { label: "Contact", href: "/contact" }
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
        <div className="mx-auto max-w-[1360px] px-3 py-2 sm:px-4 sm:py-2.5">
          <div className="rounded-[0.95rem] bg-white px-3 py-2 shadow-[0_8px_18px_rgba(48,37,29,0.05)] sm:px-4 sm:py-2.5">
            <div className="grid gap-2 lg:grid-cols-[190px_minmax(0,560px)_260px] lg:items-center lg:justify-between">
              <Link to="/" className="flex min-w-0 items-center gap-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[0.65rem] bg-[#0b7a57] shadow-[0_6px_14px_rgba(11,122,87,0.15)]">
                  <img src={brand.logoUrl} alt={`${brand.clientName} logo`} className="h-4.5 w-4.5 object-contain" />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-[0.98rem] font-extrabold tracking-[-0.04em] text-soil">
                    Shop Organic
                  </span>
                </span>
              </Link>

              <form action="/products" className="flex w-full overflow-hidden rounded-[0.95rem] border border-soil/8 bg-[#0e8a66] shadow-[0_6px_18px_rgba(48,37,29,0.04)]">
                <label className="sr-only" htmlFor="layout-search">
                  Search products
                </label>
                <input
                  id="layout-search"
                  name="q"
                  placeholder="Search..."
                  className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-[13px] font-medium text-white outline-none placeholder:text-white/78"
                />
                <div className="relative hidden md:block">
                  <select
                    name="category"
                    defaultValue="all"
                    className="h-full appearance-none border-l border-white/20 bg-transparent py-2.5 pl-4 pr-9 text-[12px] font-semibold text-white outline-none"
                  >
                    <option value="all" className="text-soil">All Categories</option>
                    <option value="fruits" className="text-soil">Fruits</option>
                    <option value="vegetables" className="text-soil">Vegetables</option>
                    <option value="grains" className="text-soil">Grains</option>
                    <option value="pantry" className="text-soil">Pantry</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white" />
                </div>
                <button
                  type="submit"
                  className="grid w-10 place-items-center bg-[#ff7b47] text-white transition hover:bg-[#ef6e3d]"
                  aria-label="Search"
                >
                  <Search className="h-3.5 w-3.5" />
                </button>
              </form>

              <div className="flex items-center justify-between gap-3 lg:justify-end">
                <div className="hidden items-center gap-3 text-soil/65 md:flex">
                  <button className="inline-flex items-center text-[13px] font-medium text-soil/60 transition hover:text-soil">
                    Login <UserRound className="ml-1.5 h-3.5 w-3.5" />
                  </button>
                  <Link to="/wishlist" className="transition hover:text-soil" aria-label="Wishlist">
                    <Heart className="h-3.5 w-3.5" />
                  </Link>
                  <Link to="/account" className="transition hover:text-soil" aria-label="Account">
                    <UserRound className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <Link to="/cart" className="relative flex items-center gap-1.5 rounded-[0.8rem] border border-soil/8 bg-white px-2.5 py-1.5 shadow-[0_5px_12px_rgba(48,37,29,0.05)] sm:px-3 sm:py-2">
                  <ShoppingBasket className="h-3.5 w-3.5 shrink-0 text-soil/55" />
                  <div className="hidden text-left sm:block">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-soil/35">
                      Shopping Basket
                    </p>
                    <p className="text-[12px] font-bold text-[#0e8a66]">{formatMoney(total)}</p>
                  </div>
                  {count > 0 && (
                    <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#ff7b47] text-[10px] font-bold text-white">
                      {count}
                    </span>
                  )}
                </Link>
                <button className="rounded-[0.75rem] border border-soil/8 bg-white p-2 sm:hidden">
                  <Menu className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-2 border-t border-soil/8 pt-2 lg:flex-row lg:items-center lg:justify-between">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-[0.75rem] bg-[#ff7b47] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#ef6e3d] sm:w-auto"
              >
                Shop By Category
              </Link>

              <nav className="flex flex-wrap items-center justify-center gap-4 text-[12px] font-medium text-soil/72">
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

              <div className="flex items-center justify-center gap-3 text-[#0e8a66]">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href="/"
                    aria-label={item.label}
                    className="transition hover:text-[#ff7b47]"
                  >
                    <item.icon className="h-3.5 w-3.5" />
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
