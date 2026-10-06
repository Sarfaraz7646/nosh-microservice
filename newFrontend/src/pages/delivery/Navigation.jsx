import { MapPin, Navigation as NavigationIcon, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { deliveryApi } from "../../services";
import LiveMap from "../../components/maps/LiveMap";
export default function Navigation() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
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
        setError(e.response?.data?.message || "Unable to load navigation"),
      );
  }, []);
  useEffect(() => {
    if (!data?.order) return;
    let timer;
    const send = () =>
      navigator.geolocation?.getCurrentPosition(async (p) => {
        const point = [p.coords.latitude, p.coords.longitude];
        setLocation(point);
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
      });
    send();
    timer = setInterval(send, 15000);
    return () => clearInterval(timer);
  }, [data?.order]);
  if (error)
    return (
      <div className="empty">
        <p>{error}</p>
      </div>
    );
  if (!data) return <div className="empty">Loading navigation...</div>;
  if (!data.order)
    return (
      <div className="empty">
        <NavigationIcon size={48} />
        <h2>No active delivery</h2>
      </div>
    );
  const o = data.order;
  return (
    <>
      <div className="active-head">
        <div>
          <small>LIVE ROUTE</small>
          <h2>Navigation</h2>
          <p>
            {o.deliveryAddress?.line1}, {o.deliveryAddress?.city}
          </p>
        </div>
        <span className="status green">
          {data.assignment?.etaMinutes || 0} min ETA
        </span>
      </div>
      <div className="dashboard-panel" style={{ marginTop: 18 }}>
        <LiveMap
          partnerLocation={location}
          customerLocation={[28.6139, 77.209]}
          height={480}
        />
        <div className="row" style={{ marginTop: 18 }}>
          <div>
            <b>Customer destination</b>
            <small
              style={{ display: "block", color: "var(--muted)", marginTop: 4 }}
            >
              {o.deliveryAddress?.line1}, {o.deliveryAddress?.city}{" "}
              {o.deliveryAddress?.pincode}
            </small>
          </div>
          <a
            className="btn ghost"
            href={`tel:${o.deliveryAddress?.phone || ""}`}
          >
            <Phone size={14} />
            Call customer
          </a>
        </div>
      </div>
    </>
  );
}
