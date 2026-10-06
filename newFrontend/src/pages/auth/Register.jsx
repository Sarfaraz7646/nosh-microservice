// import { Link, useNavigate } from "react-router-dom";
// import {
//   ArrowRight,
//   Eye,
//   EyeOff,
//   Lock,
//   Mail,
//   Phone,
//   UserRound,
// } from "lucide-react";
// import { useState } from "react";
// import { useAuthStore } from "../../store/authStore";
// export default function Register() {
//   const nav = useNavigate();
//   const register = useAuthStore((s) => s.register);
//   const [show, setShow] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "CUSTOMER",
//     inviteCode: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   async function submit(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const data = await register({ ...form, phone: form.phone || undefined });
//       if (!data.accessToken) {
//         nav("/auth/login");
//         return;
//       }
//       const role = data.user?.role;
//       nav(
//         role === "ADMIN"
//           ? "/admin"
//           : role === "RESTAURANT"
//             ? "/restaurant"
//             : role === "DELIVERY_PARTNER"
//               ? "/delivery/onboarding"
//               : "/",
//       );
//     } catch (e) {
//       setError(e.response?.data?.message || "Registration failed.");
//     } finally {
//       setLoading(false);
//     }
//   }
//   return (
//     <div className="auth-page">
//       <div className="auth-shell auth-shell-register">
//         <div className="auth-visual">
//           <div className="auth-logo">
//             <span className="brand-mark">F</span> FoodFlow
//           </div>
//           <div className="auth-visual-content">
//             <span className="auth-kicker">JOIN FOODFLOW</span>
//             <h2>
//               One account.
//               <br />
//               <span>Every role.</span>
//             </h2>
//             <p>
//               Create a customer account, or register a restaurant, delivery
//               partner or admin account when authorized.
//             </p>
//           </div>
//         </div>
//         <div className="auth-card">
//           <div className="auth-mobile-brand">
//             <span className="brand-mark">F</span> FoodFlow
//           </div>
//           <small className="auth-kicker-text">CREATE ACCOUNT</small>
//           <h1>Join FoodFlow</h1>
//           <p>Your role determines the dashboard and permissions you receive.</p>
//           {error && <div className="form-error">{error}</div>}
//           <form onSubmit={submit}>
//             <label>
//               Full name
//               <input
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 required
//                 placeholder="Your full name"
//               />
//               <UserRound />
//             </label>
//             <label>
//               Email address
//               <input
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 type="email"
//                 required
//                 placeholder="you@example.com"
//               />
//               <Mail />
//             </label>
//             <label>
//               Phone number
//               <input
//                 value={form.phone}
//                 onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                 type="tel"
//                 placeholder="9876543210"
//               />
//               <Phone />
//             </label>
//             {/* <label>
//               Account type
//               <select
//                 value={form.role}
//                 onChange={(e) => setForm({ ...form, role: e.target.value })}
//               >
//                 <option value="CUSTOMER">Customer</option>
//                 <option value="RESTAURANT">Restaurant</option>
//                 <option value="DELIVERY_PARTNER">Delivery Partner</option>
//                 <option value="ADMIN">Admin</option>
//               </select>
//             </label> */}

//             <label className="auth-field">
//               <span>Account type</span>

//               <div className="select-wrap">
//                 <select
//                   className="auth-select"
//                   value={form.role}
//                   onChange={(e) => setForm({ ...form, role: e.target.value })}
//                 >
//                   <option value="CUSTOMER">Customer</option>
//                   <option value="RESTAURANT">Restaurant</option>
//                   <option value="DELIVERY_PARTNER">Delivery Partner</option>
//                   <option value="ADMIN">Admin</option>
//                 </select>

//                 <span className="select-arrow">⌄</span>
//               </div>
//             </label>

//             {form.role === "ADMIN" && (
//               <label>
//                 Admin invitation code
//                 <input
//                   value={form.inviteCode}
//                   onChange={(e) =>
//                     setForm({ ...form, inviteCode: e.target.value })
//                   }
//                   required
//                 />
//               </label>
//             )}
//             <label>
//               Password
//               <div className="password-wrap">
//                 <input
//                   value={form.password}
//                   onChange={(e) =>
//                     setForm({ ...form, password: e.target.value })
//                   }
//                   type={show ? "text" : "password"}
//                   required
//                   minLength={8}
//                   placeholder="Minimum 8 characters"
//                 />
//                 <button type="button" onClick={() => setShow(!show)}>
//                   {show ? <EyeOff /> : <Eye />}
//                 </button>
//                 <Lock />
//               </div>
//             </label>
//             <button disabled={loading} className="btn primary full auth-submit">
//               {loading ? "Creating..." : "Create account"}{" "}
//               <ArrowRight size={17} />
//             </button>
//           </form>
//           <div className="auth-foot">
//             Already have an account? <Link to="/auth/login">Sign in</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  UserRound,
  Bike,
  Store,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

export default function Register() {
  const nav = useNavigate();
  const register = useAuthStore((s) => s.register);

  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "CUSTOMER",
    inviteCode: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await register({
        ...form,
        phone: form.phone || undefined,
      });

      if (!data.accessToken) {
        nav("/auth/login");
        return;
      }

      const role = data.user?.role;

      nav(
        role === "ADMIN"
          ? "/admin"
          : role === "RESTAURANT"
            ? "/restaurant"
            : role === "DELIVERY_PARTNER"
              ? "/delivery/onboarding"
              : "/",
      );
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-shell auth-shell-register">

        {/* =====================================================
            LEFT SIDE - VISUAL
        ====================================================== */}

        <div className="auth-visual">

          <div className="auth-visual-bg" />

          <div className="auth-visual-overlay" />

          {/* Logo */}
          <div className="auth-logo">
            <span className="brand-mark">F</span>
            <span>FoodFlow</span>
          </div>

          {/* Main Content */}
          <div className="auth-visual-content">

            <span className="auth-kicker">
              WELCOME TO FOODFLOW
            </span>

            <h2>
              One account.
              <br />
              <span>Every role.</span>
            </h2>

            <p>
              Your complete food delivery platform for customers,
              restaurants, delivery partners and administrators.
            </p>

            {/* Features */}
            <div className="auth-feature-list">

              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <ShoppingBag size={20} />
                </div>

                <div>
                  <strong>Discover great food</strong>
                  <small>
                    Explore restaurants and order your favourite meals.
                  </small>
                </div>
              </div>

              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <Bike size={20} />
                </div>

                <div>
                  <strong>Fast delivery</strong>
                  <small>
                    Track your delivery and receive real-time updates.
                  </small>
                </div>
              </div>

              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <Store size={20} />
                </div>

                <div>
                  <strong>Grow your restaurant</strong>
                  <small>
                    Manage menus, orders and your restaurant business.
                  </small>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Trust Card */}
          <div className="auth-food-card">
            <div className="auth-food-card-icon">
              <ShieldCheck size={19} />
            </div>

            <div>
              <strong>Secure & reliable</strong>
              <small>
                Your account and data are protected.
              </small>
            </div>
          </div>

        </div>

        {/* =====================================================
            RIGHT SIDE - REGISTER FORM
        ====================================================== */}

        <div className="auth-card">

          {/* Mobile Brand */}
          <div className="auth-mobile-brand">
            <span className="brand-mark">F</span>
            <span>FoodFlow</span>
          </div>

          <small className="auth-kicker-text">
            CREATE ACCOUNT
          </small>

          <h1>Join FoodFlow</h1>

          <p className="auth-description">
            Create your account and get access to the right
            dashboard for your role.
          </p>

          {/* Error */}
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <form onSubmit={submit}>

            {/* Full Name */}
            <label className="auth-input-field">
              <span>Full name</span>

              <div className="input-with-icon">
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  required
                  placeholder="Your full name"
                  autoComplete="name"
                />

                <UserRound size={18} />
              </div>
            </label>

            {/* Email */}
            <label className="auth-input-field">
              <span>Email address</span>

              <div className="input-with-icon">
                <input
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  type="email"
                  required
                  placeholder="you@example.com"
                  autoComplete="email"
                />

                <Mail size={18} />
              </div>
            </label>

            {/* Phone */}
            <label className="auth-input-field">
              <span>Phone number</span>

              <div className="input-with-icon">
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  type="tel"
                  placeholder="9876543210"
                  autoComplete="tel"
                />

                <Phone size={18} />
              </div>
            </label>

            {/* Account Type */}
            <label className="auth-input-field">
              <span>Account type</span>

              <div className="select-wrap">

                <select
                  className="auth-select"
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="CUSTOMER">
                    Customer
                  </option>

                  <option value="RESTAURANT">
                    Restaurant
                  </option>

                  <option value="DELIVERY_PARTNER">
                    Delivery Partner
                  </option>

                  <option value="ADMIN">
                    Admin
                  </option>
                </select>

                <span className="select-arrow">
                  ▾
                </span>

              </div>
            </label>

            {/* Admin Invitation Code */}
            {form.role === "ADMIN" && (
              <label className="auth-input-field">

                <span>
                  Admin invitation code
                </span>

                <div className="input-with-icon">

                  <input
                    value={form.inviteCode}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        inviteCode: e.target.value,
                      })
                    }
                    required
                    placeholder="Enter invitation code"
                  />

                  <ShieldCheck size={18} />

                </div>

              </label>
            )}

            {/* Password */}
            <label className="auth-input-field">
              <span>Password</span>

              <div className="password-wrap">

                <input
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  type={show ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShow(!show)}
                  aria-label={
                    show
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {show ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

                <Lock
                  size={18}
                  className="password-lock"
                />

              </div>
            </label>

            {/* Submit */}
            <button
              disabled={loading}
              type="submit"
              className="btn primary full auth-submit"
            >
              <span>
                {loading
                  ? "Creating account..."
                  : "Create account"}
              </span>

              {!loading && (
                <ArrowRight size={18} />
              )}
            </button>

          </form>

          {/* Footer */}
          <div className="auth-foot">
            Already have an account?{" "}
            <Link to="/auth/login">
              Sign in
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
