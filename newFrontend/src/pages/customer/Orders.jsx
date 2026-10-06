import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { orderApi } from "../../services";
export default function Orders() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    orderApi
      .mine()
      .then((r) => setData(r.data))
      .catch((e) =>
        setError(e.response?.data?.message || "Please sign in to view orders"),
      );
  }, []);
  return (
    <section className="section">
      <div className="page-heading">
        <small>ORDER HISTORY</small>
        <h1>Your orders</h1>
        <p>Live order history from the Order Service.</p>
      </div>
      {error && (
        <div className="empty">
          <p>{error}</p>
          <Link to="/auth/login" className="btn primary">
            Sign in
          </Link>
        </div>
      )}
      {!error && !data.length && (
        <div className="empty">
          <Package size={48} />
          <h2>No orders yet</h2>
          <Link className="btn primary" to="/restaurants">
            Browse restaurants
          </Link>
        </div>
      )}
      {data.map((o) => (
        <div className="order-card" key={o._id}>
          <div className="order-icon">
            <Package />
          </div>
          <div className="order-info">
            <div className="row">
              <h3>Order #{o.orderNumber || o._id.slice(-6).toUpperCase()}</h3>
              <span className="status green">{o.status}</span>
            </div>
            <p>
              {o.items?.length || 0} items • {o.paymentStatus}
            </p>
            <small>
              {new Date(o.createdAt || o.placedAt).toLocaleString()} • ₹
              {o.total}
            </small>
          </div>
          <Link to={`/orders/${o._id}`}>
            <ArrowRight />
          </Link>
        </div>
      ))}
    </section>
  );
}
