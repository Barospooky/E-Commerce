import { LayoutDashboard, LogOut, PackageSearch, Store } from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminSessionStore } from "../store/adminSessionStore";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/", label: "Storefront", icon: Store }
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const clearSession = useAdminSessionStore((state) => state.clearSession);
  const user = useAdminSessionStore((state) => state.user);

  return (
    <div className="min-h-screen bg-[#10120d] text-cream">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-4 lg:px-8">
        <aside className="hidden w-72 flex-col rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur lg:flex">
          <Link to="/admin" className="flex items-center gap-3 border-b border-white/10 pb-5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0e8a66] text-white shadow-[0_12px_24px_rgba(14,138,102,0.25)]">
              <PackageSearch className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-moss/70">Admin</p>
              <h1 className="text-lg font-bold">Ample Organic</h1>
            </div>
          </Link>

          <nav className="mt-6 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-white/10 text-white" : "text-cream/65 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-[1.4rem] border border-white/10 bg-black/20 p-4 text-sm text-cream/70">
            <p className="font-semibold text-cream">{user?.email ?? "Admin user"}</p>
            <p className="mt-1">Use this area to manage products and storefront content.</p>
            <button
              type="button"
              onClick={() => {
                clearSession();
                navigate("/admin/login");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-cream transition hover:bg-white/15"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
