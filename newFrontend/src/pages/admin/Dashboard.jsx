import { ArrowUpRight, ShoppingBag, Store, Truck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { analyticsApi, authApi, orderApi, restaurantApi } from "../../services";
export default function Dashboard() {
  const [data, setData] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [restaurantCount, setRestaurantCount] = useState(null);
  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([
      analyticsApi.overview("7d"),
      authApi.adminUsers({ limit: 1 }),
      restaurantApi.adminList({ limit: 1 }),
      orderApi.admin(),
    ])
      .then(([a, u, r, o]) => {
        setData(a.data);
        setUserCount(u.data?.total || 0);
        setRestaurantCount(r.data?.total || 0);
        setUsers(u.data || []);
        setRestaurants(r.data || []);
        setOrders(o.data || []);
      })
      .catch((e) =>
        setError(e.response?.data?.message || "Unable to load admin dashboard"),
      );
  }, []);
  if (!data)
    return <div className="empty">{error || "Loading dashboard..."}</div>;
  return (
    <>
      <section className="dashboard-hero admin-hero">
        <div>
          <span className="hero-pill">● PLATFORM LIVE</span>
          <h2>FoodFlow command centre</h2>
          <p>Real-time operational data from the platform services.</p>
        </div>
        <div className="system-health">
          <span>Analytics period</span>
          <b>7 days</b>
          <small>{data.orders} orders recorded</small>
        </div>
      </section>
      <div className="stats">
        <Stat icon={Users} label="Customers / users" value={userCount ?? "—"} />
        <Stat icon={Store} label="Restaurants" value={restaurantCount ?? "—"} />
        <Stat icon={ShoppingBag} label="Orders" value={data.orders} />
        <Stat icon={Truck} label="Delivered" value={data.delivered} />
      </div>
      <div className="dashboard-grid-two">
        <div className="dashboard-panel">
          <div className="panel-head">
            <div>
              <small>ORDER FLOW</small>
              <h2>Recent orders</h2>
            </div>
            <span>{orders.length} loaded</span>
          </div>
          {orders.slice(0, 8).map((o) => (
            <div className="table-row" key={o._id}>
              <b>#{o.orderNumber || o._id.slice(-6)}</b>
              <span>₹{o.total}</span>
              <span className="status orange">{o.status}</span>
            </div>
          ))}
        </div>
        <div className="dashboard-panel">
          <div className="panel-head">
            <div>
              <small>PLATFORM</small>
              <h2>Key metrics</h2>
            </div>
          </div>
          <div className="activity">
            <div>
              <b>Revenue</b>
              <small>7 day gross order value</small>
            </div>
            <strong>₹{Math.round(data.revenue || 0)}</strong>
          </div>
          <div className="activity">
            <div>
              <b>Completion rate</b>
              <small>Delivered / all orders</small>
            </div>
            <strong>{data.completionRate}%</strong>
          </div>
          <div className="activity">
            <div>
              <b>Avg. delivery time</b>
              <small>Placed to delivered</small>
            </div>
            <strong>{data.averageOrderToDeliveryMinutes || 0} min</strong>
          </div>
        </div>
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
      <span className="positive">Live backend data</span>
    </div>
  );
}
