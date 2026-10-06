import { Tag, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { offerApi, restaurantApi } from "../../services";
export default function Offers() {
  const [r, setR] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    code: "",
    type: "PERCENT",
    value: 10,
    minOrder: 0,
    maxDiscount: "",
    startsAt: "",
    endsAt: "",
    isActive: true,
  });
  const load = async () => {
    try {
      const a = await restaurantApi.mine();
      setR(a.data);
      const b = await offerApi.list(a.data._id);
      setData(b.data || []);
    } catch (e) {
      setError(e.response?.data?.message || "Unable to load offers");
    }
  };
  useEffect(() => {
    load();
  }, []);
  async function create(e) {
    e.preventDefault();
    try {
      await offerApi.create(r._id, {
        ...form,
        value: Number(form.value),
        minOrder: Number(form.minOrder || 0),
        maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : undefined,
      });
      setForm({
        code: "",
        type: "PERCENT",
        value: 10,
        minOrder: 0,
        maxDiscount: "",
        startsAt: "",
        endsAt: "",
        isActive: true,
      });
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not create offer");
    }
  }
  async function remove(x) {
    try {
      await offerApi.remove(r._id, x._id);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not delete offer");
    }
  }
  return (
    <>
      <div className="panel-head">
        <div>
          <small>MARKETING</small>
          <h2>Offers & Coupons</h2>
        </div>
        <span>{data.length} offers</span>
      </div>
      {error && <div className="form-error">{error}</div>}
      <div className="dashboard-panel">
        <form className="inline-form" onSubmit={create}>
          <input
            placeholder="Code"
            value={form.code}
            onChange={(e) =>
              setForm({ ...form, code: e.target.value.toUpperCase() })
            }
            required
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="PERCENT">Percent</option>
            <option value="FLAT">Flat</option>
          </select>
          <input
            type="number"
            min="0"
            placeholder="Value"
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
          />
          <input
            type="number"
            min="0"
            placeholder="Min order"
            value={form.minOrder}
            onChange={(e) => setForm({ ...form, minOrder: e.target.value })}
          />
          <input
            type="number"
            min="0"
            placeholder="Max discount"
            value={form.maxDiscount}
            onChange={(e) => setForm({ ...form, maxDiscount: e.target.value })}
          />
          <button className="btn primary">
            <Plus size={15} />
            Create
          </button>
        </form>
      </div>
      <div className="dashboard-panel">
        {!data.length && <p>No offers yet.</p>}
        {data.map((x) => (
          <div className="table-row" key={x._id}>
            <div className="user-cell">
              <div className="stat-icon">
                <Tag size={17} />
              </div>
              <div>
                <b>{x.code}</b>
                <small>
                  {x.type === "PERCENT" ? `${x.value}% off` : `₹${x.value} off`}{" "}
                  • Min ₹{x.minOrder || 0}
                </small>
              </div>
            </div>
            <span className={x.isActive ? "status green" : "status orange"}>
              {x.isActive ? "Active" : "Inactive"}
            </span>
            <button className="icon-btn" onClick={() => remove(x)}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
