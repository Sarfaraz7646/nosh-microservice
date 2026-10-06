import { Link, useParams } from "react-router-dom";
const pages = {
  about: [
    "About FoodFlow",
    "FoodFlow is a showcase food-delivery platform built with React, Node.js, Express, MongoDB and independent microservices.",
  ],
  careers: [
    "Careers",
    "We are building a portfolio-grade delivery platform. Add your own open roles and hiring workflow here.",
  ],
  contact: [
    "Contact",
    "For business support, restaurant onboarding or delivery operations, email support@foodflow.local.",
  ],
};
export default function Info({ slug: propSlug }) {
  const { slug } = useParams();
  const p = pages[propSlug || slug] || ["FoodFlow", "Information page"];
  return (
    <section className="section empty" style={{ minHeight: "60vh" }}>
      <h1>{p[0]}</h1>
      <p>{p[1]}</p>
      <Link className="btn primary" to="/">
        Back home
      </Link>
    </section>
  );
}
