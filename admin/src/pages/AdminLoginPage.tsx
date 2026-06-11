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
    <div className="flex min-h-screen items-center justify-center bg-[#f6f5f1] px-4 text-soil">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-soil/8 bg-white p-8 shadow-[0_10px_24px_rgba(48,37,29,0.06)]"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center bg-[#0b7a57] text-white shadow-[0_10px_20px_rgba(11,122,87,0.18)]">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-soil/45">Admin login</p>
            <h1 className="text-2xl font-bold text-soil">Manage the storefront</h1>
          </div>
        </div>

        <label className="mt-8 block text-sm font-semibold text-soil/80">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full border border-soil/8 bg-[#f8f7f3] px-4 py-3 text-soil outline-none ring-0 transition focus:border-[#0e8a66]"
          />
        </label>

        <label className="mt-4 block text-sm font-semibold text-soil/80">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full border border-soil/8 bg-[#f8f7f3] px-4 py-3 text-soil outline-none ring-0 transition focus:border-[#0e8a66]"
          />
        </label>

          {error && <p className="mt-4 bg-red-500/10 px-4 py-3 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-[#0e8a66] px-4 py-3 font-semibold text-white transition hover:bg-[#0c7256] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
