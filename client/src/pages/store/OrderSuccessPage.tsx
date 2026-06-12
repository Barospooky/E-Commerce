import { Check, CircleDot, PackageCheck } from "lucide-react";
import { Link } from "react-router-dom";

const stages = [
  { label: "Order Placed", date: "May 18, 2024" },
  { label: "Confirmed", date: "May 18, 2024" },
  { label: "Shipped", date: "May 19, 2024" },
  { label: "Delivered", date: "May 21, 2024" }
];

export default function OrderSuccessPage() {
  return (
    <section className="mx-auto max-w-[1120px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white px-6 py-10 text-center shadow-[0_12px_30px_rgba(48,37,29,0.06)] sm:px-10">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[#0e8a66] text-white shadow-[0_14px_30px_rgba(14,138,102,0.2)]">
          <Check className="h-11 w-11" />
        </div>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-[#ff7b47]">Order successful</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-soil sm:text-5xl">Thank You!</h1>
        <p className="mt-3 text-base text-soil/65">Your order has been placed successfully.</p>
        <p className="mt-2 text-sm font-medium text-soil/55">Order ID: #ORD-1256</p>
        <p className="mt-4 text-sm text-soil/55">We have sent the order details to your email.</p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/account/orders" className="rounded-[0.9rem] bg-[#0e8a66] px-6 py-3 text-sm font-semibold text-white">
            Track Order
          </Link>
          <Link to="/products" className="rounded-[0.9rem] border border-[#0e8a66]/18 px-6 py-3 text-sm font-semibold text-soil">
            Continue Shopping
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-4">
          {stages.map((stage, index) => (
            <div key={stage.label} className="relative">
              {index < stages.length - 1 ? (
                <span className="absolute left-[58%] top-5 hidden h-[2px] w-[84%] bg-[#dce9df] sm:block" />
              ) : null}
              <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#0e8a66] text-white">
                {index === 0 ? <PackageCheck className="h-5 w-5" /> : <CircleDot className="h-4 w-4" />}
              </div>
              <p className="mt-3 text-sm font-semibold text-soil">{stage.label}</p>
              <p className="mt-1 text-xs text-soil/52">{stage.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
