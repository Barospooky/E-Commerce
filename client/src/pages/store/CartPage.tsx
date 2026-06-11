import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { formatMoney } from "../../utils/money";

export default function CartPage() {
  const { lines, addItem, decrementItem, removeItem } = useCartStore();
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + delivery;

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <h1 className="font-display text-6xl font-black tracking-[-0.05em] text-soil">Your cart</h1>
      {lines.length === 0 ? (
        <div className="mt-10 rounded-[2rem] bg-white p-10 text-center shadow-card">
          <p className="font-display text-3xl text-soil">Your basket is waiting for its first harvest.</p>
          <Link to="/products" className="mt-6 inline-flex rounded-full bg-leaf px-6 py-3 font-bold text-white">Shop products</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {lines.map((line) => (
              <div key={line.product.id} className="grid gap-4 rounded-[2rem] bg-white p-4 shadow-card sm:grid-cols-[120px_1fr_auto] sm:items-center">
                <img src={line.product.image} alt={line.product.name} className="h-28 w-full rounded-[1.4rem] object-cover sm:w-28" />
                <div>
                  <p className="font-display text-2xl font-bold text-soil">{line.product.name}</p>
                  <p className="mt-1 text-sm text-soil/50">{formatMoney(line.product.price)} / {line.product.unit}</p>
                  <button onClick={() => removeItem(line.product.id)} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-clay">
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
                <div className="flex items-center gap-3 rounded-full bg-cream p-2">
                  <button onClick={() => decrementItem(line.product.id)} className="grid h-9 w-9 place-items-center rounded-full bg-white text-soil"><Minus className="h-4 w-4" /></button>
                  <span className="w-6 text-center font-bold">{line.quantity}</span>
                  <button onClick={() => addItem(line.product)} className="grid h-9 w-9 place-items-center rounded-full bg-soil text-cream"><Plus className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-max rounded-[2rem] bg-soil p-7 text-cream shadow-soft">
            <p className="font-display text-3xl font-bold">Order summary</p>
            <div className="mt-6 space-y-4 text-cream/72">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{delivery === 0 ? "Free" : formatMoney(delivery)}</span></div>
              <div className="border-t border-cream/15 pt-4 flex justify-between text-xl font-bold text-cream"><span>Total</span><span>{formatMoney(total)}</span></div>
            </div>
            <Link to="/checkout" className="mt-7 block rounded-full bg-cream px-6 py-4 text-center font-bold text-soil">Proceed to checkout</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
