import { useEffect, useState } from "react";
import { authApi } from "../../services";
export default function Users() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const load = () =>
    authApi
      .adminUsers({ search: search || undefined, limit: 200 })
      .then((r) => setData(r.data?.users || []))
      .catch((e) =>
        setError(e.response?.data?.message || "Unable to load users"),
      );
  useEffect(() => {
    load();
  }, []);
  async function status(id, value) {
    try {
      await authApi.adminUserStatus(id, value);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not update user");
    }
  }
  return (
    <>
      <div className="panel-head">
        <div>
          <small>USER MANAGEMENT</small>
          <h2>Users</h2>
        </div>
        <input
          className="dash-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
          placeholder="Search users"
        />
      </div>
      {error && <div className="form-error">{error}</div>}
      <div className="dashboard-panel">
        {!data.length && <p>No users found.</p>}
        {data.map((u) => (
          <div className="table-row" key={u._id}>
            <div className="user-cell">
              <div className="avatar">
                {(u.name || "U").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <b>{u.name}</b>
                <small>
                  {u.email} • {u.role}
                </small>
              </div>
            </div>
            <span
              className={`status ${u.status === "ACTIVE" ? "green" : "orange"}`}
            >
              {u.status}
            </span>
            <select
              value={u.status}
              onChange={(e) => status(u._id, e.target.value)}
            >
              <option>ACTIVE</option>
              <option>PENDING</option>
              <option>SUSPENDED</option>
              <option>REJECTED</option>
            </select>
          </div>
        ))}
      </div>
    </>
  );
}
