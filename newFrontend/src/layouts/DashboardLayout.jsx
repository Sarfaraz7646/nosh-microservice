import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { useAuthStore } from "../store/authStore";
export default function DashboardLayout({ role }) {
  const nav = useNavigate();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const hydrate = useAuthStore((s) => s.hydrate);
  useEffect(() => {
    if (token && !user) hydrate();
  }, [token, user, hydrate]);
  useEffect(() => {
    if (!token) nav("/auth/login", { replace: true });
    else if (user) {
      if (user.status !== "ACTIVE") {
        if (user.role === "DELIVERY_PARTNER")
          nav("/delivery/onboarding", { replace: true });
        else nav("/auth/login", { replace: true });
        return;
      }
      const expected =
        role === "Admin"
          ? "ADMIN"
          : role === "Restaurant"
            ? "RESTAURANT"
            : "DELIVERY_PARTNER";
      if (user.role !== expected) nav("/", { replace: true });
    }
  }, [token, user, role, nav]);
  if (!token || !user)
    return <div className="empty">Checking your account...</div>;
  return (
    <div className="dashboard-shell">
      <DashboardSidebar role={role} />
      <section className="dashboard-content">
        <DashboardHeader role={role} />
        <Outlet />
      </section>
    </div>
  );
}
