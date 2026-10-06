import { useEffect, useState } from "react";
import { orderApi } from "../../services";
export default function Orders() {
  const [data, setData] = useState([]);
  useEffect(() => {
    orderApi
      .admin()
      .then((r) => setData(r.data))
      .catch(() => {});
  }, []);
  return (
    <div className="dashboard-panel">
      <div className="panel-head">
        <div>
          <small>GLOBAL ORDERS</small>
          <h2>All orders</h2>
        </div>
        <span>{data.length} loaded</span>
      </div>
      {!data.length && <p>No orders available.</p>}
      {data.map((o) => (
        <div className="table-row" key={o._id}>
          <b>#{o.orderNumber || o._id.slice(-6)}</b>
          <span>{o.restaurantId}</span>
          <span>₹{o.total}</span>
          <span className="status orange">{o.status}</span>
        </div>
      ))}
    </div>
  );
}
