import { useEffect, useState } from "react";
import { orderApi } from "../../services";
const next = {
  PLACED: "CONFIRMED",
  CONFIRMED: "PREPARING",
  PREPARING: "READY_FOR_PICKUP",
};
export default function Orders() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const load = () =>
    orderApi
      .restaurant()
      .then((r) => setData(r.data))
      .catch((e) =>
        setError(
          e.response?.data?.message || "Unable to load restaurant orders",
        ),
      );
  useEffect(() => {
    load();
  }, []);
  async function update(id, status) {
    try {
      await orderApi.restaurantStatus(id, { status });
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Unable to update order");
    }
  }
  return (
    <div className="dashboard-panel">
      <div className="panel-head">
        <div>
          <small>LIVE QUEUE</small>
          <h2>Restaurant orders</h2>
        </div>
        <span className="status green">{data.length} orders</span>
      </div>
      {error && <p>{error}</p>}
      {!data.length && !error && <p>No orders yet.</p>}
      {data.map((o) => (
        <div className="table-row" key={o._id}>
          <div>
            <b>#{o.orderNumber || o._id.slice(-6)}</b>
            <small>
              {o.items?.length || 0} items • ₹{o.total}
            </small>
          </div>
          <span>{o.status}</span>
          {next[o.status] ? (
            <button
              className="small-btn"
              onClick={() => update(o._id, next[o.status])}
            >
              Set {next[o.status]}
            </button>
          ) : (
            <small>—</small>
          )}
        </div>
      ))}
    </div>
  );
}
