import { Outlet } from "react-router-dom";
import Navbar from "../components/customer/Navbar";
import Footer from "../components/customer/Footer";
export default function CustomerLayout() {
  return (
    <>
      <Navbar />
      <main className="customer-main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
