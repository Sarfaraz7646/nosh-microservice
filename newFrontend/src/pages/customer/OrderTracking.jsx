import { Link, useParams } from "react-router-dom";
import { Check, Clock3, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { orderApi } from "../../services";
import { connectSocket } from "../../services/realtime";
import LiveMap from "../../components/maps/LiveMap";
const center = [28.6139, 77.209];
export default function OrderTracking() {
  const { id } = useParams();
  const [o, setO] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let socket;
    orderApi
      .get(id)
      .then((r) => {
        setO(r.data);
        socket = connectSocket(
          import.meta.env.VITE_DELIVERY_SOCKET_URL || "http://localhost:4006",
          (s) => s.emit("order:join", id),
        );
        if (socket)
          socket.on("order:status:update", (e) => {
            if (String(e.orderId) === String(id))
              orderApi
                .get(id)
                .then((x) => setO(x.data))
                .catch(() => {});
          });
        if (socket)
          socket.on("delivery:location:update", (p) =>
            setLocation([Number(p.lat), Number(p.lng)]),
          );
      })
      .catch((e) =>
        setError(e.response?.data?.message || "Unable to load order"),
      );
    return () => socket?.disconnect();
  }, [id]);
  if (error)
    return (
      <section className="empty">
        <p>{error}</p>
      </section>
    );
  if (!o) return <section className="empty">Loading order...</section>;
  const history = o.statusHistory || [];
  return (
    <section className="section">
      <Link to="/orders" className="back">
        ← All orders
      </Link>
      <div className="tracking-head">
        <div>
          <small>ORDER {o.orderNumber || id}</small>
          <h1>{o.status.replaceAll("_", " ")}</h1>
          <p>Live status and delivery location.</p>
        </div>
        <div className="eta">
          <Clock3 />
          <b>{o.paymentStatus}</b>
          <span>payment</span>
        </div>
      </div>
      <div className="tracking-grid">
        <LiveMap
          partnerLocation={location}
          customerLocation={center}
          height={500}
        />
        <div className="tracking-card">
          <h2>Order timeline</h2>
          {history.map((x, i) => (
            <div className="timeline" key={`${x.status}-${i}`}>
              <span className="done">
                <Check size={14} />
              </span>
              <div>
                <b>{x.status.replaceAll("_", " ")}</b>
                <small>{x.at ? new Date(x.at).toLocaleString() : ""}</small>
              </div>
            </div>
          ))}
          <hr />
          <div className="partner">
            <div className="avatar">FF</div>
            <div>
              <b>
                {o.items?.length || 0} items • ₹{o.total}
              </b>
              <small>
                {o.deliveryAddress?.line1}, {o.deliveryAddress?.city}
              </small>
            </div>
            <Navigation size={18} />
          </div>
          {location && (
            <p className="positive">
              Delivery partner location is updating live.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
