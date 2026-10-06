import { Bell, LogOut, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useAuthStore } from "../../store/authStore";
import { notificationApi } from "../../services";
const meta = {
  Restaurant: {
    title: "Restaurant operations",
    subtitle: "Manage orders, menu, offers and performance.",
  },
  "Delivery Partner": {
    title: "Ready for your next delivery?",
    subtitle: "Stay online to receive nearby delivery requests.",
  },
  Admin: {
    title: "Platform overview",
    subtitle: "Monitor the FoodFlow ecosystem in real time.",
  },
};
export default function DashboardHeader({ role }) {
  const nav = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [unread, setUnread] = useState(0);
  const [toast, setToast] = useState("");
  const m = meta[role] || meta.Admin;
  useEffect(() => {
    notificationApi
      .list()
      .then((r) => setUnread(r.data.unread || 0))
      .catch(() => {});
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    const socket = io(
      import.meta.env.VITE_NOTIFICATION_SOCKET_URL || "http://localhost:4007",
      { auth: { token }, transports: ["websocket"] },
    );
    socket.on("notification:new", ({ notification }) => {
      setUnread((n) => n + 1);
      setToast(notification.title || notification.message);
      setTimeout(() => setToast(""), 4500);
    });
    return () => socket.disconnect();
  }, []);
  return (
    <header className="dash-top">
      <div className="dash-heading">
        <small>FOODFLOW • {role.toUpperCase()}</small>
        <h1>{m.title}</h1>
        <p>{m.subtitle}</p>
      </div>
      <div className="dash-actions">
        <label className="dash-search">
          <Search size={16} />
          <input placeholder="Search..." />
        </label>
        <button
          className="dash-icon-btn"
          onClick={() => nav("/notifications")}
          title={`${unread} unread notifications`}
        >
          <Bell size={18} />
          {unread > 0 && <i />}
        </button>
        <button className="profile-chip" onClick={logout}>
          <span>{(user?.name || "U").slice(0, 2).toUpperCase()}</span>
          <b>{user?.name || "Account"}</b>
          <LogOut size={14} />
        </button>
      </div>
      {toast && (
        <div className="notification-toast">
          <Bell size={16} />
          {toast}
        </div>
      )}
    </header>
  );
}
