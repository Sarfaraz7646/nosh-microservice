import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, CheckCircle2, Plus } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { orderApi, paymentApi, profileApi } from "../../services";
import { useAuthStore } from "../../store/authStore";
export default function Checkout() {
  const nav = useNavigate();
  const { items, restaurant, clear } = useCartStore();
  const token = useAuthStore((s) => s.token);
  useEffect(() => {
    if (!token) nav("/auth/login");
  }, [token, nav]);
  const [method, setMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    line1: "",
    line2: "",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
  });
  useEffect(() => {
    profileApi
      .me()
      .then((r) => {
        const a = r.data?.addresses || r.data?.profile?.addresses || [];
        setAddresses(a);
        setSelected(a.find((x) => x.isDefault) || a[0] || null);
      })
      .catch(() => {});
  }, []);
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const delivery = subtotal >= 499 ? 0 : 40;
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + delivery + tax).toFixed(2));
  async function saveAddress() {
    try {
      const r = await profileApi.addresses(newAddress);
      const a =
        r.data?.address ||
        r.data?.profile?.addresses?.slice(-1)[0] ||
        newAddress;
      setAddresses((x) => [...x, a]);
      setSelected(a);
      setNewAddress({
        label: "Home",
        line1: "",
        line2: "",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110001",
      });
    } catch (e) {
      setError(e.response?.data?.message || "Could not save address");
    }
  }
  async function place() {
    if (!items.length) return;
    if (!selected) {
      setError("Select or add a delivery address");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data: order } = await orderApi.create({
        restaurantId: restaurant?._id || restaurant?.id,
        items: items.map((i) => ({
          menuItemId: i.menuItemId || i.id,
          name: i.name,
          price: Number(i.price),
          quantity: i.qty,
          isVeg: i.isVeg,
          image: i.image,
        })),
        deliveryAddress: {
          label: selected.label || "Home",
          receiverName: selected.receiverName || "Customer",
          phone: selected.phone || "0000000000",
          line1: selected.line1,
          line2: selected.line2,
          city: selected.city,
          state: selected.state,
          pincode: selected.pincode,
        },
        deliveryFee: delivery,
        tax,
        discount: 0,
        paymentMethod: method,
      });
      if (method === "ONLINE") {
        const p = await paymentApi.create({
          orderId: order._id,
          amount: order.total,
          currency: "INR",
        });
        await paymentApi.confirm(p.data.payment.paymentId, true);
      }
      setDone(order);
      clear();
    } catch (e) {
      setError(e.response?.data?.message || "Could not place order");
    } finally {
      setLoading(false);
    }
  }
  if (done)
    return (
      <section className="empty">
        <CheckCircle2 size={60} />
        <h1>Order placed successfully!</h1>
        <p>Order #{done.orderNumber || done._id}</p>
        <button
          className="btn primary"
          onClick={() => nav(`/orders/${done._id}`)}
        >
          Track order
        </button>
      </section>
    );
  return (
    <section className="section checkout">
      <div className="page-heading">
        <small>CHECKOUT</small>
        <h1>Complete your order</h1>
      </div>
      {error && <div className="form-error">{error}</div>}
      <div className="checkout-layout">
        <div>
          <div className="checkout-card">
            <h2>
              <MapPin /> Delivery address
            </h2>
            {addresses.map((a) => (
              <button
                type="button"
                className={`address ${selected?._id === a._id ? "selected" : ""}`}
                key={a._id}
                onClick={() => setSelected(a)}
              >
                <b>{a.label}</b>
                <p>
                  {a.line1}, {a.city}, {a.state} {a.pincode}
                </p>
              </button>
            ))}
            <div className="inline-form">
              <input
                placeholder="Address line"
                value={newAddress.line1}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, line1: e.target.value })
                }
              />
              <input
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />
              <input
                placeholder="State"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
              />
              <input
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pincode: e.target.value })
                }
              />
              <button type="button" className="btn ghost" onClick={saveAddress}>
                <Plus size={15} />
                Add address
              </button>
            </div>
          </div>
          <div className="checkout-card">
            <h2>
              <CreditCard /> Payment
            </h2>
            <label className="payment-option">
              <input
                type="radio"
                checked={method === "COD"}
                onChange={() => setMethod("COD")}
                name="payment"
              />
              <span>
                <b>Cash on Delivery</b>
                <small>Pay when your order arrives.</small>
              </span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                checked={method === "ONLINE"}
                onChange={() => setMethod("ONLINE")}
                name="payment"
              />
              <span>
                <b>Online payment</b>
                <small>
                  Development payment provider; confirmation is handled by the
                  Payment Service.
                </small>
              </span>
            </label>
          </div>
        </div>
        <aside className="summary">
          <h2>Order summary</h2>
          <p>{restaurant?.name}</p>
          {items.map((i) => (
            <div key={i.id}>
              <span>
                {i.name} × {i.qty}
              </span>
              <b>₹{i.price * i.qty}</b>
            </div>
          ))}
          <hr />
          <div>
            <span>Subtotal</span>
            <b>₹{subtotal}</b>
          </div>
          <div>
            <span>Delivery</span>
            <b>₹{delivery}</b>
          </div>
          <div>
            <span>Taxes</span>
            <b>₹{tax}</b>
          </div>
          <div className="total">
            <span>Total</span>
            <b>₹{total}</b>
          </div>
          <button
            disabled={loading}
            className="btn primary full"
            onClick={place}
          >
            {loading ? "Placing order..." : "Place order"}
          </button>
        </aside>
      </div>
    </section>
  );
}
