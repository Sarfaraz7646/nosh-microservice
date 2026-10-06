import { MapPin, Navigation, Clock3, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { deliveryApi } from "../../services";
export default function Requests() {
  const [data, setData] = useState({ requests: [] });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const load = () =>
    deliveryApi
      .requests()
      .then((r) => setData(r.data))
      .catch((e) =>
        setError(e.response?.data?.message || "Unable to load requests"),
      )
      .finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);
  async function accept(id) {
    try {
      await deliveryApi.accept(id);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not accept request");
    }
  }
  return (
    <div className="dashboard-panel">
      <div className="panel-head">
        <div>
          <small>AVAILABLE NOW</small>
          <h2>Delivery requests</h2>
        </div>
        <span>{data.requests?.length || 0} nearby</span>
      </div>
      {loading && <p>Loading requests...</p>}
      {error && <p>{error}</p>}
      {!loading && !data.requests?.length && !error && (
        <p>
          No delivery requests available. Make sure you are verified and online.
        </p>
      )}
      {data.requests?.map((o) => (
        <div className="request-card" key={o._id}>
          <div className="request-icon">
            <Navigation />
          </div>
          <div>
            <h3>Order #{o.orderNumber || o._id.slice(-6)}</h3>
            <p>
              <MapPin size={14} />{" "}
              {o.deliveryAddress?.city || "Customer location"}
            </p>
            <small>
              <Clock3 size={14} /> {o.items?.length || 0} items •{" "}
              {o.total ? "₹" + o.total : ""}
            </small>
          </div>
          <div className="request-pay">
            <b>
              <IndianRupee size={14} />
              {Math.round((o.total || 0) * 0.1)}
            </b>
            <button onClick={() => accept(o._id)} className="btn primary">
              Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
