import { Bell, Check, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { notificationApi } from "../services";
export default function Notifications() {
  const [data, setData] = useState({ notifications: [], unread: 0 });
  const [error, setError] = useState("");
  const load = () =>
    notificationApi
      .list()
      .then((r) => setData(r.data || { notifications: [], unread: 0 }))
      .catch((e) =>
        setError(e.response?.data?.message || "Unable to load notifications"),
      );
  useEffect(() => {
    load();
  }, []);
  async function read(id) {
    await notificationApi.read(id);
    load();
  }
  async function remove(id) {
    await notificationApi.remove(id);
    load();
  }
  return (
    <section className="section">
      <div className="page-heading">
        <small>NOTIFICATIONS</small>
        <h1>Notification centre</h1>
        <p>{data.unread || 0} unread notifications.</p>
      </div>
      {error && <div className="form-error">{error}</div>}
      <button
        className="btn ghost"
        onClick={() => notificationApi.readAll().then(load)}
      >
        Mark all as read
      </button>
      <div className="dashboard-panel" style={{ marginTop: 18 }}>
        {!(data.notifications || []).length && (
          <div className="empty">
            <Bell />
            <p>No notifications.</p>
          </div>
        )}
        {(data.notifications || []).map((n) => (
          <div className="table-row" key={n._id}>
            <div>
              <b>{n.title}</b>
              <small>{n.message}</small>
              <small>{new Date(n.createdAt).toLocaleString()}</small>
            </div>
            <span className={`status ${n.readAt ? "green" : "orange"}`}>
              {n.readAt ? "Read" : "Unread"}
            </span>
            <div className="row-actions">
              {!n.readAt && (
                <button className="small-btn" onClick={() => read(n._id)}>
                  <Check size={13} /> Read
                </button>
              )}
              <button className="small-btn" onClick={() => remove(n._id)}>
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
