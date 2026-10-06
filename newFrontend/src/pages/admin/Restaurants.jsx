import { Store, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { restaurantApi } from "../../services";
export default function Restaurants() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const load = () =>
    restaurantApi
      .adminList({ limit: 300 })
      .then((r) => setData(r.data?.restaurants || []))
      .catch((e) =>
        setError(e.response?.data?.message || "Unable to load restaurants"),
      );
  useEffect(() => {
    load();
  }, []);
  async function status(id, value) {
    try {
      await restaurantApi.adminStatus(id, value);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not update restaurant");
    }
  }
  return (
    <>
      <div className="panel-head">
        <div>
          <small>PLATFORM</small>
          <h2>Manage Restaurants</h2>
        </div>
        <span>{data.length} loaded</span>
      </div>
      {error && <div className="form-error">{error}</div>}
      <div className="dashboard-panel">
        {!data.length && <p>No restaurants found.</p>}
        {data.map((r) => (
          <div className="table-row" key={r._id}>
            <div className="user-cell">
              <div className="stat-icon">
                <Store size={17} />
              </div>
              <div>
                <b>{r.name}</b>
                <small>
                  <MapPin size={10} /> {r.address?.city || "—"} •{" "}
                  {(r.cuisine || []).join(", ")}
                </small>
              </div>
            </div>
            <span>★ {Number(r.rating || 0).toFixed(1)}</span>
            <select
              value={r.status}
              onChange={(e) => status(r._id, e.target.value)}
            >
              <option>PENDING</option>
              <option>UNDER_REVIEW</option>
              <option>APPROVED</option>
              <option>REJECTED</option>
              <option>SUSPENDED</option>
            </select>
          </div>
        ))}
      </div>
    </>
  );
}
