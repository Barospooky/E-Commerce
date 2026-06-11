import { Filter, Search } from "lucide-react";

const customers = [
  { name: "John Doe", email: "john.doe@email.com", phone: "+1 987 654 3210", orders: 12, spent: "$1,245.50", status: "Active" },
  { name: "Jane Smith", email: "jane.smith@email.com", phone: "+1 054 321 3000", orders: 8, spent: "$845.30", status: "Active" },
  { name: "Robert Johnson", email: "robert.j@email.com", phone: "+1 654 321 0897", orders: 15, spent: "$1,976.00", status: "Active" },
  { name: "Emily Davis", email: "emily.d@email.com", phone: "+1 654 321 0118", orders: 6, spent: "$453.45", status: "Inactive" },
  { name: "Michael Brown", email: "michael.b@email.com", phone: "+1 521 310 9876", orders: 9, spent: "$908.10", status: "Active" }
];

function Badge({ label }: { label: string }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${label === "Active" ? "bg-[#e5f7e8] text-[#0e8a66]" : "bg-[#fff1df] text-[#ff7b47]"}`}>{label}</span>;
}

export default function AdminCustomersPage() {
  return (
    <div className="space-y-4 text-soil">
      <section className="rounded-[20px] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <h1 className="text-[1.7rem] font-semibold tracking-[-0.04em] text-soil">Customers</h1>
        <p className="mt-1 text-sm text-soil/70">Manage your customers and their details.</p>
      </section>

      <section className="rounded-[20px] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr_auto]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-soil/45" />
            <input placeholder="Search customers..." className="w-full rounded-[12px] border border-soil/8 px-10 py-2.5 text-sm outline-none" />
          </label>
          <select className="rounded-[12px] border border-soil/8 bg-white px-4 py-2.5 text-sm outline-none">
            <option>All Status</option>
          </select>
          <button className="inline-flex items-center gap-2 rounded-[12px] border border-soil/8 bg-white px-4 py-2.5 text-sm text-soil">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-[16px] border border-soil/8">
          <table className="w-full text-left text-[0.82rem]">
            <thead className="bg-[#f8f7f3] text-soil/70">
              <tr>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Total Orders</th>
                <th className="px-4 py-3 font-medium">Total Spent</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.email} className="border-t border-soil/8">
                  <td className="px-4 py-3 font-medium text-soil">{customer.name}</td>
                  <td className="px-4 py-3 text-soil/70">{customer.email}</td>
                  <td className="px-4 py-3 text-soil/70">{customer.phone}</td>
                  <td className="px-4 py-3">{customer.orders}</td>
                  <td className="px-4 py-3">{customer.spent}</td>
                  <td className="px-4 py-3">
                    <Badge label={customer.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
