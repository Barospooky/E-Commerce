import { Plus } from "lucide-react";

const coupons = [
  { code: "WELCOME20", discount: "20% OFF", minOrder: "$50.00", usage: "120 / 500", validUntil: "June 30, 2024", status: "Active" },
  { code: "SAVE15", discount: "15% OFF", minOrder: "$30.00", usage: "80 / 300", validUntil: "May 31, 2024", status: "Active" },
  { code: "FREESHIP", discount: "Free Shipping", minOrder: "$25.00", usage: "250 / 1000", validUntil: "June 15, 2024", status: "Active" },
  { code: "SUMMER10", discount: "10% OFF", minOrder: "$30.00", usage: "60 / 200", validUntil: "May 25, 2024", status: "Inactive" },
  { code: "ORGANICS", discount: "5% OFF", minOrder: "$10.00", usage: "150 / 500", validUntil: "June 10, 2024", status: "Active" }
];

export default function AdminCouponsPage() {
  return (
    <div className="space-y-4 text-soil">
      <section className="rounded-[20px] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-[1.7rem] font-semibold tracking-[-0.04em] text-soil">Coupons & Offers</h1>
            <p className="mt-1 text-sm text-soil/70">Create and manage discounts and offers.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-[12px] bg-[#ff7b47] px-4 py-2.5 text-sm font-semibold text-white">
            <Plus className="h-4 w-4" />
            Create Coupon
          </button>
        </div>
      </section>

      <section className="rounded-[20px] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="overflow-hidden rounded-[16px] border border-soil/8">
          <table className="w-full text-left text-[0.82rem]">
            <thead className="bg-[#f8f7f3] text-soil/70">
              <tr>
                <th className="px-4 py-3 font-medium">Coupon Code</th>
                <th className="px-4 py-3 font-medium">Discount</th>
                <th className="px-4 py-3 font-medium">Min. Order</th>
                <th className="px-4 py-3 font-medium">Usage</th>
                <th className="px-4 py-3 font-medium">Valid Until</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.code} className="border-t border-soil/8">
                  <td className="px-4 py-3 font-medium text-[#0e8a66]">{coupon.code}</td>
                  <td className="px-4 py-3">{coupon.discount}</td>
                  <td className="px-4 py-3">{coupon.minOrder}</td>
                  <td className="px-4 py-3">{coupon.usage}</td>
                  <td className="px-4 py-3">{coupon.validUntil}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${coupon.status === "Active" ? "bg-[#e5f7e8] text-[#0e8a66]" : "bg-[#fff1df] text-[#ff7b47]"}`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-soil/70">⋮</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
