import { CheckCircle2, Clock3, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { deliveryApi } from "../../services";
export default function History() {
  const [data, setData] = useState([]);
  useEffect(() => {
    deliveryApi
      .history()
      .then((r) => setData(r.data))
      .catch(() => {});
  }, []);
  return (
    <>
      <div className="panel-head">
        <div>
          <small>DELIVERIES</small>
          <h2>Delivery History</h2>
        </div>
        <span>Completed deliveries</span>
      </div>
      <div className="dashboard-panel">
        {!data.length && <p>No completed deliveries yet.</p>}
        {data.map((x) => (
          <div className="table-row" key={x._id}>
            <div>
              <b>Order #{x.orderId}</b>
              <small>
                <MapPin size={11} /> Completed delivery
              </small>
            </div>
            <span>
              <Clock3 size={13} />{" "}
              {x.deliveredAt ? new Date(x.deliveredAt).toLocaleString() : ""}
            </span>
            <strong>₹{x.earning || 0}</strong>
            <span className="status green">
              <CheckCircle2 size={12} /> Delivered
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
