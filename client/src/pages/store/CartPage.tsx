import { Minus, Plus, ShieldCheck, Trash2, Truck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { formatMoney } from "../../utils/money";

export default function CartPage() {
  const { lines, addItem, decrementItem, removeItem } = useCartStore();
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const discount = subtotal > 1500 ? 120 : 0;
  const total = subtotal + delivery;

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-sm text-soil/50">Home &gt; Cart</div>
      <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.05em] text-soil sm:text-5xl">Shopping Cart</h1>
      {lines.length === 0 ? (
        <div className="mt-10 rounded-[2rem] bg-white p-10 text-center shadow-card">
          <p className="font-display text-3xl text-soil">Your basket is waiting for its first harvest.</p>
          <Link to="/products" className="mt-6 inline-flex rounded-full bg-leaf px-6 py-3 font-bold text-white">Shop products</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {lines.map((line) => (
              <div key={line.product.id} className="grid gap-4 rounded-[1.5rem] border border-soil/8 bg-white p-4 shadow-[0_8px_18px_rgba(48,37,29,0.04)] sm:grid-cols-[90px_1fr_auto_auto] sm:items-center">
                <img src={line.product.image} alt={line.product.name} className="h-20 w-full rounded-[1rem] object-cover sm:w-20" />
                <div>
                  <p className="font-semibold text-soil">{line.product.name}</p>
                  <p className="mt-1 text-sm text-soil/50">{line.product.unit}</p>
                </div>
                <div className="text-sm font-semibold text-soil">{formatMoney(line.product.price * line.quantity)}</div>
                <div className="flex items-center gap-3 justify-self-start sm:justify-self-end">
                  <div className="flex items-center gap-3 rounded-full border border-soil/8 bg-[#faf9f6] px-2 py-1.5">
                    <button onClick={() => decrementItem(line.product.id)} className="grid h-7 w-7 place-items-center rounded-full bg-white text-soil"><Minus className="h-4 w-4" /></button>
                    <span className="w-4 text-center text-sm font-bold">{line.quantity}</span>
                    <button onClick={() => addItem(line.product)} className="grid h-7 w-7 place-items-center rounded-full bg-white text-soil"><Plus className="h-4 w-4" /></button>
                  </div>
                  <button onClick={() => removeItem(line.product.id)} className="inline-flex items-center gap-2 text-sm font-bold text-clay">
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="rounded-[1.5rem] border border-soil/8 bg-white p-4 shadow-[0_8px_18px_rgba(48,37,29,0.04)]">
              <p className="text-sm font-semibold text-soil">Coupon Code</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input placeholder="Enter coupon code" className="flex-1 rounded-[0.9rem] border border-soil/10 px-4 py-3 text-sm outline-none" />
                <button className="rounded-[0.9rem] bg-[#0e8a66] px-5 py-3 text-sm font-semibold text-white">Apply</button>
              </div>
            </div>
          </div>
          <aside className="space-y-4">
            <div className="rounded-[1.5rem] border border-soil/8 bg-white p-5 shadow-[0_8px_18px_rgba(48,37,29,0.04)]">
              <p className="text-xl font-semibold text-soil">Order Summary</p>
              <div className="mt-5 space-y-4 text-sm text-soil/65">
                <div className="flex justify-between"><span>Subtotal ({lines.length} items)</span><span>{formatMoney(subtotal)}</span></div>
                <div className="flex justify-between"><span>Discount</span><span className="text-[#0e8a66]">-{formatMoney(discount)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{delivery === 0 ? "Free" : formatMoney(delivery)}</span></div>
                <div className="flex justify-between border-t border-soil/8 pt-4 text-lg font-bold text-soil"><span>Total</span><span>{formatMoney(total - discount)}</span></div>
              </div>
              <Link to="/checkout" className="mt-6 block rounded-[0.95rem] bg-[#ff7b47] px-6 py-3 text-center text-sm font-semibold text-white">
                Proceed to Checkout
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 rounded-[1.5rem] border border-soil/8 bg-white p-4 text-center shadow-[0_8px_18px_rgba(48,37,29,0.04)]">
              <div>
                <Truck className="mx-auto h-5 w-5 text-[#0e8a66]" />
                <p className="mt-2 text-xs font-medium text-soil/55">100% Secure</p>
              </div>
              <div>
                <ShieldCheck className="mx-auto h-5 w-5 text-[#0e8a66]" />
                <p className="mt-2 text-xs font-medium text-soil/55">Easy Returns</p>
              </div>
              <div>
                <Zap className="mx-auto h-5 w-5 text-[#0e8a66]" />
                <p className="mt-2 text-xs font-medium text-soil/55">Quality Products</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
