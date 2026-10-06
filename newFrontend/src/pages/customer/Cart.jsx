import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
export default function Cart() {
  const { items, restaurant, changeQty, removeItem } = useCartStore();
  const nav = useNavigate();
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  if (!items.length)
    return (
      <section className="empty">
        <ShoppingBag size={48} />
        <h1>Your cart is empty</h1>
        <p>Add some delicious items and they will appear here.</p>
        <Link className="btn primary" to="/restaurants">
          Browse restaurants
        </Link>
      </section>
    );
  return (
    <section className="section cart-page">
      <div className="page-heading">
        <small>YOUR ORDER</small>
        <h1>{restaurant?.name || "Your cart"}</h1>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((i) => (
            <div className="cart-item" key={i.id}>
              <div>
                <h3>{i.name}</h3>
                <span>₹{i.price} each</span>
              </div>
              <div className="qty">
                <button onClick={() => changeQty(i.id, -1)}>
                  <Minus size={15} />
                </button>
                <b>{i.qty}</b>
                <button onClick={() => changeQty(i.id, 1)}>
                  <Plus size={15} />
                </button>
              </div>
              <strong>₹{i.price * i.qty}</strong>
              <button className="trash" onClick={() => removeItem(i.id)}>
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
        <aside className="summary">
          <h2>Bill details</h2>
          <div>
            <span>Item total</span>
            <b>₹{subtotal}</b>
          </div>
          <div>
            <span>Delivery fee</span>
            <b>₹39</b>
          </div>
          <div>
            <span>Taxes & fees</span>
            <b>₹{Math.round(subtotal * 0.05)}</b>
          </div>
          <hr />
          <div className="total">
            <span>Total</span>
            <b>₹{subtotal + 39 + Math.round(subtotal * 0.05)}</b>
          </div>
          <button className="btn primary full" onClick={() => nav("/checkout")}>
            Proceed to checkout <ArrowRight size={17} />
          </button>
        </aside>
      </div>
    </section>
  );
}
