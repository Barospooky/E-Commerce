import { ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAdminSessionStore } from "../store/adminSessionStore";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const setSession = useAdminSessionStore((state) => state.setSession);
  const [email, setEmail] = useState("admin@amplepro.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(email, password);
      if (response.data.user.role !== "ADMIN") {
        throw new Error("This account is not allowed to access admin.");
      }

      setSession(response.data.accessToken, response.data.user);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#10120d] px-4 text-cream">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0e8a66] text-white">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-moss/70">Admin login</p>
            <h1 className="text-2xl font-bold">Manage the storefront</h1>
          </div>
        </div>

        <label className="mt-8 block text-sm font-semibold text-cream/80">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none ring-0 transition focus:border-moss"
          />
        </label>

        <label className="mt-4 block text-sm font-semibold text-cream/80">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none ring-0 transition focus:border-moss"
          />
        </label>

        {error && <p className="mt-4 rounded-2xl bg-red-500/15 px-4 py-3 text-sm text-red-200">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-[#0e8a66] px-4 py-3 font-semibold text-white transition hover:bg-[#0c7256] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
