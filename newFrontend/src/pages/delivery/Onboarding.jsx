import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Upload, ShieldCheck } from "lucide-react";
import { partnerApi } from "../../services";
export default function Onboarding() {
  const nav = useNavigate();
  const [app, setApp] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    dateOfBirth: "",
    vehicleType: "BIKE",
    vehicleNumber: "",
    vehicleModel: "",
    licenseNumber: "",
    accountHolderName: "",
    accountNumber: "",
    ifsc: "",
  });
  const load = () =>
    partnerApi
      .application()
      .then((r) => {
        setApp(r.data.application);
        const a = r.data.application;
        setForm((f) => ({
          ...f,
          dateOfBirth: a.personal?.dateOfBirth?.slice(0, 10) || "",
          vehicleType: a.vehicle?.type || f.vehicleType,
          vehicleNumber: a.vehicle?.number || "",
          vehicleModel: a.vehicle?.model || "",
          licenseNumber: a.licenseNumber || "",
          accountHolderName: a.bank?.accountHolderName || "",
          ifsc: a.bank?.ifsc || "",
        }));
      })
      .catch((e) => {
        if (e.response?.status !== 404)
          setError(e.response?.data?.message || "Unable to load application");
      });
  useEffect(() => {
    load();
  }, []);
  async function save(e) {
    e.preventDefault();
    try {
      const r = await partnerApi.save(form);
      setApp(r.data.application);
      setError("Application saved. Upload your documents below.");
    } catch (e) {
      setError(e.response?.data?.message || "Could not save application");
    }
  }
  async function upload(type, file) {
    if (!file) return;
    try {
      const fd = new FormData();
      fd.append("type", type);
      fd.append("document", file);
      const r = await partnerApi.upload(fd);
      setApp(r.data.application);
      setError("Document uploaded successfully.");
    } catch (e) {
      setError(e.response?.data?.message || "Upload failed");
    }
  }
  return (
    <section className="section">
      <div className="page-heading">
        <small>DELIVERY PARTNER</small>
        <h1>Verification onboarding</h1>
        <p>
          Complete your profile and upload documents. You can go online only
          after admin verification.
        </p>
      </div>
      {error && <div className="form-error">{error}</div>}
      <div className="checkout-layout">
        <form className="checkout-card" onSubmit={save}>
          <h2>Partner details</h2>
          {[
            ["dateOfBirth", "Date of birth", "date"],
            ["vehicleNumber", "Vehicle number", "text"],
            ["vehicleModel", "Vehicle model", "text"],
            ["licenseNumber", "Driving license number", "text"],
            ["accountHolderName", "Account holder name", "text"],
            ["accountNumber", "Bank account number", "text"],
            ["ifsc", "IFSC", "text"],
          ].map(([k, l, t]) => (
            <label key={k}>
              {l}
              <input
                type={t}
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                required={k !== "accountNumber" || true}
              />
            </label>
          ))}
          <label>
            Vehicle type
            <select
              value={form.vehicleType}
              onChange={(e) =>
                setForm({ ...form, vehicleType: e.target.value })
              }
            >
              <option>BIKE</option>
              <option>SCOOTER</option>
              <option>CAR</option>
              <option>BICYCLE</option>
              <option>OTHER</option>
            </select>
          </label>
          <button className="btn primary full">Save application</button>
        </form>
        <div>
          <div className="checkout-card">
            <h2>
              <ShieldCheck />
              Verification status
            </h2>
            <div className="address selected">
              <b>{app?.applicationId || "Not submitted"}</b>
              <p>{app?.status || "PENDING"} • Admin review required.</p>
            </div>
          </div>
          <div className="checkout-card">
            <h2>
              <Upload />
              Documents
            </h2>
            {[
              ["DRIVING_LICENSE", "Driving license"],
              ["GOVERNMENT_ID", "Government ID"],
              ["VEHICLE_RC", "Vehicle RC"],
              ["PROFILE_PHOTO", "Profile photo"],
            ].map(([type, label]) => (
              <label className="payment-option" key={type}>
                <span>
                  <b>{label}</b>
                  <small>
                    {app?.documents?.some((d) => d.type === type)
                      ? "Uploaded"
                      : "Required"}
                  </small>
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => upload(type, e.target.files?.[0])}
                />
              </label>
            ))}
          </div>
          {app?.status === "VERIFIED" && (
            <button
              className="btn primary full"
              onClick={() => nav("/delivery")}
            >
              Open delivery dashboard <CheckCircle2 />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
