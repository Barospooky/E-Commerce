import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdminSessionStore } from "../store/adminSessionStore";

export default function RequireAdmin() {
  const session = useAdminSessionStore((state) => state);
  const [hydrated, setHydrated] = useState(useAdminSessionStore.persist.hasHydrated());

  useEffect(() => {
    if (hydrated) {
      return;
    }

    const unsubscribe = useAdminSessionStore.persist.onFinishHydration(() => setHydrated(true));
    return unsubscribe;
  }, [hydrated]);

  if (!hydrated) {
    return null;
  }

  if (!session.accessToken || session.user?.role !== "ADMIN") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
