import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Utensils,
  Wallet,
  Users,
  BarChart3,
  LogOut,
  Truck,
  Tag,
  Navigation,
  History,
  Store,
} from "lucide-react";

const roleLinks = {
  Restaurant: [
    ["", "Dashboard", LayoutDashboard],
    ["orders", "Orders", ClipboardList],
    ["menu", "Menu", Utensils],
    ["offers", "Offers", Tag],
    ["reports", "Reports", BarChart3],
  ],
  "Delivery Partner": [
    ["", "Dashboard", LayoutDashboard],
    ["requests", "Requests", Truck],
    ["active", "Active Delivery", Truck],
    ["navigation", "Navigation", Navigation],
    ["earnings", "Earnings", Wallet],
    ["history", "History", History],
  ],
  Admin: [
    ["", "Dashboard", LayoutDashboard],
    ["users", "Users", Users],
    ["restaurants", "Restaurants", Store],
    ["orders", "Orders", ClipboardList],
    ["delivery-partners", "Delivery Partners", Truck],
    ["analytics", "Analytics", BarChart3],
  ],
};

export default function DashboardSidebar({ role }) {
  const location = useLocation();
  const base =
    role === "Restaurant"
      ? "/restaurant"
      : role === "Delivery Partner"
        ? "/delivery"
        : "/admin";
  const links = roleLinks[role] ?? roleLinks.Admin;

  return (
    <aside className="sidebar">
      <Link to="/" className="brand side-brand">
        <span className="brand-mark">F</span>
        FoodFlow
      </Link>

      <div className="role-badge">{role}</div>

      <nav aria-label={`${role} navigation`}>
        {links.map(([path, label, Icon]) => {
          const target = path ? `${base}/${path}` : base;
          const active = location.pathname === target;

          return (
            <Link className={active ? "active" : ""} to={target} key={label}>
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <Link className="side-logout" to="/">
        <LogOut size={18} />
        <span>Exit portal</span>
      </Link>
    </aside>
  );
}
