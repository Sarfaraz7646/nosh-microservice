import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  PackageCheck,
  Wallet,
  Star,
  ShieldCheck,
  Power,
  Navigation,
} from "lucide-react";
import { useEffect, useState } from "react";
import { deliveryApi } from "../../services";
export default function Dashboard() {
  const [data, setData] = useState(null);
  const [verification, setVerification] = useState(null);
  const [error, setError] = useState("");
  const load = () =>
    Promise.all([
      deliveryApi.availability(),
      deliveryApi.verification(),
      deliveryApi.active(),
      deliveryApi.earnings(),
    ])
      .then(([a, v, active, e]) =>
        setData({
          availability: a.data,
          active: active.data,
          earnings: e.data,
          verification: v.data,
        }),
      )
      .catch((e) =>
        setError(
          e.response?.data?.message || "Unable to load delivery dashboard",
        ),
      );
  useEffect(() => {
    load();
  }, []);
  async function toggle() {
    try {
      await deliveryApi.setOnline(!data.availability?.online);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not change online status");
    }
  }
  if (!data)
    return (
      <div className="empty">{error || "Loading delivery dashboard..."}</div>
    );
  const o = data.active?.order;
  return (
    <>
      <div className="delivery-hero">
        <div>
          <span className="hero-pill green-pill">
            ● {data.availability?.online ? "YOU ARE ONLINE" : "YOU ARE OFFLINE"}
          </span>
          <h2>Keep moving, keep earning.</h2>
          <p>
            Verification: <b>{data.verification?.status || "PENDING"}</b>.{" "}
            {o
              ? `Active order #${o.orderNumber || o._id.slice(-6)}.`
              : "Go online after verification to receive requests."}
          </p>
          <div className="hero-mini-stats">
            <span>
              <b>—</b> customer rating
            </span>
            <span>
              <b>—</b> acceptance
            </span>
            <span>
              <b>₹{data.earnings?.total || 0}</b> lifetime earnings
            </span>
          </div>
        </div>
        <div className="delivery-map-mini">
          <Navigation size={38} />
          <span>Live GPS is enabled on Active Delivery</span>
        </div>
      </div>
      {error && <div className="form-error">{error}</div>}
      <div className="stats">
        <Stat
          icon={PackageCheck}
          label="Today's deliveries"
          value={data.earnings?.deliveries || 0}
        />
        <Stat
          icon={Wallet}
          label="Today's earnings"
          value={`₹${data.earnings?.today || 0}`}
        />
        <Stat icon={Star} label="Customer rating" value="—" />
        <Stat
          icon={ShieldCheck}
          label="Verification"
          value={data.verification?.status || "PENDING"}
        />
      </div>
      <div className="dashboard-panel">
        <div className="panel-head">
          <div>
            <small>AVAILABILITY</small>
            <h2>Partner status</h2>
          </div>
          <button
            className="btn primary"
            disabled={data.verification?.status !== "VERIFIED"}
            onClick={toggle}
          >
            <Power size={15} />
            {data.availability?.online ? "Go offline" : "Go online"}
          </button>
        </div>
        {data.verification?.status !== "VERIFIED" && (
          <p>Complete partner verification before going online.</p>
        )}
        {o && (
          <div className="request-card">
            <div>
              <b>Active delivery #{o.orderNumber || o._id.slice(-6)}</b>
              <p>
                <MapPin size={14} /> {o.deliveryAddress?.line1},{" "}
                {o.deliveryAddress?.city}
              </p>
            </div>
            <Link to="/delivery/active" className="btn primary">
              Open delivery <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
function Stat({ icon: Icon, label, value }) {
  return (
    <div className="stat">
      <div className="stat-icon">
        <Icon />
      </div>
      <small>{label}</small>
      <h2>{value}</h2>
      <span className="positive">Live service data</span>
    </div>
  );
}
