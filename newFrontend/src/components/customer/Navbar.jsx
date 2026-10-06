import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Search, ShoppingBag, UserRound } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

export default function Navbar() {
  const nav = useNavigate();

  const count = useCartStore((s) =>
    s.items.reduce((a, i) => a + i.qty, 0)
  );

  const [q, setQ] = useState("");

  function submit(e) {
    e.preventDefault();
    nav(`/restaurants${q ? `?search=${encodeURIComponent(q)}` : ""}`);
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">F</span>
        <span>FoodFlow</span>
      </Link>

      <div className="location">
        <MapPin size={17} />
        <div>
          <small>Deliver to</small>
          <b>New Delhi</b>
        </div>
      </div>

      <form className="nav-search" onSubmit={submit}>
        <Search size={18} />

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search for restaurants, dishes or cuisines"
        />
      </form>

      <Link className="nav-link" to="/orders">
        Orders
      </Link>

      <Link className="icon-btn" to="/cart">
        <ShoppingBag size={20} />
        {count > 0 && <span>{count}</span>}
      </Link>

      <Link className="icon-btn" to="/auth/login">
        <UserRound size={20} />
      </Link>
    </header>
  );
}