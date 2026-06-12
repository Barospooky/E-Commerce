import { Circle, CreditCard, Dot, MapPin, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { formatMoney } from "../../utils/money";

export default function CheckoutPage() {
  const { lines, clearCart } = useCartStore();
  const navigate = useNavigate();
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const discount = subtotal > 1500 ? 120 : 0;
  const total = subtotal + delivery - discount;

  return (
    <section className="mx-auto max-w-[1220px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-sm text-soil/50">Home &gt; Checkout</div>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <StepCard
            step="1"
            title="Delivery Address"
            action="Change"
            content={
              <div className="text-sm text-soil/62">
                <p className="font-medium text-soil">John Doe</p>
                <p className="mt-1">123 Green Street, Apt 4B</p>
                <p>New York, NY 10001, USA</p>
                <p className="mt-1">+91 987 654 3210</p>
              </div>
            }
          />

          <StepCard
            step="2"
            title="Shipping Method"
            content={
              <div className="space-y-3">
                {[
                  { title: "Standard Delivery (3-5 Days)", price: "Free", active: true },
                  { title: "Express Delivery (1-2 Days)", price: formatMoney(49), active: false }
                ].map((option) => (
                  <label key={option.title} className="flex items-center justify-between rounded-[1rem] border border-soil/8 px-4 py-3">
                    <span className="flex items-center gap-3">
                      {option.active ? <Dot className="h-5 w-5 text-[#0e8a66]" /> : <Circle className="h-4 w-4 text-soil/30" />}
                      <span className="text-sm text-soil/72">{option.title}</span>
                    </span>
                    <span className="text-sm font-medium text-[#0e8a66]">{option.price}</span>
                  </label>
                ))}
              </div>
            }
          />

          <StepCard
            step="3"
            title="Payment Method"
            content={
              <div className="space-y-3">
                {[
                  { title: "Credit / Debit Card", icon: CreditCard, active: true },
                  { title: "PayPal", icon: MapPin, active: false },
                  { title: "Cash on Delivery", icon: Truck, active: false }
                ].map((option) => (
                  <label key={option.title} className="flex items-center gap-3 rounded-[1rem] border border-soil/8 px-4 py-3">
                    {option.active ? <Dot className="h-5 w-5 text-[#0e8a66]" /> : <Circle className="h-4 w-4 text-soil/30" />}
                    <option.icon className="h-4 w-4 text-soil/50" />
                    <span className="text-sm text-soil/72">{option.title}</span>
                  </label>
                ))}
              </div>
            }
          />
        </div>

        <aside className="rounded-[1.5rem] border border-soil/8 bg-white p-5 shadow-[0_8px_18px_rgba(48,37,29,0.04)]">
          <h2 className="text-xl font-semibold text-soil">Order Summary</h2>
          <div className="mt-5 space-y-4 border-b border-soil/8 pb-4">
            {lines.map((line) => (
              <div key={line.product.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex-1 text-soil/65">
                  {line.product.name} <span className="ml-1 text-soil/45">x{line.quantity}</span>
                </span>
                <span className="font-medium text-soil">{formatMoney(line.product.price * line.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-3 text-sm text-soil/65">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
            <div className="flex justify-between"><span>Discount</span><span className="text-[#0e8a66]">-{formatMoney(discount)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{delivery === 0 ? "Free" : formatMoney(delivery)}</span></div>
            <div className="flex justify-between border-t border-soil/8 pt-4 text-lg font-bold text-soil"><span>Total</span><span>{formatMoney(total)}</span></div>
          </div>
          <button
            onClick={() => {
              clearCart();
              navigate("/order-success");
            }}
            className="mt-6 w-full rounded-[0.95rem] bg-[#ff7b47] px-6 py-3 text-sm font-semibold text-white"
          >
            Place Order
          </button>
          <Link to="/cart" className="mt-4 block text-center text-sm font-medium text-soil/60">Review cart</Link>
        </aside>
      </div>
    </section>
  );
}

function StepCard({
  step,
  title,
  content,
  action
}: {
  step: string;
  title: string;
  content: React.ReactNode;
  action?: string;
}) {
  return (
    <section className="rounded-[1.5rem] border border-soil/8 bg-white p-5 shadow-[0_8px_18px_rgba(48,37,29,0.04)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0e8a66] text-xs font-bold text-white">{step}</span>
          <h2 className="text-lg font-semibold text-soil">{title}</h2>
        </div>
        {action ? <button className="text-sm font-medium text-[#0e8a66]">{action}</button> : null}
      </div>
      <div className="mt-4">{content}</div>
    </section>
  );
}
