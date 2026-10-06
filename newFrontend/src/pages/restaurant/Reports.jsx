import { BarChart3, TrendingUp, ShoppingBag, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { analyticsApi } from "../../services";
export default function Reports() {
  const [data, setData] = useState(null);
  const [sales, setSales] = useState([]);
  const [top, setTop] = useState([]);
  const [period, setPeriod] = useState("30d");
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([
      analyticsApi.overview(period),
      analyticsApi.sales(period),
      analyticsApi.topItems(period),
    ])
      .then(([a, b, c]) => {
        setData(a.data);
        setSales(b.data.data || []);
        setTop(c.data.data || []);
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
    ["Revenue", `₹${Math.round(data.revenue || 0)}`, IndianRupee],
    ["Orders", data.orders, ShoppingBag],
    ["Delivered", data.delivered, TrendingUp],
    ["Completion", `${data.completionRate}%`, BarChart3],
  ];
  const max = Math.max(...sales.map((x) => x.revenue), 1);
  return (
    <>
      <div className="panel-head">
        <div>
          <small>PERFORMANCE</small>
          <h2>Reports & Analytics</h2>
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
            <h2>Revenue</h2>
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
            <h2>Top items</h2>
            <span>Units sold</span>
          </div>
          {top.map((x) => (
            <div className="table-row" key={x.name}>
              <b>{x.name}</b>
              <span>{x.quantity} units</span>
              <strong>₹{x.revenue}</strong>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
