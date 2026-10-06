import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <div>
        <Link to="/" className="brand footer-brand">
          <span className="brand-mark">F</span>FoodFlow
        </Link>
        <p>
          Good food. Fast delivery. Built as a full-stack microservices
          platform.
        </p>
      </div>
      <div>
        <h4>For customers</h4>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/orders">Track order</Link>
        <Link to="/restaurants">Offers</Link>
      </div>
      <div>
        <h4>For partners</h4>
        <Link to="/restaurant">Restaurant portal</Link>
        <Link to="/delivery">Delivery partner</Link>
        <a href="mailto:support@foodflow.local">Business support</a>
      </div>
      <div>
        <h4>Company</h4>
        <Link to="/about">About</Link>
        <Link to="/careers">Careers</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </footer>
  );
}
