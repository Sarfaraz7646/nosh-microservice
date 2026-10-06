import { Link } from "react-router-dom";
import { ArrowRight, Clock3, ShieldCheck, Truck, Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import { restaurantApi } from "../../services";
const fallback =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80";
export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    restaurantApi
      .list()
      .then((r) => setRestaurants(r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  const featured = restaurants[0];
  return (
    <div>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">DELIVERY THAT MOVES WITH YOU</div>
          <h1>
            Your cravings,
            <br />
            <span>delivered.</span>
          </h1>
          <p>
            Discover approved restaurants, order in seconds and follow your
            delivery live from kitchen to doorstep.
          </p>
          <div className="hero-actions">
            <Link to="/restaurants" className="btn primary">
              Explore restaurants <ArrowRight size={18} />
            </Link>
            <Link to="/auth/register" className="btn ghost">
              Create account
            </Link>
          </div>
          <div className="trust">
            <span>
              <Clock3 />
              20–35 min
            </span>
            <span>
              <ShieldCheck />
              Secure payments
            </span>
            <span>
              <Truck />
              Live tracking
            </span>
          </div>
        </div>
        <div className="hero-card">
          <div className="floating-tag">🔥 Live restaurants</div>
          <img src={featured?.coverImage || featured?.logo || fallback} />
          <div className="hero-card-info">
            <div>
              <b>{featured?.name || "FoodFlow"}</b>
              <small>
                {featured
                  ? (featured.cuisine || []).join(" • ")
                  : "Order from restaurants near you"}
              </small>
            </div>
            <strong>
              ★ {featured ? Number(featured.rating || 0).toFixed(1) : "—"}
            </strong>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <div>
            <small>EXPLORE</small>
            <h2>What are you craving?</h2>
          </div>
          <Link to="/restaurants">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="chips">
          {[
            "All",
            "North Indian",
            "South Indian",
            "Chinese",
            "Biryani",
            "Pizza",
            "Burgers",
          ].map((c, i) => (
            <Link
              to={`/restaurants${c === "All" ? "" : `?cuisine=${encodeURIComponent(c)}`}`}
              className={i === 0 ? "chip selected" : "chip"}
              key={c}
            >
              <Utensils size={16} />
              {c}
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <div>
            <small>LIVE CATALOG</small>
            <h2>Popular restaurants</h2>
          </div>
          <Link to="/restaurants">
            See all <ArrowRight size={16} />
          </Link>
        </div>
        {loading ? (
          <div className="empty">Loading restaurants...</div>
        ) : (
          <div className="restaurant-grid">
            {restaurants.slice(0, 6).map((r) => (
              <Link
                to={`/restaurants/${r._id}`}
                className="restaurant-card"
                key={r._id}
              >
                <div className="card-image">
                  <img src={r.coverImage || r.logo || fallback} />
                  <span>{r.isOpen ? "Open now" : "Closed"}</span>
                </div>
                <div className="card-body">
                  <div className="row">
                    <h3>{r.name}</h3>
                    <b className="rating">
                      ★ {Number(r.rating || 0).toFixed(1)}
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
        )}
      </section>
      <section className="feature-strip">
        <div>
          <Truck />
          <h3>Fast delivery</h3>
          <p>Smart assignment helps get orders to you faster.</p>
        </div>
        <div>
          <ShieldCheck />
          <h3>Safe & secure</h3>
          <p>Protected payments and verified delivery partners.</p>
        </div>
        <div>
          <Utensils />
          <h3>Live menus</h3>
          <p>Menus and availability come directly from restaurants.</p>
        </div>
      </section>
    </div>
  );
}
