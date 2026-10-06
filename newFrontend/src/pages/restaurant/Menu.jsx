import { Plus, Pencil, Trash2, ToggleLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { menuApi, restaurantApi } from "../../services";
export default function Menu() {
  const [r, setR] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    category: "Main",
    name: "",
    description: "",
    price: "",
    isVeg: false,
    isAvailable: true,
    preparationTime: 20,
  });
  const load = async () => {
    try {
      const a = await restaurantApi.mine();
      setR(a.data);
      const b = await menuApi.list(a.data._id);
      setItems(b.data || []);
    } catch (e) {
      setError(e.response?.data?.message || "Unable to load menu");
    }
  };
  useEffect(() => {
    load();
  }, []);
  async function save(e) {
    e.preventDefault();
    if (!r) return;
    try {
      await menuApi.create(r._id, {
        ...form,
        price: Number(form.price),
        preparationTime: Number(form.preparationTime),
      });
      setForm({
        category: "Main",
        name: "",
        description: "",
        price: "",
        isVeg: false,
        isAvailable: true,
        preparationTime: 20,
      });
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not create item");
    }
  }
  async function toggle(i) {
    try {
      await menuApi.update(r._id, i._id, { isAvailable: !i.isAvailable });
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not update item");
    }
  }
  async function remove(i) {
    if (!confirm(`Delete ${i.name}?`)) return;
    try {
      await menuApi.remove(r._id, i._id);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not delete item");
    }
  }
  return (
    <>
      <div className="panel-head">
        <div>
          <small>MENU MANAGEMENT</small>
          <h2>Food items</h2>
        </div>
        <span>{items.length} items</span>
      </div>
      {error && <div className="form-error">{error}</div>}
      <div className="dashboard-panel">
        <h3>Add menu item</h3>
        <form className="inline-form" onSubmit={save}>
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="number"
            min="0"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <button className="btn primary">
            <Plus size={15} />
            Add
          </button>
        </form>
      </div>
      <div className="dashboard-panel">
        {!items.length && <p>No menu items yet.</p>}
        {items.map((i) => (
          <div className="table-row" key={i._id}>
            <div>
              <b>{i.name}</b>
              <small>
                {i.category} • {i.description || "No description"}
              </small>
            </div>
            <strong>₹{i.price}</strong>
            <span className={i.isAvailable ? "available" : "status orange"}>
              {i.isAvailable ? (
                <>
                  <ToggleLeft /> Available
                </>
              ) : (
                "Unavailable"
              )}
            </span>
            <button
              className="icon-btn"
              onClick={() => toggle(i)}
              title="Toggle availability"
            >
              <Pencil size={16} />
            </button>
            <button
              className="icon-btn"
              onClick={() => remove(i)}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
