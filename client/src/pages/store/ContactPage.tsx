import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { brand } from "../../config/brand";

const contactDetails = [
  { icon: Phone, label: "Phone", value: "+91 987 654 3210" },
  { icon: Mail, label: "Email", value: brand.supportEmail },
  { icon: MapPin, label: "Address", value: "123 Green Street, Apt 4B, New York, NY 10001, USA" },
  { icon: Clock3, label: "Working Hours", value: "Mon - Sat: 8:00 AM - 6:00 PM" }
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-5 shadow-[0_12px_30px_rgba(48,37,29,0.06)] sm:p-6">
        <div className="text-sm text-soil/50">Home &gt; Contact Us</div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[1.4rem] border border-soil/8 bg-[#fbfaf8] p-5">
            <h1 className="text-2xl font-bold text-soil">Contact Us</h1>
            <p className="mt-2 text-sm text-soil/58">We would love to hear from you.</p>
            <div className="mt-6 space-y-4">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex gap-3">
                  <item.icon className="mt-0.5 h-5 w-5 text-[#0e8a66]" />
                  <div>
                    <p className="text-sm font-semibold text-soil">{item.label}</p>
                    <p className="mt-1 text-sm text-soil/58">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-soil/8 bg-white p-5">
            <h2 className="text-xl font-semibold text-soil">Send Us a Message</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <FormField label="Your Name" placeholder="John Doe" />
              <FormField label="Email Address" placeholder="john@email.com" />
            </div>
            <div className="mt-4">
              <FormField label="Subject" placeholder="Order support" />
            </div>
            <div className="mt-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-soil/72">Your Message</span>
                <textarea
                  rows={6}
                  className="rounded-[1rem] border border-soil/10 bg-white px-4 py-3 text-sm outline-none"
                  placeholder="Tell us how we can help."
                />
              </label>
            </div>
            <button className="mt-5 rounded-[0.9rem] bg-[#0e8a66] px-6 py-3 text-sm font-semibold text-white">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-soil/72">{label}</span>
      <input placeholder={placeholder} className="rounded-[1rem] border border-soil/10 bg-white px-4 py-3 text-sm outline-none" />
    </label>
  );
}
