import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock3, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { menuApi, restaurantApi } from "../../services";
import { useCartStore } from "../../store/cartStore";
export default function RestaurantDetails() {
  const { id } = useParams();
  const [r, setR] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const add = useCartStore((s) => s.addItem);
  const setRestaurant = useCartStore((s) => s.setRestaurant);
  useEffect(() => {
    Promise.all([restaurantApi.get(id), menuApi.list(id)])
      .then(([a, b]) => {
        setR(a.data);
        setItems(b.data);
      })
      .catch((e) =>
        setError(e.response?.data?.message || "Unable to load restaurant"),
      );
  }, [id]);
  if (error)
    return (
      <section className="empty">
        <h1>Unable to load restaurant</h1>
        <p>{error}</p>
        <Link className="btn primary" to="/restaurants">
          Back
        </Link>
      </section>
    );
  if (!r) return <section className="empty">Loading restaurant...</section>;
  return (
    <section className="section">
      <Link className="back" to="/restaurants">
        <ArrowLeft size={17} /> Back to restaurants
      </Link>
      <div className="restaurant-hero">
        <img src={r.coverImage || r.logo} />
        <div>
          <span className="offer-pill">
            {r.isOpen ? "Open for orders" : "Closed"}
          </span>
          <h1>{r.name}</h1>
          <p>{(r.cuisine || []).join(" • ")}</p>
          <div className="meta">
            <span>
              <Star size={15} fill="currentColor" />{" "}
              {Number(r.rating || 0).toFixed(1)}
            </span>
            <span>
              <Clock3 size={15} /> Freshly prepared
            </span>
            <span>{r.address?.city || ""}</span>
          </div>
        </div>
      </div>
      <div className="menu-header">
        <div>
          <small>MENU</small>
          <h2>Available items</h2>
        </div>
        <span>{items.length} items</span>
      </div>
      <div className="menu-list">
        {items
          .filter((x) => x.isAvailable !== false)
          .map((item) => (
            <div className="menu-item" key={item._id}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <b>₹{item.price}</b>
              </div>
              <button
                className="add-btn"
                disabled={!r.isOpen}
                onClick={() => {
                  setRestaurant(r);
                  add({
                    id: item._id,
                    menuItemId: item._id,
                    name: item.name,
                    price: item.price,
                    isVeg: item.isVeg,
                    image: item.image,
                  });
                }}
              >
                <Plus size={18} /> Add
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}
