import { BarChart3, Boxes, CircleDollarSign, PackageSearch, ShoppingBag, Users } from "lucide-react";
import { products } from "../../data/products";
import { formatMoney } from "../../utils/money";

const stats = [
  { label: "Revenue", value: formatMoney(284500), icon: CircleDollarSign },
  { label: "Orders", value: "438", icon: ShoppingBag },
  { label: "Customers", value: "1,284", icon: Users },
  { label: "Low stock", value: "7", icon: Boxes }
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#10120d] text-cream">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <header className="flex flex-col justify-between gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-moss">Admin control room</p>
            <h1 className="mt-3 font-display text-5xl font-black tracking-[-0.05em]">Organic commerce ops</h1>
          </div>
          <a href="/" className="rounded-full bg-cream px-5 py-3 text-sm font-bold text-soil">Open storefront</a>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[1.6rem] border border-white/10 bg-white/[0.07] p-5">
              <stat.icon className="h-6 w-6 text-moss" />
              <p className="mt-5 text-sm text-cream/48">{stat.label}</p>
              <p className="mt-1 font-display text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold">Catalog health</h2>
              <BarChart3 className="h-6 w-6 text-moss" />
            </div>
            <div className="mt-8 space-y-4">
              {products.map((product) => (
                <div key={product.id} className="grid items-center gap-4 rounded-[1.4rem] bg-black/18 p-4 md:grid-cols-[64px_1fr_auto]">
                  <img src={product.image} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" />
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-sm text-cream/45">{product.category} · {product.stock} in stock</p>
                  </div>
                  <span className="rounded-full bg-moss/15 px-4 py-2 text-sm font-bold text-moss">{formatMoney(product.price)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-clay p-6 text-soil">
            <PackageSearch className="h-9 w-9" />
            <h2 className="mt-6 font-display text-4xl font-black tracking-[-0.04em]">Next admin modules</h2>
            <p className="mt-4 leading-7 text-soil/70">Product CRUD, image uploads, orders, customers, coupons, inventory alerts and analytics charts map directly to the Express and Prisma modules in this scaffold.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
