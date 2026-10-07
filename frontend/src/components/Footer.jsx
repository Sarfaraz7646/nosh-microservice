import { ArrowUpRight, Camera, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="nosh-footer" id="footer" aria-label="Footer">
      <div className="nosh-footer-inner">
        <div className="nosh-footer-top">
          <div>
            <Link className="wordmark nosh-footer-wordmark" to="/">
              nosh<span>.</span>
            </Link>
            <p className="nosh-footer-tagline">Good food, good mood.</p>
          </div>
          <div className="nosh-footer-location">
            <MapPin size={16} aria-hidden="true" />
            <span>Bengaluru, India</span>
          </div>
        </div>

        <div className="nosh-footer-feature">
          <div>
            <span className="nosh-footer-kicker">A little joy, delivered</span>
            <h2>Your next great meal is waiting.</h2>
            <p>Find the flavours you love from restaurants around Bengaluru.</p>
          </div>
          <Link className="nosh-footer-cta" to="/restaurants">
            Explore restaurants <ArrowUpRight size={16} />
          </Link>
          <span className="nosh-footer-spark" aria-hidden="true">&#10022;</span>
        </div>

        <nav className="nosh-footer-columns" aria-label="Footer navigation">
          <div className="nosh-footer-column">
            <h3>About nosh</h3>
            <p>Bringing Bengaluru&apos;s favourite flavours to your door, one delicious meal at a time.</p>
            <a className="nosh-footer-contact" href="mailto:hello@nosh.local">
              <Mail size={15} aria-hidden="true" /> hello@nosh.local
            </a>
          </div>
          <div className="nosh-footer-column">
            <h3>Discover</h3>
            <Link to="/restaurants">All restaurants</Link>
            <Link to="/orders">Your orders</Link>
            <Link to="/profile">Your profile</Link>
          </div>
          <div className="nosh-footer-column">
            <h3>Work with us</h3>
            <Link to="/delivery/login">Become a delivery partner</Link>
            <Link to="/login">Restaurant partner login</Link>
            <a href="mailto:hello@nosh.local">Get in touch</a>
          </div>
          <div className="nosh-footer-column nosh-footer-social">
            <h3>Say hello</h3>
            <a href="mailto:hello@nosh.local" aria-label="Email nosh">
              <Mail size={17} />
            </a>
            <a href="https://www.instagram.com/" aria-label="Instagram">
              <Camera size={17} />
            </a>
          </div>
        </nav>

        <div className="nosh-footer-bottom">
          <span>&copy; {new Date().getFullYear()} nosh. Made with care in Bengaluru.</span>
          <Link to="/restaurants">Hungry? Let&apos;s find something <ArrowUpRight size={14} /></Link>
        </div>
      </div>
    </footer>
  );
}
