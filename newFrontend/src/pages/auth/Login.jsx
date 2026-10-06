import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
const heroImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=85";
export default function Login() {
  const nav = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(form);
      const role = data.user?.role;
      nav(
        role === "ADMIN"
          ? "/admin"
          : role === "RESTAURANT"
            ? "/restaurant"
            : role === "DELIVERY_PARTNER"
              ? "/delivery"
              : "/",
      );
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Unable to sign in. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div
          className="auth-visual"
          style={{
            backgroundImage: `linear-gradient(135deg,rgba(17,24,39,.82),rgba(232,61,79,.52)),url(${heroImage})`,
          }}
        >
          <Link to="/" className="auth-logo">
            <span className="brand-mark">F</span> FoodFlow
          </Link>
          <div className="auth-visual-content">
            <span className="auth-kicker">
              <Sparkles size={14} /> GOOD FOOD. GREAT MOOD.
            </span>
            <h2>
              Everything you love,
              <br />
              <span>delivered beautifully.</span>
            </h2>
            <p>
              Sign in to manage your orders, deliveries, restaurant operations
              or platform administration.
            </p>
          </div>
        </div>
        <div className="auth-card">
          <div className="auth-mobile-brand">
            <span className="brand-mark">F</span> FoodFlow
          </div>
          <small className="auth-kicker-text">WELCOME BACK</small>
          <h1>Sign in to FoodFlow</h1>
          <p>Use your account credentials to continue.</p>
          {error && <div className="form-error">{error}</div>}
          <form onSubmit={submit}>
            <label>
              Email address
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="email"
                placeholder="you@example.com"
                required
              />
              <Mail />
            </label>
            <label>
              Password
              <div className="password-wrap">
                <input
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <button type="button" onClick={() => setShow(!show)}>
                  {show ? <EyeOff /> : <Eye />}
                </button>
                <Lock />
              </div>
            </label>
            <button disabled={loading} className="btn primary full auth-submit">
              {loading ? "Signing in..." : "Sign in"} <ArrowRight size={17} />
            </button>
          </form>
          <div className="auth-foot">
            New to FoodFlow? <Link to="/auth/register">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
