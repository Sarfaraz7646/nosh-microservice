import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Star, Clock3 } from "lucide-react";
import { restaurantApi } from "../../services";
export default function Restaurants() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("search") || "");
  const [cat, setCat] = useState(params.get("cuisine") || "All");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    restaurantApi
      .list()
      .then((r) => setList(r.data))
      .catch((e) =>
        setError(e.response?.data?.message || "Could not load restaurants"),
      )
      .finally(() => setLoading(false));
  }, []);
  const cuisines = ["All", ...new Set(list.flatMap((r) => r.cuisine || []))];
  const filtered = list.filter(
    (r) =>
      (r.name + " " + (r.cuisine || []).join(" "))
        .toLowerCase()
        .includes(q.toLowerCase()) &&
      (cat === "All" || (r.cuisine || []).includes(cat)),
  );
  return (
    <section className="section restaurants-page">
      <div className="page-heading">
        <small>DISCOVER</small>
        <h1>Restaurants near you</h1>
        <p>Live restaurants from the FoodFlow backend.</p>
      </div>
      <div className="large-search">
        <Search />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search restaurants"
        />
      </div>
      <div className="chips">
        {cuisines.map((c) => (
          <button
            onClick={() => setCat(c)}
            className={cat === c ? "chip selected" : "chip"}
            key={c}
          >
            {c}
          </button>
        ))}
      </div>
      {loading && <div className="empty">Loading restaurants...</div>}
      {error && (
        <div className="empty">
          <h2>Unable to load restaurants</h2>
          <p>{error}</p>
        </div>
      )}{" "}
      {!loading && !error && !filtered.length && (
        <div className="empty">
          <h2>No restaurants found</h2>
        </div>
      )}
      <div className="restaurant-grid">
        {filtered.map((r) => (
          <Link
            to={`/restaurants/${r._id}`}
            className="restaurant-card"
            key={r._id}
          >
            <div className="card-image">
              <img
                src={
                  r.coverImage ||
                  r.logo ||
                  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                }
              />
              <span>{r.isOpen ? "Open now" : "Closed"}</span>
            </div>
            <div className="card-body">
              <div className="row">
                <h3>{r.name}</h3>
                <b className="rating">
                  <Star size={13} fill="currentColor" />{" "}
                  {Number(r.rating || 0).toFixed(1)}
                </b>
              </div>
              <p>{(r.cuisine || []).join(" • ")}</p>
              <small>
                <Clock3 size={14} />{" "}
                {r.isOpen ? "Accepting orders" : "Currently closed"}
              </small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
