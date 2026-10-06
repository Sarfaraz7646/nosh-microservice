import {
  ArrowUpRight,
  DollarSign,
  ShoppingBag,
  Star,
  TrendingUp,
  Power,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyticsApi, orderApi, restaurantApi } from "../../services";
export default function Dashboard() {
  const nav = useNavigate();
  const [r, setR] = useState(null);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const load = () =>
    Promise.all([
      restaurantApi.mine(),
      analyticsApi.overview("7d"),
      orderApi.restaurant(),
    ])
      .then(([a, b, c]) => {
        setR(a.data);
        setStats(b.data);
        setOrders(c.data || []);
      })
      .catch((e) => {
        if (e.response?.status === 404) nav("/restaurant/onboarding");
        else setError(e.response?.data?.message || "Unable to load dashboard");
      });
  useEffect(() => {
    load();
  }, []);
  async function toggle() {
    try {
      const x = await restaurantApi.toggleOpen();
      setR(x.data);
    } catch (e) {
      setError(
        e.response?.data?.message || "Could not change restaurant status",
      );
    }
  }
  if (error && !r)
    return (
      <div className="empty">
        <p>{error}</p>
      </div>
    );
  if (!r || !stats)
    return <div className="empty">Loading restaurant dashboard...</div>;
  return (
    <>
      <section
        className="dashboard-hero"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(17,24,39,.93),rgba(17,24,39,.58),rgba(17,24,39,.1)),url(${r.coverImage || "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1500&q=85"})`,
        }}
      >
        <div>
          <span className="hero-pill">
            ● {r.isOpen ? "LIVE RESTAURANT" : "RESTAURANT OFFLINE"}
          </span>
          <h2>{r.name}</h2>
          <p>
            {r.status} • {(r.cuisine || []).join(" • ")}
          </p>
          <button className="btn light" onClick={toggle}>
            <Power size={16} />
            {r.isOpen ? "Go offline" : "Go online"}
          </button>
        </div>
        <div className="hero-badge">
          <span>7 day revenue</span>
          <b>₹{Math.round(stats.revenue || 0)}</b>
          <small>{stats.orders} orders</small>
        </div>
      </section>
      {error && <div className="form-error">{error}</div>}
      <div className="stats">
        <Stat icon={ShoppingBag} label="Orders" value={stats.orders || 0} />
        <Stat
          icon={DollarSign}
          label="Revenue"
          value={`₹${Math.round(stats.revenue || 0)}`}
        />
        <Stat
          icon={Star}
          label="Customer rating"
          value={Number(r.rating || 0).toFixed(1)}
        />
        <Stat
          icon={TrendingUp}
          label="Completion"
          value={`${stats.completionRate || 0}%`}
        />
      </div>
      <div className="dashboard-panel">
        <div className="panel-head">
          <div>
            <small>LIVE QUEUE</small>
            <h2>Recent orders</h2>
          </div>
          <span>{orders.length} loaded</span>
        </div>
        {orders.slice(0, 8).map((o) => (
          <div className="table-row" key={o._id}>
            <b>#{o.orderNumber || o._id.slice(-6)}</b>
            <span>{o.items?.length || 0} items</span>
            <span>₹{o.total}</span>
            <span className="status orange">{o.status}</span>
          </div>
        ))}
        {!orders.length && <p>No orders yet.</p>}
      </div>
    </>
  );
}
function Stat({ icon: Icon, label, value }) {
  return (
    <div className="stat">
      <div className="stat-top">
        <div className="stat-icon">
          <Icon />
        </div>
        <span className="stat-arrow">
          <ArrowUpRight size={14} />
        </span>
      </div>
      <small>{label}</small>
      <h2>{value}</h2>
      <span className="positive">Live data</span>
    </div>
  );
}
