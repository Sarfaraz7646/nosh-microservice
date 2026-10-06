import { Check, Navigation, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { deliveryApi } from "../../services";
import LiveMap from "../../components/maps/LiveMap";
export default function ActiveDelivery() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const load = () =>
    deliveryApi
      .active()
      .then((r) => {
        setData(r.data);
        if (r.data?.assignment?.lastLocation)
          setLocation([
            r.data.assignment.lastLocation.lat,
            r.data.assignment.lastLocation.lng,
          ]);
      })
      .catch((e) =>
        setError(e.response?.data?.message || "Unable to load active delivery"),
      );
  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    if (!data?.order) return;
    const id = setInterval(
      () =>
        navigator.geolocation?.getCurrentPosition(async (p) => {
          setLocation([p.coords.latitude, p.coords.longitude]);
          try {
            await deliveryApi.location({
              orderId: data.order._id,
              lat: p.coords.latitude,
              lng: p.coords.longitude,
              accuracy: p.coords.accuracy,
              heading: p.coords.heading,
              speed: p.coords.speed,
            });
          } catch {}
        }),
      15000,
    );
    return () => clearInterval(id);
  }, [data?.order]);
  async function update(status) {
    try {
      const r = await deliveryApi.status(data.order._id, status);
      setData({ ...data, order: r.data.order, assignment: r.data.assignment });
    } catch (e) {
      setError(e.response?.data?.message || "Could not update delivery");
    }
  }
  if (error && !data)
    return (
      <div className="empty">
        <p>{error}</p>
      </div>
    );
  if (!data) return <div className="empty">Loading active delivery...</div>;
  const o = data.order;
  if (!o)
    return (
      <div className="empty">
        <Navigation size={48} />
        <h2>No active delivery</h2>
        <p>Accept a request to see it here.</p>
      </div>
    );
  return (
    <div>
      <div className="active-head">
        <div>
          <small>ACTIVE DELIVERY</small>
          <h2>#{o.orderNumber || o._id.slice(-6)}</h2>
          <p>
            {o.deliveryAddress?.line1}, {o.deliveryAddress?.city}
          </p>
        </div>
        <span className="status orange">{o.status}</span>
      </div>
      {error && <div className="form-error">{error}</div>}
      <LiveMap
        partnerLocation={location}
        customerLocation={[28.6139, 77.209]}
        height={440}
      />
      <div className="delivery-steps">
        <Step
          done={[
            "ASSIGNED",
            "PICKED_UP",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
          ].includes(o.status)}
          title="Order accepted"
        />
        <Step
          done={["PICKED_UP", "OUT_FOR_DELIVERY", "DELIVERED"].includes(
            o.status,
          )}
          title="Order picked up"
        />
        <Step
          done={["OUT_FOR_DELIVERY", "DELIVERED"].includes(o.status)}
          title="Out for delivery"
        />
        <Step done={o.status === "DELIVERED"} title="Reach customer" />
      </div>
      {o.deliveryAddress?.phone && (
        <a className="btn ghost full" href={`tel:${o.deliveryAddress.phone}`}>
          <Phone /> Call customer
        </a>
      )}
      {o.status === "ASSIGNED" && (
        <button
          className="btn primary full"
          onClick={() => update("PICKED_UP")}
        >
          <Check /> Mark as picked up
        </button>
      )}
      {o.status === "PICKED_UP" && (
        <button
          className="btn primary full"
          onClick={() => update("OUT_FOR_DELIVERY")}
        >
          <Navigation /> Start delivery
        </button>
      )}
      {o.status === "OUT_FOR_DELIVERY" && (
        <button
          className="btn primary full"
          onClick={() => update("DELIVERED")}
        >
          <Check /> Mark as delivered
        </button>
      )}
    </div>
  );
}
function Step({ done, title }) {
  return (
    <div className="step">
      <span className={done ? "done" : ""}>{done && <Check size={14} />}</span>
      <b>{title}</b>
    </div>
  );
}
