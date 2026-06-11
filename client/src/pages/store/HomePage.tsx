import {
  Apple,
  Beef,
  Carrot,
  ChevronRight,
  CreditCard,
  Globe2,
  GlassWater,
  Leaf,
  RefreshCw,
  ShoppingBasket,
  Soup,
  Truck
} from "lucide-react";
import { Link } from "react-router-dom";

const categoryItems = [
  { icon: Carrot, label: "Vegetables" },
  { icon: Apple, label: "Fruits" },
  { icon: Beef, label: "Meat" },
  { icon: Soup, label: "Canned Organic" },
  { icon: Leaf, label: "Organic" },
  { icon: Globe2, label: "Organic Food" },
  { icon: Leaf, label: "Fresh Onion" },
  { icon: Soup, label: "Oatmeal" },
  { icon: GlassWater, label: "Organic Juice" }
];

const benefits = [
  { icon: Truck, title: "Free Shipping", copy: "Free ship over $150" },
  { icon: ShoppingBasket, title: "Best Deal Online", copy: "We provide a free in-home." },
  { icon: RefreshCw, title: "15 Days Return", copy: "We provide a free in-home measure." },
  { icon: CreditCard, title: "Secure Payment", copy: "We provide a free in-home." }
];

export default function HomePage() {
  return (
    <section className="px-4 py-4 sm:px-6 sm:py-5">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-4 lg:grid-cols-[228px_minmax(0,1fr)_228px] xl:gap-5">
          <aside className="rounded-[1.35rem] bg-white p-3 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
            <ul className="divide-y divide-soil/8">
              {categoryItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to="/products"
                    className="flex items-center justify-between rounded-[0.95rem] px-4 py-[0.88rem] text-[0.92rem] font-medium text-soil/78 transition hover:bg-[#f8f7f3] hover:text-[#0e8a66]"
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-[#0e8a66]" />
                      {item.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-soil/25" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/products"
              className="mt-1 flex items-center justify-center gap-2 rounded-[0.95rem] px-4 py-3 text-sm font-semibold text-[#0e8a66] transition hover:bg-[#f8f7f3]"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </aside>

          <div className="grid gap-4">
            <Link
              to="/products"
              className="group relative min-h-[296px] overflow-hidden rounded-[1.35rem] bg-[#118b65] shadow-[0_16px_34px_rgba(48,37,29,0.12)]"
            >
              <img
                src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1500&q=85"
                alt="Organic produce assortment"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,138,102,0.9)_0%,rgba(14,138,102,0.45)_42%,rgba(14,138,102,0.08)_100%)]" />

              <div className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/90 backdrop-blur">
                100% Eco
              </div>

              <div className="absolute left-7 top-[49%] max-w-sm -translate-y-1/2 text-white sm:left-10">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#ff7b47] text-base font-semibold shadow-[0_10px_24px_rgba(255,123,71,0.18)]">
                  %50
                </span>
                <p className="mt-5 text-sm font-medium text-white/80">Save Up to Flate</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">Mega Sale</h2>
                <span className="mt-6 inline-flex rounded-full bg-[#ff7b47] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_24px_rgba(255,123,71,0.22)]">
                  Shop Now
                </span>
              </div>
            </Link>
          </div>

          <aside className="rounded-[1.35rem] bg-white p-3 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
            <div className="relative min-h-[296px] overflow-hidden rounded-[1.1rem] bg-[#f0d74a]">
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1000&q=85"
                alt="Fresh fruit in basket"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,234,116,0.04)_0%,rgba(255,205,57,0.84)_100%)]" />
              <div className="absolute bottom-4 left-4 right-4 rounded-[0.95rem] bg-white/10 p-4 text-[#0b7a57] backdrop-blur-sm">
                <div className="inline-flex rounded-full bg-[#ff7b47] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                  Sale
                </div>
                <p className="mt-4 text-sm font-medium text-soil/65">Save Up to Flate</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-[#0b7a57]">Fresh Fruit</h3>
                <span className="mt-4 inline-flex rounded-full bg-[#ff7b47] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  Shop Now
                </span>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-5 rounded-[1.35rem] bg-[#0e8a66] px-5 py-5 shadow-[0_16px_34px_rgba(48,37,29,0.12)] sm:px-7">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-4 rounded-[1rem] px-3 py-3 text-white/95">
                <benefit.icon className="h-10 w-10 rounded-full border border-white/25 p-2 text-white" strokeWidth={1.8} />
                <div>
                  <p className="text-base font-semibold">{benefit.title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/72">{benefit.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
