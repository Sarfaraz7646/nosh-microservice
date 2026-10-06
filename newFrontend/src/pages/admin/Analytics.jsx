import { BarChart3, Users, ShoppingBag, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { analyticsApi } from "../../services";
export default function Analytics() {
  const [data, setData] = useState(null);
  const [sales, setSales] = useState([]);
  const [status, setStatus] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [period, setPeriod] = useState("30d");
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([
      analyticsApi.overview(period),
      analyticsApi.sales(period),
      analyticsApi.status(period),
      analyticsApi.delivery(period),
    ])
      .then(([a, b, c, d]) => {
        setData(a.data);
        setSales(b.data.data || []);
        setStatus(c.data.data || []);
        setDelivery(d.data.data || []);
      })
      .catch((e) =>
        setError(e.response?.data?.message || "Analytics unavailable"),
      );
  }, [period]);
  if (error)
    return (
      <div className="empty">
        <p>{error}</p>
      </div>
    );
  if (!data) return <div className="empty">Loading analytics...</div>;
  const cards = [
    ["Orders", data.orders, ShoppingBag],
    ["Revenue", `₹${Math.round(data.revenue || 0)}`, IndianRupee],
    ["Delivered", data.delivered, Users],
    ["Completion", `${data.completionRate}%`, BarChart3],
  ];
  const max = Math.max(...sales.map((s) => s.revenue), 1);
  return (
    <>
      <div className="panel-head">
        <div>
          <small>INSIGHTS</small>
          <h2>Platform Analytics</h2>
        </div>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="7d">7 days</option>
          <option value="30d">30 days</option>
          <option value="90d">90 days</option>
          <option value="1y">1 year</option>
        </select>
      </div>
      <div className="stats">
        {cards.map(([label, value, Icon]) => (
          <div className="stat" key={label}>
            <div className="stat-icon">
              <Icon size={18} />
            </div>
            <small>{label}</small>
            <h2>{value}</h2>
            <span className="positive">Live analytics</span>
          </div>
        ))}
      </div>
      <div className="dashboard-grid-two">
        <div className="dashboard-panel">
          <div className="panel-head">
            <h2>Daily performance</h2>
            <span>{sales.length} days</span>
          </div>
          <div className="chart-bars">
            {sales.slice(-14).map((x) => (
              <div className="bar-wrap" key={x.date}>
                <span
                  style={{ height: `${Math.max(8, (x.revenue / max) * 100)}%` }}
                />
                <small>{x.date.slice(5)}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="dashboard-panel">
          <div className="panel-head">
            <h2>Order status</h2>
          </div>
          {status.map((x) => (
            <div className="table-row" key={x.status}>
              <b>{x.status}</b>
              <span>{x.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="dashboard-panel">
        <div className="panel-head">
          <h2>Delivery performance</h2>
          <span>{delivery.length} partners</span>
        </div>
        {delivery.slice(0, 10).map((x) => (
          <div className="table-row" key={x.deliveryPartnerId}>
            <b>{x.deliveryPartnerId}</b>
            <span>
              {x.delivered}/{x.orders} delivered
            </span>
            <span>{x.completionRate}%</span>
            <span>{x.avgDeliveryMinutes} min</span>
          </div>
        ))}
      </div>
    </>
  );
}
