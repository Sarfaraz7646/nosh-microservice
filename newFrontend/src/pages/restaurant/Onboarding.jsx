import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, CheckCircle2 } from "lucide-react";
import { restaurantApi } from "../../services";
export default function Onboarding() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    cuisine: "North Indian",
    phone: "",
    email: "",
    address: { line1: "", city: "New Delhi", state: "Delhi", pincode: "" },
    coverImage: "",
    logo: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        cuisine: form.cuisine
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      };
      await restaurantApi.create(payload);
      nav("/restaurant");
    } catch (e) {
      setError(e.response?.data?.message || "Could not create restaurant");
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="section">
      <div className="page-heading">
        <small>RESTAURANT ONBOARDING</small>
        <h1>Create your restaurant</h1>
        <p>Your restaurant will remain pending until an admin approves it.</p>
      </div>
      {error && <div className="form-error">{error}</div>}
      <form className="checkout-card" onSubmit={submit}>
        <h2>
          <Store /> Restaurant profile
        </h2>
        <div className="inline-form">
          <input
            placeholder="Restaurant name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Cuisine, comma separated"
            required
            value={form.cuisine}
            onChange={(e) => setForm({ ...form, cuisine: e.target.value })}
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Address"
            required
            value={form.address.line1}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, line1: e.target.value },
              })
            }
          />
          <input
            placeholder="City"
            required
            value={form.address.city}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, city: e.target.value },
              })
            }
          />
          <input
            placeholder="State"
            required
            value={form.address.state}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, state: e.target.value },
              })
            }
          />
          <input
            placeholder="Pincode"
            required
            value={form.address.pincode}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, pincode: e.target.value },
              })
            }
          />
        </div>
        <label>
          Description
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <button disabled={loading} className="btn primary">
          {loading ? "Submitting..." : "Submit restaurant"}{" "}
          <CheckCircle2 size={16} />
        </button>
      </form>
    </section>
  );
}
