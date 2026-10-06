import { Bike, CheckCircle2, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import { adminApi } from "../../services";
export default function DeliveryPartners() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const load = () =>
    adminApi
      .partnerApplications()
      .then((r) => setData(r.data?.applications || []))
      .catch((e) =>
        setError(e.response?.data?.message || "Unable to load applications"),
      );
  useEffect(() => {
    load();
  }, []);
  async function action(applicationId, a) {
    try {
      if (a === "VERIFY") await adminApi.partnerVerify(applicationId);
      if (a === "REJECT")
        await adminApi.partnerReject(applicationId, {
          reason: "Application rejected by admin",
        });
      if (a === "SUSPEND") await adminApi.partnerSuspend(applicationId);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Action failed");
    }
  }
  return (
    <>
      <div className="panel-head">
        <div>
          <small>OPERATIONS</small>
          <h2>Delivery Partners</h2>
        </div>
        <span>{data.length} applications</span>
      </div>
      {error && <div className="form-error">{error}</div>}
      <div className="dashboard-panel">
        {!data.length && <p>No applications found.</p>}
        {data.map((x) => (
          <div className="table-row" key={x.applicationId || x._id}>
            <div className="user-cell">
              <div className="stat-icon">
                <Bike size={17} />
              </div>
              <div>
                <b>{x.applicationId}</b>
                <small>
                  {x.userId} • {x.vehicle?.type || "Vehicle not supplied"} •{" "}
                  {x.vehicle?.number || "—"}
                </small>
              </div>
            </div>
            <span
              className={`status ${x.status === "VERIFIED" ? "green" : "orange"}`}
            >
              {x.status}
            </span>
            <span>
              <Clock3 size={13} />{" "}
              {new Date(x.updatedAt || x.createdAt).toLocaleDateString()}
            </span>
            <div className="row-actions">
              {x.status !== "VERIFIED" && (
                <button
                  className="small-btn"
                  onClick={() => action(x.applicationId, "VERIFY")}
                >
                  Verify
                </button>
              )}
              {x.status !== "REJECTED" && (
                <button
                  className="small-btn"
                  onClick={() => action(x.applicationId, "REJECT")}
                >
                  Reject
                </button>
              )}
              {x.status === "VERIFIED" && (
                <button
                  className="small-btn"
                  onClick={() => action(x.applicationId, "SUSPEND")}
                >
                  Suspend
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
