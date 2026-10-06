import { Navigate } from "react-router-dom";
import CustomerLayout from "../layouts/CustomerLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Info from "../pages/customer/Info";
import Notifications from "../pages/Notifications";
import { customerRoutes } from "./customerRoutes";
import { restaurantRoutes } from "./restaurantRoutes";
import { deliveryRoutes } from "./deliveryRoutes";
import { adminRoutes } from "./adminRoutes";

export const appRoutes = [
  customerRoutes,
  { path: "/notifications", element: <Notifications /> },
  {
    path: "/about",
    element: <CustomerLayout />,
    children: [{ index: true, element: <Info slug="about" /> }],
  },
  {
    path: "/careers",
    element: <CustomerLayout />,
    children: [{ index: true, element: <Info slug="careers" /> }],
  },
  {
    path: "/contact",
    element: <CustomerLayout />,
    children: [{ index: true, element: <Info slug="contact" /> }],
  },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  ...restaurantRoutes,
  ...deliveryRoutes,
  adminRoutes,
  { path: "*", element: <Navigate to="/" replace /> },
];

export { customerRoutes, restaurantRoutes, deliveryRoutes, adminRoutes };
