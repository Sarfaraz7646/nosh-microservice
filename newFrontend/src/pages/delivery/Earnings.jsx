import { TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { deliveryApi } from "../../services";
export default function Earnings() {
  const [data, setData] = useState(null);
  useEffect(() => {
    deliveryApi
      .earnings()
      .then((r) => setData(r.data))
      .catch(() => setData({ today: 0, total: 0, deliveries: 0 }));
  }, []);
  if (!data) return <div className="empty">Loading earnings...</div>;
  return (
    <>
      <div className="stats">
        <div className="stat">
          <div className="stat-icon">
            <Wallet />
          </div>
          <small>Today</small>
          <h2>₹{data.today}</h2>
          <span className="positive">Live</span>
        </div>
        <div className="stat">
          <div className="stat-icon">
            <TrendingUp />
          </div>
          <small>Total earnings</small>
          <h2>₹{data.total}</h2>
          <span className="positive">{data.deliveries} deliveries</span>
        </div>
      </div>
      <div className="dashboard-panel">
        <div className="panel-head">
          <h2>Earnings summary</h2>
          <span>Delivery Service</span>
        </div>
        <p>Your earnings are calculated from completed delivery assignments.</p>
      </div>
    </>
  );
}
