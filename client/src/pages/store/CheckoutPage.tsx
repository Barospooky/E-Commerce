import { CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { formatMoney } from "../../utils/money";

export default function CheckoutPage() {
  const { lines, clearCart } = useCartStore();
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + delivery;

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-[2.5rem] bg-white p-7 shadow-card md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-clay">Checkout MVP</p>
          <h1 className="mt-4 font-display text-5xl font-black tracking-[-0.04em] text-soil">Delivery details</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {["Full name", "Phone", "Address line", "City", "State", "Pincode"].map((field, index) => (
              <label key={field} className={index === 2 ? "md:col-span-2" : ""}>
                <span className="text-sm font-bold text-soil/60">{field}</span>
                <input className="mt-2 w-full rounded-2xl border border-soil/10 bg-cream px-4 py-3 outline-none ring-2 ring-transparent focus:ring-leaf" placeholder={field} />
              </label>
            ))}
          </div>
          <button
            onClick={() => {
              clearCart();
              toast.success("Demo order placed. Backend payment verification is scaffolded next.");
            }}
            className="mt-8 inline-flex items-center rounded-full bg-leaf px-7 py-4 font-bold text-white shadow-soft"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" /> Place demo order
          </button>
        </div>
        <aside className="h-max rounded-[2rem] bg-soil p-7 text-cream shadow-soft">
          <p className="font-display text-3xl font-bold">Payment preview</p>
          <p className="mt-3 text-sm text-cream/60">Razorpay or Stripe integration hooks into the API payment routes.</p>
          <div className="mt-6 space-y-4 text-cream/72">
            <div className="flex justify-between"><span>Items</span><span>{lines.length}</span></div>
            <div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{delivery === 0 ? "Free" : formatMoney(delivery)}</span></div>
            <div className="border-t border-cream/15 pt-4 flex justify-between text-xl font-bold text-cream"><span>Total</span><span>{formatMoney(total)}</span></div>
          </div>
          <Link to="/cart" className="mt-7 block text-center text-sm font-bold text-cream/70 hover:text-cream">Review cart</Link>
        </aside>
      </div>
    </section>
  );
}
